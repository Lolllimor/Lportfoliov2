'use client';

import { useEffect, useRef, useState } from 'react';
import { Heart, Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import { LofiEngine, lofiTracks } from '../lib/lofi-engine';

const BAR_COUNT = 4;
/** Frequency bins (of 128) each visualiser bar listens to: lows → highs. */
const BAR_BINS = [2, 6, 14, 30];
const IDLE_SCALE = 0.25;

const formatTime = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

/** "Now playing" widget backed by a live-generated lofi engine. */
export default function VibePlayer() {
  const engineRef = useRef<LofiEngine | null>(null);
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const track = lofiTracks[trackIndex];

  useEffect(() => () => engineRef.current?.dispose(), []);

  // Drive the visualiser bars from the real audio spectrum.
  useEffect(() => {
    const analyser = engineRef.current?.analyserNode;
    if (!playing || !analyser) {
      barsRef.current.forEach((bar) => {
        if (bar) bar.style.transform = `scaleY(${IDLE_SCALE})`;
      });
      return;
    }
    const data = new Uint8Array(analyser.frequencyBinCount);
    let frame = 0;
    const draw = () => {
      analyser.getByteFrequencyData(data);
      BAR_BINS.forEach((bin, i) => {
        const level = data[bin] / 255;
        const bar = barsRef.current[i];
        if (bar) bar.style.transform = `scaleY(${Math.max(IDLE_SCALE, level)})`;
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [playing]);

  const engine = () => (engineRef.current ??= new LofiEngine());

  const togglePlay = async () => {
    if (playing) {
      engine().pause();
      setPlaying(false);
    } else {
      await engine().play(trackIndex);
      setPlaying(true);
      trackEvent('music_play', { track: track.title });
    }
  };

  const skip = (step: number) => {
    const next = (trackIndex + step + lofiTracks.length) % lofiTracks.length;
    setTrackIndex(next);
    setElapsed(0);
    if (playing) engine().setTrack(next);
  };

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="eyebrow">Current vibe</p>
        <span
          className="text-[10px] font-bold tabular-nums"
          style={{ color: 'var(--text-tertiary)' }}
          aria-live="off"
        >
          {playing || elapsed ? formatTime(elapsed) : 'tap play ♪'}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl shrink-0 flex items-end justify-center gap-[3px] pb-2"
          style={{ background: 'linear-gradient(135deg, #c4b5fd, #f9a8d4)' }}
          aria-hidden
        >
          {Array.from({ length: BAR_COUNT }, (_, i) => (
            <span
              key={i}
              ref={(el) => {
                barsRef.current[i] = el;
              }}
              className="w-1 h-7 rounded-full bg-white origin-bottom transition-transform duration-75"
              style={{ transform: `scaleY(${IDLE_SCALE})` }}
            />
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold truncate" style={{ color: 'var(--text-primary)' }}>
            {track.title}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {track.subtitle} · {track.bpm} bpm
          </p>
        </div>
        <button
          type="button"
          data-squish
          onClick={() => setLiked((v) => !v)}
          aria-label={liked ? 'Unlike track' : 'Like track'}
          aria-pressed={liked}
          style={{ color: 'var(--accent-pink)' }}
        >
          <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="mt-4 flex items-center justify-center gap-6" style={{ color: 'var(--text-primary)' }}>
        <button type="button" data-squish onClick={() => skip(-1)} aria-label="Previous track">
          <SkipBack size={16} fill="currentColor" />
        </button>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
          className="btn-candy w-10 h-10 rounded-full flex items-center justify-center"
        >
          {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
        </button>
        <button type="button" data-squish onClick={() => skip(1)} aria-label="Next track">
          <SkipForward size={16} fill="currentColor" />
        </button>
      </div>
    </div>
  );
}
