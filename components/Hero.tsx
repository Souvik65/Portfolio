'use client';

import { Scan, Hexagon, Loader2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const InteractiveHead = dynamic(() => import('./InteractiveHead').then(mod => mod.InteractiveHead), { ssr: false });

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);

  const handleViewProjects = () => {
    setIsProjectsLoading(true);
    setTimeout(() => {
      setIsProjectsLoading(false);
    }, 2000);
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-24 relative z-20 bg-[#0a0a0a]">
      {/* Parallax Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-fixed/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary-fixed/5 blur-[150px]" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-white/5 blur-[100px]" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        <div className="md:col-span-12">
          <h1 className="font-headline font-black text-[clamp(3rem,10vw,12rem)] leading-[0.85] tracking-tighter uppercase">
            Software <br />
            <span className="text-primary-fixed">Developer</span> <br />
            <span className="text-stroke">&amp; UI Engineer</span>
          </h1>
        </div>
        <div className="md:col-span-5 mt-12">
          <p className="text-on-surface-variant max-w-sm leading-relaxed text-lg">
            Crafting cinematic digital experiences at the intersection of high-end design and precision engineering. Focused on WebGL, 3D interaction, and brutalist aesthetics.
          </p>
          <div className="mt-8 flex gap-4">
            <button 
              onClick={handleViewProjects}
              disabled={isProjectsLoading}
              className="bg-primary-fixed text-on-primary-fixed px-8 py-4 font-headline font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2 min-w-[180px]"
            >
              {isProjectsLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "View Projects"
              )}
            </button>
            <button className="border border-outline-variant/30 text-on-surface px-8 py-4 font-headline font-bold uppercase tracking-widest text-sm hover:bg-surface-container-highest transition-all">
              Resume
            </button>
          </div>
        </div>
        <div className="md:col-span-7 flex justify-end relative h-[400px] md:h-[600px]">
          <div className="w-full h-full bg-surface-container-low/20 backdrop-blur-sm border border-primary-fixed/10 rounded-xl relative group">
            
            {/* 3D Interactive Model */}
            <InteractiveHead />

            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between items-start">
                <div className="font-headline text-[10px] tracking-[0.3em] uppercase text-primary-fixed/50 flex flex-col gap-1">
                  <span>System: WebGL_Core_v2</span>
                  <span className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary-fixed animate-pulse"></span>
                    Rendering: Active
                  </span>
                </div>
                <div className="text-primary-fixed/20">
                  <Scan size={36} />
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="font-headline uppercase">
                  <div className="text-xs tracking-[0.2em] text-primary-fixed/60 mb-1">Experimental Artifact</div>
                  <div className="text-2xl font-bold tracking-tighter text-on-surface">Torus_Knot_01</div>
                </div>
                <div className="flex items-center gap-4 text-primary-fixed bg-surface-container-highest/80 backdrop-blur-md px-4 py-2 rounded-full border border-primary-fixed/20 shadow-xl">
                  <Hexagon className="animate-spin-slow" size={24} />
                  <div className="font-headline uppercase tracking-tighter text-[10px] leading-tight font-bold">
                    Interactive<br />Model
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] z-30 opacity-30 rounded-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
