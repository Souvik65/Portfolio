import { Code2, Box, Film, PenTool } from 'lucide-react';

export function About() {
  return (
    <section className="py-32 px-6 md:px-12 bg-surface" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
        <div>
          <h2 className="font-headline font-bold text-sm text-primary-fixed uppercase tracking-[0.4em] mb-12 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-primary-fixed"></span> About
          </h2>
          <p className="font-headline text-4xl md:text-5xl leading-tight font-medium mb-12">
            I build digital products that feel more like <span className="text-primary-fixed">physical architecture</span> than web pages.
          </p>
          <div className="flex gap-16">
            <div>
              <div className="text-6xl font-headline font-bold mb-2">08+</div>
              <div className="text-on-surface-variant text-xs uppercase tracking-widest font-bold">Years of Experience</div>
            </div>
            <div>
              <div className="text-6xl font-headline font-bold mb-2">42</div>
              <div className="text-on-surface-variant text-xs uppercase tracking-widest font-bold">Projects Launched</div>
            </div>
          </div>
        </div>
        <div className="space-y-12">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-8 bg-surface-container-low border-b-2 border-transparent hover:border-primary-fixed transition-all group cursor-crosshair">
              <Code2 className="text-primary-fixed mb-4" size={32} />
              <div className="font-headline font-bold uppercase tracking-tighter text-xl">React</div>
              <p className="text-sm text-on-surface-variant mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Expert component architect.</p>
            </div>
            <div className="p-8 bg-surface-container-low border-b-2 border-transparent hover:border-primary-fixed transition-all group cursor-crosshair">
              <Box className="text-primary-fixed mb-4" size={32} />
              <div className="font-headline font-bold uppercase tracking-tighter text-xl">Three.js</div>
              <p className="text-sm text-on-surface-variant mt-2 opacity-0 group-hover:opacity-100 transition-opacity">WebGL immersive storytelling.</p>
            </div>
            <div className="p-8 bg-surface-container-low border-b-2 border-transparent hover:border-primary-fixed transition-all group cursor-crosshair">
              <Film className="text-primary-fixed mb-4" size={32} />
              <div className="font-headline font-bold uppercase tracking-tighter text-xl">GSAP</div>
              <p className="text-sm text-on-surface-variant mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Cinematic motion design.</p>
            </div>
            <div className="p-8 bg-surface-container-low border-b-2 border-transparent hover:border-primary-fixed transition-all group cursor-crosshair">
              <PenTool className="text-primary-fixed mb-4" size={32} />
              <div className="font-headline font-bold uppercase tracking-tighter text-xl">Figma</div>
              <p className="text-sm text-on-surface-variant mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Visual systems &amp; prototyping.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
