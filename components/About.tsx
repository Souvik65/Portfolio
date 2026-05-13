import { Code2, Box, Film, PenTool } from 'lucide-react';

export function About() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-surface" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
        <div>
          <h2 className="font-headline font-bold text-md text-primary-fixed uppercase tracking-[0.4em] mb-6 md:mb-10 flex items-center gap-4">
            <span className="w-8 md:w-12 h-[1px] bg-primary-fixed"></span> About
          </h2>
          <p className="font-headline text-base sm:text-lg md:text-2xl leading-relaxed sm:leading-tight font-medium mb-6 md:mb-12">
            MCA graduate specializing in software development, AI systems, and cybersecurity. I&apos;ve built production-grade tools — from a Telegram-based cloud storage system and workflow automation platform, to a real-time DDoS detection engine backed by published ML research.<span className="text-primary-fixed"> I write code that ships, scales, and holds up under scrutiny. Currently seeking full-time Software Developer roles in India.</span>
          </p>
        </div>
        <div className="space-y-8 md:space-y-12">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
            <div className="p-4 sm:p-5 md:p-8 bg-surface-container-low border-b-2 border-transparent hover:border-primary-fixed transition-all group cursor-crosshair rounded-lg sm:rounded-none hover:scale-110 hover:shadow-[0_5px_30px_rgba(229,226,225,0.09)]">
              <Code2 className="text-primary-fixed mb-2 md:mb-4" size={24} />
              <div className="font-headline font-bold uppercase tracking-tighter text-base sm:text-lg md:text-xl">Front-End</div>
              <p className="text-[11px] sm:text-xs md:text-sm text-on-surface-variant mt-1.5 md:opacity-0 md:group-hover:opacity-100 transition-opacity leading-snug">Proficient component architect.</p>
            </div>
            <div className="p-4 sm:p-5 md:p-8 bg-surface-container-low border-b-2 border-transparent hover:border-primary-fixed transition-all group cursor-crosshair rounded-lg sm:rounded-none hover:scale-110 hover:shadow-[0_5px_30px_rgba(229,226,225,0.09)]">
              <Box className="text-primary-fixed mb-2 md:mb-4" size={24} />
              <div className="font-headline font-bold uppercase tracking-tighter text-base sm:text-lg md:text-xl">Cybersecurity</div>
              <p className="text-[11px] sm:text-xs md:text-sm text-on-surface-variant mt-1.5 md:opacity-0 md:group-hover:opacity-100 transition-opacity leading-snug">Penetration testing.</p>
            </div>
            <div className="p-4 sm:p-5 md:p-8 bg-surface-container-low border-b-2 border-transparent hover:border-primary-fixed transition-all group cursor-crosshair rounded-lg sm:rounded-none hover:scale-110 hover:shadow-[0_5px_30px_rgba(229,226,225,0.09)]">
              <Film className="text-primary-fixed mb-2 md:mb-4" size={24} />
              <div className="font-headline font-bold uppercase tracking-tighter text-base sm:text-lg md:text-xl">AI & ML</div>
              <p className="text-[11px] sm:text-xs md:text-sm text-on-surface-variant mt-1.5 md:opacity-0 md:group-hover:opacity-100 transition-opacity leading-snug">Machine learning.</p>
            </div>
            <div className="p-4 sm:p-5 md:p-8 bg-surface-container-low border-b-2 border-transparent hover:border-primary-fixed transition-all group cursor-crosshair rounded-lg sm:rounded-none hover:scale-110 hover:shadow-[0_5px_30px_rgba(229,226,225,0.09)]">
              <PenTool className="text-primary-fixed mb-2 md:mb-4" size={24} />
              <div className="font-headline font-bold uppercase tracking-tighter text-base sm:text-lg md:text-xl">Figma</div>
              <p className="text-[11px] sm:text-xs md:text-sm text-on-surface-variant mt-1.5 md:opacity-0 md:group-hover:opacity-100 transition-opacity leading-snug">Visual systems &amp; prototyping.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
