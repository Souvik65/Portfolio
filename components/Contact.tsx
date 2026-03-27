import Link from 'next/link';

export function Contact() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-[#0a0a0a] relative overflow-hidden" id="contact">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary-fixed/5 rounded-full blur-[200px]"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary-fixed/5 rounded-full blur-[200px]"></div>
      </div>
      <div className="relative z-10 space-y-8">
        <h2 className="font-headline font-black text-6xl md:text-[8vw] uppercase leading-none tracking-tighter">
          Let&apos;s work <br /> <span className="text-primary-fixed">Together</span>
        </h2>
        <a className="block font-headline font-bold text-2xl md:text-5xl uppercase tracking-tighter hover:text-primary-fixed transition-colors" href="mailto:HELLO@STITCH.DEV">
          HELLO@STITCH.DEV
        </a>
        <div className="flex gap-8 justify-center pt-12">
          {['Instagram', 'LinkedIn', 'Dribbble', 'GitHub'].map((social) => (
            <Link key={social} href="#" className="font-headline uppercase text-xs tracking-widest hover:text-primary-fixed transition-all group">
              {social} <span className="inline-block translate-y-px transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
