'use client';

import { Star, Zap, Terminal, Triangle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const MarqueeItem = () => (
  <div className="flex shrink-0 gap-4 sm:gap-6 md:gap-12 items-center pr-4 sm:pr-6 md:pr-12">
    <span className="font-headline font-black text-2xl sm:text-5xl md:text-8xl uppercase text-stroke">Software Developer</span>
    <Star className="text-primary-fixed shrink-0 w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
    <span className="font-headline font-black text-2xl sm:text-5xl md:text-8xl uppercase text-on-surface">UI Engineer</span>
    <Zap className="text-primary-fixed shrink-0 w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
    <span className="font-headline font-black text-2xl sm:text-5xl md:text-8xl uppercase text-stroke">React</span>
    <Terminal className="text-primary-fixed shrink-0 w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
    <span className="font-headline font-black text-2xl sm:text-5xl md:text-8xl uppercase text-on-surface">Cybersecurity</span>
    <Triangle className="text-primary-fixed shrink-0 w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
    <span className="font-headline font-black text-2xl sm:text-5xl md:text-8xl uppercase text-stroke">Networking</span>
    <Sparkles className="text-primary-fixed shrink-0 w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
    <span className="font-headline font-black text-2xl sm:text-5xl md:text-8xl uppercase text-on-surface">Next.JS</span>
    <Star className="text-primary-fixed shrink-0 w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
    <span className="font-headline font-black text-2xl sm:text-5xl md:text-8xl uppercase text-stroke">Web Development</span>
    <Star className="text-primary-fixed shrink-0 w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
    <span className="font-headline font-black text-2xl sm:text-5xl md:text-8xl uppercase text-on-surface">AI/ML</span>
    <Star className="text-primary-fixed shrink-0 w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
  </div>
);

export function Marquee() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="py-6 md:py-12 bg-surface-container-lowest overflow-hidden relative z-10 group cursor-pointer"
    >
      <div className="animate-marquee whitespace-nowrap flex w-max shrink-0 hover:[animation-play-state:paused] group-hover:[animation-play-state:paused]">
        <MarqueeItem />
        <MarqueeItem />
       
      </div>
    </motion.section>
  );
}
