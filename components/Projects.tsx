'use client'; 
 
import { useEffect, useState, useRef, useCallback } from 'react'; 
import NextImage from 'next/image'; 

 
interface Project { 

  title: string; 
  category: string; 
  stack: string; 
  image: string; 
  side: 'left' | 'right'; 
  isLive: boolean;
  link?: string;
  
} 
const ARCHIVE_PROJECTS: Project[] = [
  
  {
    title: 'Face recognition Attendence system',
    category: 'Real-Time Face Recognition Attendance System',
    stack: 'Python / OpenCV / Face Recognition Library',
    image: '/face.webp',
    side: 'right',
    isLive: false,
    link: 'https://ebookdrivee.netlify.app/',
  },
  {
    title: 'Real-Time Bus Tracking App',
    category: 'Real-time location tracking',
    stack: 'Node.js / Express / Socket.IO / EJS / Leaflet',
    image: '/bus-track.webp',
    side: 'left',
    isLive: false,
    
  },
  {
    title: 'E-Commerce website',
    category: 'E-Commerce/Freelance project',
    stack: 'React / TypeScript / Vite / CSS',
    image: '/blushycheeks.webp',
    side: 'right',
    isLive: true,
    link: 'https://blushy-cheeks.vercel.app/',
  },
  {
    title: 'Photography Portfolio',
    category: 'Photography',    stack: 'React / Next.js / TypeScript / Tailwind CSS / PostgreSQL',
    image: '/photo-portfolio.webp',
    side: 'left',
    isLive: true,
    link: 'https://lenslightportfolio.vercel.app',
  },
  {
    title: 'E-Book store',
    category: 'E-Commerce',
    stack: 'React / Next.js',
    image: '/ebookdrive.webp',
    side: 'right',
    isLive: true,
    link: 'https://ebookdrivee.netlify.app/',
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

    const progress = Math.min(Math.max((viewportH * 0.6 - rect.top) / rect.height, 0), 1);

    glow.style.transform = `scaleY(${progress})`;

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
    requestAnimationFrame(updateGlow);
    return () => window.removeEventListener('scroll', updateGlow);
  }, [visible, updateGlow]);

  useEffect(() => {
    const show = () => {
      setVisible(true);
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
      <header className="pt-16 md:pt-32 pb-12 md:pb-24 px-4 sm:px-8 md:px-12 lg:px-24 text-center md:text-left">
        <div className="text-sm md:text-md font-bold uppercase tracking-[0.4em] text-primary-fixed mb-4 md:mb-6 flex items-center justify-center md:justify-start gap-4">
          <span className="w-8 md:w-12 h-[1px] bg-primary-fixed" />
          PROJECTS ARCHIVE
        </div>
        <h2 className="font-headline font-black uppercase leading-[0.85] tracking-tighter text-[clamp(3.75rem,12vw,10rem)] mb-6 md:mb-12">
          OTHER<br />
          <span className="text-stroke">PROJECTS</span>
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-8">
          <p className="max-w-xl text-on-surface opacity-60 text-base md:text-xl leading-relaxed font-light text-left">
            A curated collection of additional projects showcasing my journey in development, cybersecurity, and problem-solving.
            Each project reflects hands-on learning, experimentation, and continuous improvement.
          </p>
          <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-on-surface opacity-40 text-left md:text-right">
            TOTAL ENTRIES: {String(ARCHIVE_PROJECTS.length).padStart(2, '0')}
            <br />
            STATUS: OPTIMIZED
          </div>
        </div>
      </header>

      {/* Timeline */}
      <div ref={timelineContainerRef} className="relative px-4 sm:px-8 md:px-12 lg:px-24 min-h-screen pb-16 md:pb-32">
        {/* Central axis line — static track */}
        <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-white/[0.06]" />

        {/* Scroll-tracking progress line */}
        <div
          ref={glowRef}
          className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 pointer-events-none z-10 origin-top"
          style={{ transform: 'scaleY(0)' }}
        >
          <div className="w-full h-full bg-primary-fixed shadow-[0_0_8px_rgba(200,255,0,0.5),0_0_20px_rgba(200,255,0,0.2)]" />
        </div>

        <div className="flex flex-col gap-16 md:gap-24 relative">
          {ARCHIVE_PROJECTS.map((project, index) => {
            const isLeft = project.side === 'left';
            return (
              <div
                key={index}
                className={`group relative flex flex-col ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-start md:items-center justify-center min-h-[120px] md:min-h-[160px]`}
                style={{
                  opacity: 0,
                  animation: `timeline-entry-in 0.6s ${0.15 * index}s cubic-bezier(0.23, 1, 0.32, 1) forwards`,
                }}
              >
                {/* Timeline dot */}
                <div
                  ref={(el) => { dotRefs.current[index] = el; }}
                  className="absolute left-[14px] sm:left-[22px] md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 w-[9px] h-[9px] bg-primary-fixed rounded-full z-10 opacity-0 scale-0 transition-all duration-500"
                />

                {/* Image / year side — desktop only */}
                <div
                  className={`hidden md:block w-1/2 ${
                    isLeft ? 'pr-20 text-right' : 'pl-20 text-left'
                  }`}
                >
                  <a
                    href={project.link ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`absolute ${
                      isLeft ? 'right-1/2 mr-24' : 'left-1/2 ml-24'
                    } top-0 w-80 h-48 overflow-hidden border border-white/10
                    transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]
                    group-hover:w-[25rem] group-hover:h-60 ${
                      project.link ? 'cursor-pointer' : 'cursor-default pointer-events-none'
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <NextImage
                        alt={project.title}
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        src={project.image}
                        fill
                      />
                    </div>
                  </a>
                </div>

                {/* Text side */}
                <div
                  className={`w-full md:w-1/2 pl-10 sm:pl-12 md:pl-0 ${
                    isLeft
                      ? 'md:pl-20'
                      : 'md:pr-20 text-left md:text-right'
                  }`}
                >
                  <h3 className="font-headline font-black text-2xl sm:text-4xl md:text-6xl lg:text-7xl tracking-tighter uppercase transition-colors duration-300 group-hover:text-primary-fixed mb-2 md:mb-4">
                    {project.title}
                  </h3>
                  <div
                    className={`flex flex-wrap gap-4 md:gap-8 ${
                      !isLeft ? 'md:justify-end' : ''
                    }`}
                  >
                    {project.isLive && (
                      <div className="z-20">                        
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full 
                          bg-black/40 backdrop-blur-md border border-primary-fixed/30 
                          shadow-[0_0_12px_rgba(200,255,0,0.2)]">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-fixed opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-fixed shadow-[0_0_8px_rgba(200,255,0,0.8)]"></span>
                          </span>
                          <span className="text-[10px] md:text-xs font-headline font-bold text-primary-fixed uppercase tracking-[0.2em]">
                            Live
                          </span>
                        </div>
                      </div>
                    )}  
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
      <div className="flex justify-center pb-12 md:pb-24 px-4">
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="group relative overflow-hidden bg-transparent border border-outline-variant px-8 md:px-12 py-4 md:py-6 transition-all hover:border-primary-fixed cursor-pointer w-full sm:w-auto"
        >
          <div className="absolute inset-0 bg-primary-fixed translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10 font-label text-[11px] md:text-[12px] font-black tracking-[0.5em] text-on-surface group-hover:text-black transition-colors uppercase">
            COLLAPSE PROJECTS
          </span>
        </button>
      </div>
    </section>
  );
}
