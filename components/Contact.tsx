'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

interface FloatingBubble {
  id: number;
  x: number;
  y: number;
  drift: number;
  size: number;
  delay: number;
  rotate: number;
}

export function Contact() {
  const [bubbles, setBubbles] = useState<FloatingBubble[]>([]);
  const idCounter = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const email = "souvikdn.work@gmail.com";

  const handleCopy = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);

    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();

    // Spawn 5-8 bubbles at random positions across the section
    const count = 5 + Math.floor(Math.random() * 4);
    const newBubbles: FloatingBubble[] = Array.from({ length: count }, () => {
      idCounter.current += 1;
      return {
        id: idCounter.current,
        x: 10 + Math.random() * 80,           // 10-90% horizontal
        y: 30 + Math.random() * 50,            // start in middle area
        drift: (Math.random() - 0.9) * 60,     // horizontal wiggle px
        size: 0.7 + Math.random() * 0.6,       // scale 0.7-1.3
        delay: Math.random() * 0.1,            // stagger 0-300ms
        rotate: -10 + Math.random() * 20,      // initial tilt -10 to 10
      };
    });

    setBubbles(prev => [...prev, ...newBubbles]);

    // Clean up bubbles after animation completes
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => !newBubbles.includes(b)));
    }, 3500);
  }, [email]);

  const socials = [
    { name: "Instagram", url: "https://www.instagram.com/1.m_sk/", icon: <FaInstagram /> },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/kivuos/", icon: <FaLinkedin /> },
    { name: "GitHub", url: "https://github.com/Souvik65", icon: <FaGithub /> },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-[70vh] md:min-h-screen flex flex-col justify-center items-center text-center py-20 sm:py-24 md:py-32 px-5 sm:px-8 bg-[#0a0a0a] relative overflow-hidden"
      id="contact"
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary-fixed/5 rounded-full blur-[200px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary-fixed/5 rounded-full blur-[200px]" />
      </div>

      {/* === Floating "COPIED" balloons === */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        <AnimatePresence>
          {bubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              className="absolute"
              style={{ left: `${bubble.x}%`, top: `${bubble.y}%` }}
              initial={{ opacity: 0, y: 0, x: 0, scale: 0.3, rotate: bubble.rotate }}
              animate={{
                opacity: [0, 1, 1, 0.6, 0],
                y: [0, -80, -200, -350, -500],
                x: [0, bubble.drift * 0.3, bubble.drift, bubble.drift * 0.7, bubble.drift * 1.2],
                scale: [0.3, bubble.size, bubble.size * 1.05, bubble.size * 0.9, bubble.size * 0.5],
                rotate: [-5, 3, -3, 5, 0],
              }}
              transition={{
                duration: 2.8 + bubble.delay,
                delay: bubble.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="bg-primary-fixed text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-headline font-black text-[9px] sm:text-[11px] tracking-[0.2em] whitespace-nowrap shadow-[0_2px_16px_rgba(200,255,0,0.35)] select-none">
                COPIED ✓
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto space-y-14 sm:space-y-16 md:space-y-24">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-headline font-black text-[clamp(2.8rem,13vw,10rem)] uppercase leading-[0.85] tracking-tighter"
        >
          Let&apos;s work <br />
          <span className="text-primary-fixed">Together</span>
        </motion.h2>

        {/* Email CTA */}
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            onClick={handleCopy}
            href={`mailto:${email}`}
            className="group relative font-headline font-bold text-[clamp(1.15rem,5vw,5rem)] tracking-tight hover:text-primary-fixed active:text-primary-fixed transition-colors duration-300 cursor-pointer min-h-[48px] flex items-center justify-center"
            aria-label={`Copy email address: ${email}`}
          >
            <span className="relative z-10 block transition-transform active:scale-95 duration-300 break-all sm:break-normal">
              {email}
            </span>
          </motion.a>

          {/* Hint text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.35 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] pointer-events-none flex items-center gap-3"
          >
            <span className="w-5 sm:w-8 h-px bg-current opacity-40" />
            TAP TO COPY
            <span className="w-5 sm:w-8 h-px bg-current opacity-40" />
          </motion.p>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap gap-3 sm:gap-6 md:gap-10 justify-center pt-4 sm:pt-8 md:pt-12">
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index + 0.6 }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${social.name} profile`}
              className="group text-[10px] sm:text-xs uppercase tracking-widest sm:tracking-[0.2em] active:text-primary-fixed px-4 sm:px-5 justify-center gap-2.5 min-h-[48px] min-w-[48px] rounded-lg hover:bg-white/[0.1] active:bg-white/[0.06] font-headline text-[#e5e2e1] hover:text-primary-fixed hover:tracking-[0.7em] transition-all duration-700 py-3 flex items-center active:scale-95"
            >
              <span className="text-base sm:text-lg transition-transform duration-500 group-hover:scale-110 group-active:scale-90">
                {social.icon}
              </span>
              <span className="hidden sm:inline">{social.name}</span>
              <span className="inline-block text-[8px] sm:text-[10px] opacity-40 group-hover:opacity-80 transition-opacity">
                ↗
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
