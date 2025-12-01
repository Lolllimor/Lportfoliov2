'use client';

import { Burger, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { navItems } from '../constants/navlist';

function MobileSidebar() {
  const [opened, { open, close, toggle }] = useDisclosure(false);
  return (
    <>
      <Burger
        opened={opened}
        onClick={toggle}
        className="hidden max-[520px]:inline-block"
        size="lg"
      />
      <Drawer
        radius="md"
        opened={opened}
        onClose={close}
        aria-label="Toggle navigation"
      >
        <ul className="flex flex-col gap-[2rem]">
          {navItems.map((item, idx) => (
            <li
              key={idx}
              className="flex text-[17px] font-mono transition-all duration-[.3s] rounded-lg p-2"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-card)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <a
                href={item.link}
                className="w-full flex items-center gap-2"
                onClick={close}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <span className="gradient-text">0{idx + 1}.</span>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  );
}

export default MobileSidebar;
