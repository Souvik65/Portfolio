'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => setIsLoading(false), 400);
      return () => clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.floor(Math.random() * 15) + 5, 100));
    }, 100);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[1000] bg-surface-container-low flex flex-col items-center justify-center p-12"
        >
          <div className="w-full max-w-4xl flex flex-col">
            <div className="font-headline font-bold text-primary-fixed tracking-tighter text-2xl mb-4">Loading...</div>
            <div className="h-[1px] w-full bg-surface-container-highest relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-primary-fixed"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'linear', duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between mt-4 font-headline text-on-surface-variant uppercase tracking-widest text-xs">
              <span>Initializing Core</span>
              <span className="text-primary-fixed">{Math.min(progress, 100)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
