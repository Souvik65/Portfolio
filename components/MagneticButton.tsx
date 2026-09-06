'use client';

import React, { useRef } from 'react';
import { motion, useSpring, useReducedMotion } from 'motion/react';

export interface MagneticButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  disabled?: boolean;
  className?: string;
}

export function MagneticButton({
  children,
  strength = 0.35,
  radius = 120,
  springConfig = { stiffness: 200, damping: 15, mass: 0.2 },
  disabled = false,
  className = '',
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(e);

    if (disabled || shouldReduceMotion || !ref.current) return;

    // Disable magnetic effect on touch/pointer-coarse devices
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0)
    ) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < radius) {
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(e);
    x.set(0);
    y.set(0);
  };

  if (disabled || shouldReduceMotion) {
    return (
      <div
        className={`inline-block ${className}`}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role="presentation"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      {...props}
    >
      <motion.div style={{ x, y }}>
        {children}
      </motion.div>
    </div>
  );
}

export default MagneticButton;
