'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const followerX = useSpring(0, { stiffness: 150, damping: 20 });
  const followerY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.innerWidth <= 768) return;
    
    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      followerX.set(e.clientX);
      followerY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const textTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'button', 'li', 'label', 'strong', 'em'];
      const isTextElement = textTags.includes(target.tagName.toLowerCase());
      
      let hasDirectText = false;
      for (const node of Array.from(target.childNodes)) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
          hasDirectText = true;
          break;
        }
      }

      if (
        isTextElement ||
        hasDirectText ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.group')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [followerX, followerY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 border pointer-events-none z-[10000] rounded-full flex items-center justify-center"
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 60 : 20,
          height: isHovering ? 60 : 20,
          backgroundColor: isHovering ? 'rgba(200, 255, 0, 1)' : 'transparent',
          borderColor: isHovering ? 'transparent' : 'rgba(200, 255, 0, 0.5)',
          mixBlendMode: isHovering ? 'difference' : 'normal',
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
      />
    </>
  );
}
