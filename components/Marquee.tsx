'use client';

import { Star, Zap, Terminal, Triangle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const MarqueeItem = () => (
  <div className="flex gap-12 items-center pr-12">
    <span className="font-headline font-black text-6xl md:text-8xl uppercase text-stroke">Software Developer</span>
    <Star className="text-primary-fixed" size={60} />
    <span className="font-headline font-black text-6xl md:text-8xl uppercase text-on-surface">UI Engineer</span>
    <Zap className="text-primary-fixed" size={60} />
    <span className="font-headline font-black text-6xl md:text-8xl uppercase text-stroke">React</span>
    <Terminal className="text-primary-fixed" size={60} />
    <span className="font-headline font-black text-6xl md:text-8xl uppercase text-on-surface">Cybersecurity</span>
    <Triangle className="text-primary-fixed" size={60} />
    <span className="font-headline font-black text-6xl md:text-8xl uppercase text-stroke">Networking</span>
    <Sparkles className="text-primary-fixed" size={60} />
    <span className="font-headline font-black text-6xl md:text-8xl uppercase text-on-surface">Web Development</span>
    <Star className="text-primary-fixed" size={60} />
  </div>
);

export function Marquee() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="py-12 border-y border-outline-variant/10 bg-surface-container-lowest overflow-hidden relative z-10"
    >
      <div className="animate-marquee whitespace-nowrap flex w-max">
        <MarqueeItem />
        <MarqueeItem />
      </div>
    </motion.section>
  );
}

