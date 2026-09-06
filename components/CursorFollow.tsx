'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useReducedMotion, AnimatePresence } from 'motion/react';

export interface CursorFollowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  defaultText?: string;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  bubbleClassName?: string;
  disabled?: boolean;
}

export function CursorFollow({
  children,
  className = '',
  defaultText = 'VIEW ↗',
  springConfig = { stiffness: 280, damping: 22, mass: 0.15 },
  bubbleClassName = '',
  disabled = false,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: CursorFollowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState<string>(defaultText);

  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const isTouchDevice = () => {
    return (
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0)
    );
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(e);

      if (disabled || shouldReduceMotion || isTouchDevice()) return;

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if target or any parent has data-cursor-text
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor-text]');

      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor-text');
        if (text) setCursorText(text);
        if (!isVisible) setIsVisible(true);
      } else {
        setCursorText(defaultText);
        if (!isVisible) setIsVisible(true);
      }
    },
    [disabled, shouldReduceMotion, cursorX, cursorY, defaultText, isVisible, onMouseMove]
  );

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseEnter?.(e);
    if (disabled || shouldReduceMotion || isTouchDevice()) return;
    setIsVisible(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(e);
    setIsVisible(false);
  };

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    onFocus?.(e);
    if (disabled || shouldReduceMotion || isTouchDevice()) return;
    const target = e.target as HTMLElement | null;
    const cursorTarget = target?.closest('[data-cursor-text]');
    if (cursorTarget) {
      const text = cursorTarget.getAttribute('data-cursor-text');
      if (text) setCursorText(text);
      const rect = cursorTarget.getBoundingClientRect();
      cursorX.set(rect.left + rect.width / 2);
      cursorY.set(rect.top + rect.height / 2);
      setIsVisible(true);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    onBlur?.(e);
    setIsVisible(false);
  };

  return (
    <div
      ref={containerRef}
      data-cursor-follow
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`relative outline-none ${className}`}
      {...props}
    >
      {children}

      {/* Floating Cursor Follow Bubble */}
      <AnimatePresence>
        {isVisible && !disabled && !shouldReduceMotion && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`pointer-events-none fixed z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 select-none ${bubbleClassName}`}
            style={{
              x: cursorX,
              y: cursorY,
              left: 0,
              top: 0,
            }}
          >
            <div className="bg-primary-fixed text-black font-headline font-black text-[11px] md:text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-full shadow-[0_0_25px_rgba(200,255,0,0.5)] border border-black/20 backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
              <span>{cursorText}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CursorFollow;
