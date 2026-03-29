"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import dynamic from "next/dynamic";

const InteractiveHead = dynamic(
  () => import("./InteractiveHead").then((mod) => mod.InteractiveHead),
  { ssr: false },
);

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      ref={ref}
      id="home"
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-24 relative z-20 bg-[#0a0a0a]"
    >
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
            Building intelligent, real-world digital solutions at the
            intersection of software engineering and cybersecurity. Focused on
            AI systems, automation, and full-stack development with a drive for
            secure and scalable innovation.
          </p>
          <div className="mt-8 flex gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-primary-fixed text-on-primary-fixed px-8 py-4 font-headline font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2 min-w-[180px]"
            >
              View Projects
            </button>
            <a
              href="https://drive.google.com/file/d/1c6kRGnfD3YpOgH4_JjTTOSm5EdHGgpzn/preview"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-outline-variant/100 text-on-surface px-8 py-4 font-headline font-bold uppercase tracking-widest text-sm hover:bg-surface-container-highest transition-all"
            >
              Resume
            </a>
          </div>
        </div>
        <div className="md:col-span-7 flex justify-end relative h-[400px] md:h-[600px]">
          <div className="w-full h-full bg-surface-container-low/2 backdrop-blur-sm rounded-xl relative group">
            {/* 3D Interactive Model */}
            <InteractiveHead />

            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] z-30 opacity-30 rounded-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
