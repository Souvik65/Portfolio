'use client';

import Image from 'next/image';

const projects = [
  {
    id: '01',
    title: 'Automatrix',
    tags: 'Next.js — Workflow Automation — Web',
    description: 'Automatrix is a web application that automates workflows for small businesses. It allows users to create custom workflows and automate repetitive tasks. It also includes a dashboard to track workflow performance.',
    link: 'https://automatrixx.vercel.app/',
    image: '/automatrix.png',
  },
  {
    id: '02',
    title: 'CloudVault',
    tags: 'Cloud — Storage — Security',
    description: 'CloudVault is a secure cloud storage solution that allows users to store their files securely in the cloud. It also includes a dashboard to track file storage and usage.',
    link: 'https://cloudvaullt.netlify.app/',
    image: 'https://image.thum.io/get/width/800/crop/1000/https://cloudvaullt.netlify.app/',
  },
  {
    id: '03',
    title: 'Real-Time DDoS Detection',
    tags: 'Python-ML — Network Security — Real-Time',
    description: `This project implements a real-time Distributed Denial of Service (DDoS) detection tool using machine learning techniques. The tool analyzes network traffic in real-time to identify and alert on potential DDoS attacks targeting a specified IP address. The system uses Scapy for packet sniffing and a trained machine learning model (based on features extracted from network flows) to classify traffic as normal or malicious.`,
    link: 'https://github.com/Souvik65/Real-time-DDoS-Dection-using-ML',
    // image: '',
  },
];

export function SelectedWork() {
  const handleExploreMore = () => {
    window.dispatchEvent(new CustomEvent('show-projects'));
  };

  return (
    <section className="py-32 px-6 md:px-12 bg-surface-container-low" id="work">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <h2 className="font-headline font-black text-7xl md:text-9xl uppercase leading-[0.8]">
            Selected <br /><span className="text-primary-fixed">Projects</span>
          </h2>
          <div className="text-on-surface-variant font-headline uppercase tracking-widest text-sm mt-8 md:mt-0">
            <button
              onClick={handleExploreMore}
              className="bg-transparent border-l-15 border-primary-fixed cursor-pointer text-on-surface-variant font-headline uppercase tracking-widest text-md hover:text-primary-fixed font-bold
              group hover:tracking-[0.3em] transition-all duration-700"
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
              className={`group block relative py-16 border-t ${index === projects.length - 1 ? 'border-b' : ''} border-outline-variant/10 overflow-hidden transition-colors duration-500 hover:bg-surface-container-highest/20 cursor-pointer no-underline text-inherit`}
            >
              {/* project content container */}
              <div className="flex flex-col md:flex-row md:items-end justify-between relative z-10 transition-all duration-500 group-hover:px-4 md:group-hover:px-8 gap-4">
                <div className="flex items-baseline gap-8">
                  <span className="font-headline font-bold text-primary-fixed text-lg transition-transform duration-500 group-hover:-translate-y-2">{project.id}</span>
                  <div className="flex flex-col">
                    <h3 className="font-headline font-bold text-5xl md:text-7xl uppercase tracking-tighter transition-all duration-500 group-hover:translate-x-4 group-hover:text-primary-fixed group-hover:scale-105 origin-left group-hover:drop-shadow-[0_0_15px_rgba(200,255,0,0.4)]">
                      {project.title}
                    </h3>
                    {/* tags - fixed hover color to solid green */}
                    <div className="flex font-headline uppercase tracking-widest text-[10px] md:text-sm text-on-surface-variant transition-all duration-500 group-hover:text-primary-fixed group-hover:translate-x-4 mt-2 items-center gap-2">
                      <span className="w-4 h-[1px] bg-on-surface-variant/90 group-hover:bg-primary-fixed transition-colors" />
                      <span>{project.tags}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description - visible on hover */}
              <div className="relative z-10 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden px-4 md:px-8">
                <p className="mt-4 text-sm md:text-base text-on-surface-variant/80 font-body max-w-2xl leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Website screenshot preview image */}
              {project.image && (
              <div className={`absolute ${index % 2 === 0 ? 'right-[10%]' : 'right-[15%]'} top-1/2 -translate-y-1/2 w-[350px] md:w-[400px] aspect-video opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none scale-75 group-hover:scale-110 z-0 group-hover:shadow-[0_0_50px_rgba(200,255,0,0.15)] rounded-xl overflow-hidden border border-white/5 bg-surface-container-highest`}>
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

