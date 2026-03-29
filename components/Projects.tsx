'use client'; 
 
import { useEffect, useState, useRef, useCallback } from 'react'; 
import NextImage from 'next/image'; 

 
interface Project { 
  year: string; 
  title: string; 
  category: string; 
  stack: string; 
  image: string; 
  side: 'left' | 'right'; 
} 
 const ARCHIVE_PROJECTS: Project[] = [

  {
    year: '2026',
    title: 'Project 1',
    category: 'tech',
    stack: 'React / Next.js',
    image:
      '/asdf.jpg',
    side: 'left',
  },
  {
    year: '2026',
    title: 'Project 2',
    category: 'tech',
    stack: 'React / Next.js',
    image:
      '/asdf.jpg',
    side: 'right',
  },
  {
    year: '2026',
    title: 'Project 3',
    category: 'tech',
    stack: 'React / Next.js',
    image:
      '/asdf.jpg',
    side: 'left',
  },
  {
    year: '2026',
    title: 'Project 4',
    category: 'tech',
    stack: 'React / Next.js',
    image:
      '/asdf.jpg',
    side: 'right',
  },
  {
    year: '2026',
    title: 'Project 5',
    category: 'tech',
    stack: 'React / Next.js',
    image:
      '/asdf.jpg',
    side: 'left',
  },
  {
    year: '2026',
    title: 'Project 6',
    category: 'tech',
    stack: 'React / Next.js',
    image:
      '/asdf.jpg',
    side: 'right',
  },
];

