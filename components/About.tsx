import { Code2, Box, Film, PenTool } from 'lucide-react';

export function About() {
  return (
    <section className="py-24 px-6 md:px-12 bg-surface" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
        <div>
          <h2 className="font-headline font-bold text-md text-primary-fixed uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-primary-fixed"></span> About
          </h2>
          <p className="font-headline text-2xl leading-tight font-medium mb-12">
            I’m an MCA student focused on building practical, real-world digital solutions. I work across full-stack development, AI systems, and automation, creating projects that combine functionality with efficiency.<span className="text-primary-fixed"> From developing face recognition systems to NLP-based applications, I enjoy turning ideas into scalable products. Alongside this, I’m exploring cybersecurity and penetration testing,</span> understanding how systems work, break, and can be secured. I’m driven by curiosity, continuous learning, and a goal to build impactful, secure, and well-engineered solutions.
          </p>
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
