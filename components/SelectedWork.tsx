'use client';

import Image from 'next/image';

const projects = [
  {
    id: '01',
    title: 'Automatrix',
    tags: 'Next.js — Workflow Automation — Web',
    description: 'Automatrix is a web application that automates workflows for small businesses. It allows users to create custom workflows and automate repetitive tasks. It also includes a dashboard to track workflow performance.',
    link: 'https://automatrixx.vercel.app/',
    image: `https://image.thum.io/get/width/800/crop/1000/https://automatrixx.vercel.app/`,  },
  {
    id: '02',
    title: 'CloudVault',
    tags: 'Cloud — Storage — Security',
    description: 'CloudVault is a secure cloud storage solution that allows users to store their files securely in the cloud. It also includes a dashboard to track file storage and usage.',
    link: 'https://cloudvaullt.netlify.app/',
    image: `https://image.thum.io/get/width/800/crop/1000/https://cloudvaullt.netlify.app/`,
  },
  {
    id: '03',
    title: 'Iventions',
    tags: 'Frontend Architecture ',
    description: 'Iventions is a web application that allows users to create custom workflows and automate repetitive tasks. It also includes a dashboard to track workflow performance.',
    link: 'https://github.com/your-actual-username/iventions',
    image: `https://image.thum.io/get/width/800/crop/1000/https://github.com/your-actual-username/iventions`,  },
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
              className="bg-transparent border-none cursor-pointer text-on-surface-variant font-headline uppercase tracking-widest text-sm hover:text-primary-fixed transition-colors duration-300"
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
              <div className="flex items-center justify-between relative z-10 transition-all duration-500 group-hover:px-4 md:group-hover:px-8">
                <div className="flex items-baseline gap-8">
                  <span className="font-headline font-bold text-primary-fixed text-lg transition-transform duration-500 group-hover:-translate-y-2">{project.id}</span>
                  <h3 className="font-headline font-bold text-5xl md:text-7xl uppercase tracking-tighter transition-all duration-500 group-hover:translate-x-4 group-hover:text-primary-fixed group-hover:scale-105 origin-left group-hover:drop-shadow-[0_0_15px_rgba(200,255,0,0.4)]">
                    {project.title}
                  </h3>
                </div>
                <div className="hidden md:flex flex-col items-end gap-2 font-headline uppercase tracking-widest text-xs text-on-surface-variant transition-colors duration-500 group-hover:text-primary-fixed">
                  <span>{project.tags}</span>
                </div>
              </div>

              {/* Description - visible on hover */}
              <div className="relative z-10 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden px-4 md:px-8">
                <p className="mt-4 text-sm md:text-base text-on-surface-variant/80 font-body max-w-2xl leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Website screenshot preview image */}
              <div className={`absolute ${index % 2 === 0 ? 'right-1/4' : 'right-1/3'} top-1/2 -translate-y-1/2 ${index === 0 ? 'w-64 h-80' : index === 1 ? 'w-80 h-48' : 'w-72 h-72'} opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none scale-50 group-hover:scale-110 z-0 group-hover:shadow-[0_0_40px_rgba(200,255,0,0.2)] rounded-lg overflow-hidden`}>
                <Image
                  src={project.image}
                  alt={`${project.title} Preview`}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  unoptimized
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />                     
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-fixed/0 via-primary-fixed/5 to-primary-fixed/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

