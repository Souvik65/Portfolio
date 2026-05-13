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
    <section className="py-16 md:py-32 px-4 sm:px-6 md:px-12 bg-background" id="arsenal">
      <h2 className="font-headline font-black text-6xl sm:text-7xl md:text-9xl leading-[0.8] mb-8 md:mb-16 tracking-tight" aria-label="Tech ARSENAL">
        <span className="text-1xl sm:text-3xl md:text-5xl">Te</span>
        <span className="text-1xl sm:text-3xl md:text-5xl">ch</span><br />
        <span className="text-6xl sm:text-7xl md:text-9xl">AR</span>
        <span className="text-stroke text-6xl sm:text-7xl md:text-9xl">SE</span>
        <span className="text-primary-fixed text-6xl sm:text-7xl md:text-9xl">NAL</span>      </h2>
      <div className="max-w-7xl mx-auto ">
        {/* Mobile: full-width stacked cards | Desktop: 3-col grid */}
        <div className="-mx-4 sm:mx-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 sm:gap-px sm:bg-outline-variant/10 sm:border sm:border-outline-variant/10">
          {categories.map((cat) => (
            <div
              key={cat.num}
              className="bg-background hover:bg-surface-container transition-colors duration-500 group
                         border-b border-outline-variant/10 sm:border-b-0 sm:border-0
                         px-4 py-5 sm:px-8 sm:py-8 md:px-12 md:py-12 "
            >
              {/* Number + Title row */}
              <div className="flex items-start gap-3 mb-3 sm:mb-4 md:mb-6">
                <span className="text-primary-fixed font-headline font-bold text-sm md:text-base shrink-0 mt-0.5">
                  {cat.num}.
                </span>
                <h3 className="font-headline font-bold text-base sm:text-xl md:text-2xl uppercase tracking-wide text-[#e5e2e1] group-hover:text-primary-fixed transition-colors duration-500 leading-tight">
                  {cat.title}
                </h3>
              </div>
              {/* Items as tags/chips on mobile, list on desktop */}
              <div className="flex flex-wrap gap-2 md:block md:space-y-0">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="inline-block text-on-surface-variant text-xs md:text-sm
                               bg-surface-container-low md:bg-transparent
                               px-3 py-1.5 md:px-0 md:py-0
                               rounded-full md:rounded-none
                               border border-outline-variant/20 md:border-0
                               md:block md:leading-relaxed
                               transition-colors duration-300
                               hover:text-primary-fixed hover:border-primary-fixed/40 md:hover:border-0"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