export function Projects() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateGlow = useCallback(() => {
    const container = timelineContainerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    const rect = container.getBoundingClientRect();
    const viewportH = window.innerHeight;

    // How far the viewport center has traveled through the container (0-1)
    const progress = Math.min(Math.max((viewportH * 0.6 - rect.top) / rect.height, 0), 1);

    // Scale the line from 0% to 100% height
    glow.style.transform = `scaleY(${progress})`;

    // Light up dots that the progress line has reached
    const filledHeight = progress * rect.height;
    dotRefs.current.forEach((dot) => {
      if (!dot) return;
      const dotRect = dot.getBoundingClientRect();
      const dotTop = dotRect.top - rect.top + dotRect.height / 2;
      if (dotTop <= filledHeight) {
        dot.classList.add('timeline-dot-active');
      } else {
        dot.classList.remove('timeline-dot-active');
      }
    });
  }, []);

  useEffect(() => {
    if (!visible) return;
    window.addEventListener('scroll', updateGlow, { passive: true });
    // Initial position
    requestAnimationFrame(updateGlow);
    return () => window.removeEventListener('scroll', updateGlow);
  }, [visible, updateGlow]);

  useEffect(() => {
    const show = () => {
      setVisible(true);
      // Use double rAF to ensure DOM update is complete
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        });
      });
    };

    window.addEventListener('show-projects', show);
    return () => window.removeEventListener('show-projects', show);
  }, []);

  if (!visible) return null;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-[#0a0a0a] overflow-hidden"
      style={{ animation: 'projects-reveal 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards' }}
    >
      {/* Header */}
      <header className="pt-32 pb-24 px-8 md:px-12 lg:px-24 text-center md:text-left">
        <div className="text-md font-bold uppercase tracking-[0.4em] text-primary-fixed mb-6 flex items-center justify-center md:justify-start gap-4">
          <span className="w-12 h-[1px] bg-primary-fixed" />
          PROJECTS ARCHIVE
        </div>
        <h2 className="font-headline font-black uppercase leading-[0.85] tracking-tighter text-[clamp(4rem,12vw,10rem)] mb-12">
          COLLECTED<br />
          <span className="text-stroke">WORKS</span>
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <p className="max-w-xl text-on-surface opacity-60 text-lg md:text-xl leading-relaxed font-light text-left">
            A comprehensive technical index of immersive environments, creative engineering
            protocols, and digital artifacts developed between 2020—2024.
          </p>
          <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-on-surface opacity-40 text-right">
            TOTAL ENTRIES: {String(ARCHIVE_PROJECTS.length).padStart(2, '0')}
            <br />
            STATUS: OPTIMIZED
          </div>
        </div>
      </header>

      {/* Timeline */}
      <div ref={timelineContainerRef} className="relative px-8 md:px-12 lg:px-24 min-h-screen pb-32">
        {/* Central axis line — static track */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-white/[0.06]" />

        {/* Scroll-tracking progress line */}
        <div
          ref={glowRef}
          className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 pointer-events-none z-10 origin-top"
          style={{ transform: 'scaleY(0)' }}
        >
          <div className="w-full h-full bg-primary-fixed shadow-[0_0_8px_rgba(200,255,0,0.5),0_0_20px_rgba(200,255,0,0.2)]" />
        </div>

        <div className="flex flex-col gap-24 relative">
          {ARCHIVE_PROJECTS.map((project, index) => {
            const isLeft = project.side === 'left';
            return (
              <div
                key={index}
                className={`group relative flex flex-col ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center justify-center min-h-[160px]`}
                style={{
                  opacity: 0,
                  animation: `timeline-entry-in 0.6s ${0.15 * index}s cubic-bezier(0.23, 1, 0.32, 1) forwards`,
                }}
              >
                {/* Timeline dot */}
                <div
                  ref={(el) => { dotRefs.current[index] = el; }}
                  className="absolute left-4 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 w-[9px] h-[9px] bg-primary-fixed rounded-full z-10 opacity-0 scale-0 transition-all duration-500"
                />

                {/* Image / year side */}
                <div
                  className={`hidden md:block w-1/2 ${
                    isLeft ? 'pr-20 text-right' : 'pl-20 text-left'
                  }`}
                >
                  <span className="font-headline text-[10px] tracking-[0.5em] text-primary-fixed block mb-2">
                    {project.year}
                  </span>
                  {/* Reveal image on hover */}
                  <div
                    className={`absolute ${
                      isLeft ? 'right-1/2 mr-24' : 'left-1/2 ml-24'
                    } top-0 w-80 h-48 overflow-hidden border border-white/10 opacity-0 translate-x-5 pointer-events-none transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-100 group-hover:translate-x-0`}
                  >
                    <NextImage
                      alt={project.title}
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      src={project.image}
                      fill
                      unoptimized
                    />
                  </div>
                </div>

                {/* Text side */}
                <div
                  className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                    isLeft
                      ? 'md:pl-20'
                      : 'md:pr-20 text-left md:text-right'
                  }`}
                >
                  <h3 className="font-headline font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter uppercase transition-colors duration-300 group-hover:text-primary-fixed mb-4">
                    {project.title}
                  </h3>
                  <div
                    className={`flex flex-wrap gap-8 ${
                      !isLeft ? 'md:justify-end' : ''
                    }`}
                  >
                    <div>
                      <span className="block text-[8px] tracking-[0.2em] opacity-40 uppercase mb-1">
                        CATEGORY
                      </span>
                      <span className="font-headline font-bold text-xs uppercase">
                        {project.category}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[8px] tracking-[0.2em] opacity-40 uppercase mb-1">
                        STACK
                      </span>
                      <span className="font-headline font-bold text-xs uppercase">
                        {project.stack}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Close / collapse button */}
      <div className="flex justify-center pb-24">
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="group relative overflow-hidden bg-transparent border border-outline-variant px-12 py-6 transition-all hover:border-primary-fixed cursor-pointer"
        >
          <div className="absolute inset-0 bg-primary-fixed translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10 font-label text-[12px] font-black tracking-[0.5em] text-on-surface group-hover:text-black transition-colors uppercase">
            COLLAPSE PROJECTS
          </span>
        </button>
      </div>
    </section>
  );
}
