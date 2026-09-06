'use client';

import { MagneticButton } from '@/components/MagneticButton';

export function Capabilities() {
  const categories = [
    {
      num: '01',
      title: 'Programming Languages',
      items: ['Python', 'JavaScript', 'TypeScript', 'C++', 'Java'],
    },
    {
      num: '02',
      title: 'Frameworks & Tools',
      items: ['Django', 'Git', 'GitHub', 'MongoDB', 'MySQL', 'N8N Automation'],
    },
    {
      num: '03',
      title: 'Web Development',
      items: ['Next.js', 'React', 'Tailwind CSS', 'HTML5', 'CSS3'],
    },
    {
      num: '04',
      title: 'AI/ML & Data',
      items: ['NLP (T5)', 'Machine Learning Basics', 'OpenCV', 'Pandas', 'Data Processing'],
    },
    {
      num: '05',
      title: 'Cybersecurity',
      items: ['Network Security Fundamentals', 'CTF\'s', 'Linux', 'Nmap', 'Wireshark'],
    },
    {
      num: '06',
      title: 'Soft skills',
      items: ['Problem Solving', 'Teamwork', 'Communication', 'Debugging', 'Adaptability', 'Leadership'],
    },
  ];

  return (
    <section className="pt-16 md:pt-28 pb-8 md:pb-12 px-4 sm:px-6 md:px-12 bg-background" id="arsenal">
      <h2 className="font-headline font-black text-6xl sm:text-7xl md:text-9xl leading-[0.8] mb-8 md:mb-16 tracking-tight" aria-label="Tech ARSENAL">
        <span className="text-1xl sm:text-3xl md:text-5xl">Te</span>
        <span className="text-1xl sm:text-3xl md:text-5xl">ch</span><br />
        <span className="text-6xl sm:text-7xl md:text-9xl">AR</span>
        <span className="text-stroke text-6xl sm:text-7xl md:text-9xl">SE</span>
        <span className="text-primary-fixed text-6xl sm:text-7xl md:text-9xl">NAL</span>
      </h2>
      <div className="max-w-7xl mx-auto">
        {/* Mobile: full-width stacked cards | Desktop: 3-col grid */}
        <div className="-mx-4 sm:mx-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 sm:gap-px sm:bg-outline-variant/10 sm:border sm:border-outline-variant/10">
          {categories.map((cat) => (
            <div
              key={cat.num}
              className="bg-background hover:bg-surface-container/50 transition-colors duration-500 group
                         border-b border-outline-variant/10 sm:border-b-0 sm:border-0
                         px-4 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10 flex flex-col justify-between"
            >
              <div>
                {/* Number + Title row */}
                <div className="flex items-start gap-3 mb-4 sm:mb-5 md:mb-6">
                  <span className="text-primary-fixed font-headline font-bold text-sm md:text-base shrink-0 mt-0.5">
                    {cat.num}.
                  </span>
                  <h3 className="font-headline font-bold text-base sm:text-xl md:text-2xl uppercase tracking-wide text-[#e5e2e1] group-hover:text-primary-fixed transition-colors duration-500 leading-tight">
                    {cat.title}
                  </h3>
                </div>

                {/* Magnetic Interactive Skill Chips */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {cat.items.map((item) => (
                    <MagneticButton
                      key={item}
                      strength={0.25}
                      radius={90}
                      springConfig={{ stiffness: 240, damping: 18, mass: 0.12 }}
                      className="inline-block"
                    >
                      <div
                        className="group/chip relative px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium
                                   bg-surface-container-low/90 text-on-surface-variant/90 border border-outline-variant/20
                                   hover:border-primary-fixed hover:text-primary-fixed hover:bg-surface-container-highest
                                   hover:shadow-[0_0_15px_rgba(200,255,0,0.25)]
                                   transition-all duration-300 cursor-default select-none flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/50 group-hover/chip:bg-primary-fixed group-hover/chip:shadow-[0_0_6px_rgba(200,255,0,0.8)] transition-all duration-300" />
                        <span>{item}</span>
                      </div>
                    </MagneticButton>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

