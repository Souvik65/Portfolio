'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export function CustomCursor() {
  const [isSuppressed, setIsSuppressed] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  const followerX = useSpring(0, { stiffness: 180, damping: 22 });
  const followerY = useSpring(0, { stiffness: 180, damping: 22 });

  useEffect(() => {
    // Only show custom cursor on desktop
    if (typeof window === 'undefined' || window.innerWidth <= 768) return;

    const moveCursor = (e: MouseEvent) => {
      followerX.set(e.clientX);
      followerY.set(e.clientY);
      if (!hasMoved) setHasMoved(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if hovering inside Work or Projects sections or over CursorFollow elements
      const inCursorFollowZone = !!(
        target.closest('#work') ||
        target.closest('#projects') ||
        target.closest('[data-cursor-text]') ||
        target.closest('.cursor-follow-zone') ||
        target.closest('[data-cursor-follow]')
      );

      setIsSuppressed(inCursorFollowZone);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [followerX, followerY, hasMoved]);

  return (
    <motion.div
      aria-hidden="true"
      className="hidden md:flex fixed top-0 left-0 pointer-events-none z-[10000] rounded-full items-center justify-center"
      style={{
        x: followerX,
        y: followerY,
        translateX: '-50%',
        translateY: '-50%',
        width: 18,
        height: 18,
        backgroundColor: 'transparent',
        border: '1.5px solid rgba(200, 255, 0, 0.75)',
        boxShadow: '0 0 10px rgba(200, 255, 0, 0.35)',
        opacity: hasMoved && !isSuppressed ? 1 : 0,
      }}
      transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
    />
  );
}

export default CustomCursor;

