"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { MagneticButton } from "@/components/MagneticButton";

const InteractiveHead = dynamic(
  () => import("./InteractiveHead").then((mod) => mod.InteractiveHead),
  { ssr: false },
);

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      ref={ref}
      id="home"
      className="min-h-[100svh] flex flex-col justify-center px-4 sm:px-6 md:px-12 pt-20 md:pt-24 pb-0 sm:pb-8 md:pb-24 relative z-20 bg-gradient-to-b from-[#0a0a0a] to-surface-container-lowest overflow-hidden"
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

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center relative z-10">
        <div className="md:col-span-12">
          <h1 className="font-headline font-black text-[clamp(3.7rem,9vw,12rem)] leading-[0.85] tracking-tighter uppercase">
            Software <br />
            <span className="text-primary-fixed">Developer</span> <br />
            {/* <span className="text-stroke">& UI Engineer</span> */}
          </h1>
        </div>

        <div className="md:col-span-5 mt-4 md:mt-12">
          <p className="text-on-surface-variant max-w-sm leading-relaxed text-sm sm:text-base md:text-lg">
            Building intelligent, real-world digital solutions at the
            intersection of software engineering and cybersecurity. Focused on
            AI systems, automation, and full-stack development with a drive for
            secure and scalable innovation.
          </p>
          <div className="mt-5 md:mt-8 flex flex-row gap-3 sm:gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-primary-fixed rounded-full text-on-primary-fixed px-5 sm:px-8 py-3 sm:py-4 font-headline font-bold uppercase tracking-widest text-xs sm:text-sm hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2 w-auto min-w-0 sm:min-w-[180px] shadow-[0_5px_30px_rgba(200,255,0,0.35)]"
            >
              View Projects
            </button>
            <MagneticButton strength={0.35} radius={360}>
              <a
                href="https://drive.google.com/file/d/1mBKIEboa0eP8ip-ZviDx4Eq2xkDCEzxg/preview"
                target="_blank"
                rel="noopener noreferrer"
                className="border rounded-[2rem] border-outline-variant/100 text-on-surface px-5 sm:px-8 py-3 sm:py-4 font-headline font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-surface-container-highest transition-all text-center w-auto shadow-[0_5px_30px_rgba(229,226,225,0.09)] block"
              >
                Resume
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* 3D model on desktop, static image on mobile */}
        <div className="md:col-span-7 rounded-br-[60px] flex justify-center md:justify-end relative h-[400px] sm:h-[480px] md:h-[600px]">          {isMobile ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full h-full flex items-end justify-center"
            >
              {/* Glow effect behind image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[100%] h-[100%] rounded-full bg-primary-fixed/5 blur-[100px]" />
              </div>
              <Image
                src="/souvik-hero.webp"
                alt="Souvik Debnath"
                width={800}
                height={900}
                className="relative z-10 object-contain object-bottom w-[125%] h-[111%] max-h-none drop-shadow-[0_0_30px_rgba(200,255,0,0.15)] pointer-events-none"
                priority
              />
            </motion.div>
          ) : (
            <div className="w-full h-full bg-surface-container-low/2 backdrop-blur-sm rounded-xl relative group">
              <InteractiveHead />
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] z-30 opacity-30 rounded-xl"></div>
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-surface-container-lowest to-transparent pointer-events-none z-30" />

    </section>
  );
}
