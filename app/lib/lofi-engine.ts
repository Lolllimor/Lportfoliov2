/**
 * A tiny generative lofi band built on the Web Audio API — no audio files.
 *
 * Each track is a 4-bar loop of 7th chords on a soft electric-piano voice,
 * with sub bass, dusty drums, a seeded pentatonic melody through a tape-style
 * echo, and vinyl crackle (plus rain on one track). Notes are scheduled a
 * little ahead of time on the audio clock so playback stays tight.
 */

export interface LofiTrack {
  title: string;
  subtitle: string;
  bpm: number;
  /** One chord (MIDI notes) per bar. */
  chords: number[][];
  /** Bass root (MIDI) per bar. */
  bass: number[];
  /** Pentatonic scale (MIDI) the melody picks from. */
  scale: number[];
  /** 16-step patterns, 1 = hit. */
  kick: number[];
  snare: number[];
  hat: number[];
  /** Chance a melody note plays on each eighth note. */
  melodyDensity: number;
  swing: number;
  rain?: boolean;
  seed: number;
}

export const lofiTracks: LofiTrack[] = [
  {
    title: 'Focus Mode',
    subtitle: 'lofi beats',
    bpm: 74,
    chords: [
      [53, 57, 60, 64], // Fmaj7
      [52, 55, 59, 62], // Em7
      [50, 53, 57, 60], // Dm7
      [48, 52, 55, 59], // Cmaj7
    ],
    bass: [41, 40, 38, 36],
    scale: [72, 74, 76, 79, 81, 84],
    kick: [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    hat: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    melodyDensity: 0.38,
    swing: 0.18,
    seed: 7,
  },
  {
    title: 'Debug Session',
    subtitle: 'rain & keys',
    bpm: 64,
    chords: [
      [57, 60, 64, 67], // Am7
      [53, 57, 60, 64], // Fmaj7
      [48, 52, 55, 59], // Cmaj7
      [55, 59, 62, 64], // G6
    ],
    bass: [45, 41, 36, 43],
    scale: [69, 72, 74, 76, 79, 81],
    kick: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    hat: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0],
    melodyDensity: 0.28,
    swing: 0.12,
    rain: true,
    seed: 21,
  },
  {
    title: 'Ship It',
    subtitle: 'upbeat chillhop',
    bpm: 88,
    chords: [
      [50, 53, 57, 60], // Dm7
      [55, 59, 62, 65], // G7
      [48, 52, 55, 59], // Cmaj7
      [45, 48, 52, 55], // Am7
    ],
    bass: [38, 43, 36, 45],
    scale: [72, 74, 76, 79, 81, 84, 86],
    kick: [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    hat: [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    melodyDensity: 0.5,
    swing: 0.22,
    seed: 42,
  },
];

const STEPS_PER_BAR = 16;
const BARS = 4;
const LOOP_STEPS = STEPS_PER_BAR * BARS;

const midiToFreq = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

/** Small deterministic PRNG so every track keeps the same melody. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Melody as a sparse map of step -> MIDI note, walking the scale in small leaps. */
function composeMelody(track: LofiTrack) {
  const random = mulberry32(track.seed);
  const melody = new Map<number, number>();
  let index = Math.floor(track.scale.length / 2);
  for (let step = 0; step < LOOP_STEPS; step += 2) {
    if (random() > track.melodyDensity) continue;
    index += Math.round((random() - 0.5) * 4);
    index = Math.max(0, Math.min(track.scale.length - 1, index));
    melody.set(step, track.scale[index]);
  }
  return melody;
}

export class LofiEngine {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private keysBus!: GainNode;
  private melodyBus!: GainNode;
  private drumBus!: GainNode;
  private wobble!: GainNode;
  private rainGain!: GainNode;
  private noise!: AudioBuffer;
  private analyser!: AnalyserNode;

  private timer: ReturnType<typeof setInterval> | null = null;
  private step = 0;
  private nextStepTime = 0;
  private trackIndex = 0;
  private melody = composeMelody(lofiTracks[0]);

  playing = false;

  get analyserNode() {
    return this.ctx ? this.analyser : null;
  }

  /** Must be called from a user gesture (browsers block autoplaying audio). */
  async play(trackIndex = this.trackIndex) {
    if (!this.ctx) this.setup();
    const ctx = this.ctx!;
    await ctx.resume();

    this.setTrack(trackIndex);
    this.playing = true;
    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.setTargetAtTime(0.8, ctx.currentTime, 0.15);

    if (!this.timer) this.timer = setInterval(() => this.schedule(), 25);
  }

  pause() {
    if (!this.ctx || !this.playing) return;
    const ctx = this.ctx;
    this.playing = false;
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.setTargetAtTime(0, ctx.currentTime, 0.08);
    setTimeout(() => {
      if (!this.playing) ctx.suspend();
    }, 400);
  }

  setTrack(index: number) {
    this.trackIndex = index;
    this.melody = composeMelody(lofiTracks[index]);
    this.step = 0;
    if (!this.ctx) return;
    this.nextStepTime = this.ctx.currentTime + 0.1;
    this.rainGain.gain.setTargetAtTime(
      lofiTracks[index].rain ? 0.05 : 0,
      this.ctx.currentTime,
      0.5
    );
  }

  dispose() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.playing = false;
    this.ctx?.close();
    this.ctx = null;
  }

  // ---------------------------------------------------------------- setup

  private setup() {
    const ctx = new AudioContext();
    this.ctx = ctx;

    this.noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = this.noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    // master: gentle glue compression, then the analyser for the visualiser
    this.master = ctx.createGain();
    this.master.gain.value = 0;
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.ratio.value = 3;
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 256;
    this.analyser.smoothingTimeConstant = 0.8;
    this.master.connect(compressor).connect(this.analyser).connect(ctx.destination);

    // "lofi" colour: everything musical passes through a warm low-pass
    const warmth = ctx.createBiquadFilter();
    warmth.type = 'lowpass';
    warmth.frequency.value = 3200;
    warmth.connect(this.master);

    this.keysBus = ctx.createGain();
    this.keysBus.gain.value = 0.22;
    const keysTone = ctx.createBiquadFilter();
    keysTone.type = 'lowpass';
    keysTone.frequency.value = 1500;
    this.keysBus.connect(keysTone).connect(warmth);

    this.drumBus = ctx.createGain();
    this.drumBus.gain.value = 0.7;
    this.drumBus.connect(warmth);

    // melody gets a tape echo with a darkening feedback loop
    this.melodyBus = ctx.createGain();
    this.melodyBus.gain.value = 0.14;
    this.melodyBus.connect(warmth);
    const echo = ctx.createDelay(2);
    echo.delayTime.value = 0.42;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.38;
    const echoTone = ctx.createBiquadFilter();
    echoTone.type = 'lowpass';
    echoTone.frequency.value = 1400;
    this.melodyBus.connect(echo);
    echo.connect(echoTone).connect(feedback).connect(echo);
    echoTone.connect(warmth);

    // tape wow: a slow LFO that detunes the keys by a few cents
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.5;
    this.wobble = ctx.createGain();
    this.wobble.gain.value = 7;
    lfo.connect(this.wobble);
    lfo.start();

    // vinyl hiss (always) and rain (per track)
    this.loopNoise('bandpass', 3500, 0.012);
    this.rainGain = this.loopNoise('lowpass', 900, 0);
  }

  private loopNoise(type: BiquadFilterType, frequency: number, level: number) {
    const ctx = this.ctx!;
    const source = ctx.createBufferSource();
    source.buffer = this.noise;
    source.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = frequency;
    const gain = ctx.createGain();
    gain.gain.value = level;
    source.connect(filter).connect(gain).connect(this.master);
    source.start();
    return gain;
  }

  // ------------------------------------------------------------ scheduler

  private schedule() {
    const ctx = this.ctx;
    if (!ctx) return;
    // Background tabs throttle timers to ~1/s, so look further ahead there.
    const lookAhead = document.hidden ? 1.5 : 0.15;
    const track = lofiTracks[this.trackIndex];
    const stepDuration = 60 / track.bpm / 4;

    while (this.nextStepTime < ctx.currentTime + lookAhead) {
      const swing = this.step % 2 ? track.swing * stepDuration : 0;
      this.playStep(track, this.step, this.nextStepTime + swing, stepDuration);
      this.nextStepTime += stepDuration;
      this.step = (this.step + 1) % LOOP_STEPS;
    }
  }

  private playStep(track: LofiTrack, step: number, time: number, stepDuration: number) {
    const bar = Math.floor(step / STEPS_PER_BAR);
    const beatStep = step % STEPS_PER_BAR;
    const barDuration = stepDuration * STEPS_PER_BAR;

    if (beatStep === 0) {
      track.chords[bar].forEach((note, i) =>
        // slight strum: each chord tone lands a hair later
        this.keys(note, time + i * 0.018, barDuration * 0.9, 0.5)
      );
      this.bassNote(track.bass[bar], time, barDuration * 0.45);
    }
    if (beatStep === 10) {
      this.bassNote(track.bass[bar], time, barDuration * 0.3);
    }
    if (beatStep === 8 && bar % 2 === 1) {
      // soft re-strike of the top of the chord for movement
      track.chords[bar].slice(2).forEach((note) => this.keys(note, time, barDuration * 0.4, 0.25));
    }

    if (track.kick[beatStep]) this.kick(time);
    if (track.snare[beatStep]) this.snare(time);
    if (track.hat[beatStep]) this.hat(time, beatStep % 4 === 2 ? 0.07 : 0.045);

    const note = this.melody.get(step);
    if (note) this.pluck(note, time, stepDuration * 3);

    if (Math.random() < 0.06) this.crackle(time + Math.random() * stepDuration);
  }

  // ---------------------------------------------------------- instruments

  private envelope(gain: GainNode, time: number, peak: number, hold: number, release: number) {
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(peak, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(peak * 0.4, time + Math.min(0.8, hold));
    gain.gain.setValueAtTime(peak * 0.4, time + hold);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + hold + release);
  }

  /** Electric-piano-ish: sine + detuned triangle with tape wobble. */
  private keys(midi: number, time: number, duration: number, velocity: number) {
    const ctx = this.ctx!;
    const gain = ctx.createGain();
    this.envelope(gain, time, velocity, duration, 0.7);
    gain.connect(this.keysBus);

    (['sine', 'triangle'] as OscillatorType[]).forEach((type, i) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = midiToFreq(midi);
      osc.detune.value = i ? 6 : -4;
      this.wobble.connect(osc.detune);
      osc.onended = () => this.wobble.disconnect(osc.detune);
      osc.connect(gain);
      osc.start(time);
      osc.stop(time + duration + 0.8);
    });
  }

  private bassNote(midi: number, time: number, duration: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = midiToFreq(midi);
    const gain = ctx.createGain();
    this.envelope(gain, time, 0.35, duration, 0.25);
    osc.connect(gain).connect(this.master);
    osc.start(time);
    osc.stop(time + duration + 0.3);
  }

  private pluck(midi: number, time: number, duration: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = midiToFreq(midi);
    const tone = ctx.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.setValueAtTime(2600, time);
    tone.frequency.exponentialRampToValueAtTime(700, time + duration);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.9, time + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    osc.connect(tone).connect(gain).connect(this.melodyBus);
    osc.start(time);
    osc.stop(time + duration + 0.05);
  }

  private kick(time: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(130, time);
    osc.frequency.exponentialRampToValueAtTime(42, time + 0.14);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.9, time + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.38);
    osc.connect(gain).connect(this.drumBus);
    osc.start(time);
    osc.stop(time + 0.4);
  }

  private noiseHit(
    time: number,
    type: BiquadFilterType,
    frequency: number,
    level: number,
    decay: number
  ) {
    const ctx = this.ctx!;
    const source = ctx.createBufferSource();
    source.buffer = this.noise;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = frequency;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(level, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + decay);
    source.connect(filter).connect(gain).connect(this.drumBus);
    source.start(time, Math.random() * 1.5);
    source.stop(time + decay + 0.02);
  }

  private snare(time: number) {
    this.noiseHit(time, 'bandpass', 1700, 0.32, 0.2);
    // a little body under the noise
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.frequency.value = 190;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.08);
    osc.connect(gain).connect(this.drumBus);
    osc.start(time);
    osc.stop(time + 0.1);
  }

  private hat(time: number, level: number) {
    this.noiseHit(time, 'highpass', 7500, level, 0.045);
  }

  private crackle(time: number) {
    this.noiseHit(time, 'highpass', 2500, 0.06, 0.006);
  }
}
