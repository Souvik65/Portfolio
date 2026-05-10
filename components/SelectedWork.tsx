'use client';

import Image from 'next/image';

const projects = [
  {
    id: '01',
    title: 'Automatrix',
    tags: 'Next.js — Workflow Automation — Web',
    description: 'Automatrix is a web application that automates workflows for small businesses. It allows users to create custom workflows and automate repetitive tasks. It also includes a dashboard to track workflow performance.',
    link: 'https://automatrixx.vercel.app/',
    image: '/automatrix.webp',
    isLive: true,
  },
  {
    id: '02',
    title: 'StorageVault',
    tags: 'Cloud — Storage — Security',
    description: 'StorageVault is a secure cloud storage solution that allows users to store their files securely in the cloud. It also includes a dashboard to track file storage and usage.',
    link: 'https://storagevaultt.vercel.app/',
    image: '/storagevault.webp',
    isLive: true,
  },
  {
    id: '03',
    title: 'Real-Time DDoS Detection',
    tags: 'Python-ML — Network Security — Real-Time',
    description: `This project implements a real-time Distributed Denial of Service (DDoS) detection tool using machine learning techniques. The tool analyzes network traffic in real-time to identify and alert on potential DDoS attacks targeting a specified IP address. The system uses Scapy for packet sniffing and a trained machine learning model (based on features extracted from network flows) to classify traffic as normal or malicious.`,
    link: 'https://github.com/Souvik65/Real-time-DDoS-Dection-using-ML',
    // image: '',
    isLive: false,
  },
];

export function SelectedWork() {
  const handleExploreMore = () => {
    window.dispatchEvent(new CustomEvent('show-projects'));
  };

  return (
    <section className="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-surface-container-low" id="work">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-4">
          <h2 className="font-headline font-black text-6xl sm:text-6xl md:text-9xl uppercase leading-[0.8]">
            Selected <br /><span className="text-primary-fixed">Projects</span>
          </h2>
          <div className="text-on-surface-variant font-headline uppercase tracking-widest text-sm mt-4 md:mt-0">
            <button
              onClick={handleExploreMore}
              className="text-[10px] border-l-4 border-primary-fixed sm:text-xs uppercase sm:tracking-[0.2em] active:text-primary-fixed px-4 sm:px-5 justify-center gap-2.5 min-h-[48px] min-w-[48px] rounded-lg hover:bg-white/[0.1] active:bg-white/[0.06] font-headline text-xs tracking-widest text-[#e5e2e1] hover:text-primary-fixed hover:tracking-[0.3em] transition-all duration-700 py-3 flex items-center active:scale-95"
            >
              Tap to Explore More Projects
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block relative py-6 sm:py-8 md:py-16 border-t ${index === projects.length - 1 ? 'border-b' : ''} border-outline-variant/10 overflow-hidden transition-colors duration-500 hover:bg-surface-container-highest/20 cursor-pointer no-underline text-inherit`}
            >
              {project.isLive && (
                <div className="absolute top-4 right-4 md:top-6 md:left-8 md:right-auto z-20">
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
              )}              {/* project content container */}
              <div className="flex flex-col md:flex-row md:items-end justify-between relative z-10 transition-all duration-500 group-hover:px-2 md:group-hover:px-8 gap-3 md:gap-4">
                <div className="flex items-baseline gap-4 md:gap-8">
                  <span className="font-headline font-bold text-primary-fixed text-base md:text-lg transition-transform duration-500 group-hover:-translate-y-2">{project.id}</span>
                  <div className="flex flex-col">
                    <h3 className="font-headline font-bold text-2xl sm:text-3xl md:text-7xl uppercase tracking-tighter transition-all duration-500 group-hover:translate-x-4 group-hover:text-primary-fixed group-hover:scale-105 origin-left group-hover:drop-shadow-[0_0_15px_rgba(200,255,0,0.4)]">
                      {project.title}
                    </h3>
                    {/* tags */}
                    <div className="flex font-headline uppercase tracking-widest text-[10px] md:text-sm text-on-surface-variant transition-all duration-500 group-hover:text-primary-fixed group-hover:translate-x-4 mt-1 md:mt-2 items-center gap-2">
                      <span className="w-4 h-[1px] bg-on-surface-variant/90 group-hover:bg-primary-fixed transition-colors" />
                      <span>{project.tags}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description - always visible on mobile, hover on desktop */}
              <div className="relative z-10 max-h-32 opacity-100 md:max-h-0 md:opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden px-0 md:px-8">
                <p className="mt-2 md:mt-4 text-xs sm:text-sm md:text-base text-on-surface-variant/80 font-body max-w-2xl leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Website screenshot preview image — hidden on mobile */}
              {project.image && (
              <div className={`hidden md:block absolute ${index % 2 === 0 ? 'right-[10%]' : 'right-[15%]'} top-1/2 -translate-y-1/2 w-[350px] md:w-[400px] aspect-video opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none scale-75 group-hover:scale-110 z-0 group-hover:shadow-[0_0_50px_rgba(200,255,0,0.15)] rounded-xl overflow-hidden border border-white/5 bg-surface-container-highest`}>
                <Image
                  src={project.image}
                  alt={`${project.title} Preview`}
                  fill
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  unoptimized
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />                     
              </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-fixed/0 via-primary-fixed/5 to-primary-fixed/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
