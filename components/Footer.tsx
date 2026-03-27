import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#131313] min-h-screen flex flex-col justify-end p-8 md:p-16">
      <div className="mb-auto grid grid-cols-2 md:grid-cols-4 gap-12 border-b border-outline-variant/10 pb-24">
        <div className="col-span-2">
          <div className="text-[#e5e2e1] font-headline font-bold text-3xl mb-4">CD/UI</div>
          <p className="text-on-surface-variant max-w-xs uppercase text-xs tracking-widest leading-loose">
            Independent Creative Developer &amp; UI Engineer working worldwide with forward-thinking brands.
          </p>
        </div>
        <div>
          <h5 className="text-primary-fixed font-headline font-bold uppercase text-xs tracking-widest mb-6">Navigation</h5>
          <ul className="space-y-4 font-headline uppercase text-xs tracking-widest">
            <li><Link className="text-[#e5e2e1] hover:text-primary-fixed transition-all duration-500" href="#">Home</Link></li>
            <li><Link className="text-[#e5e2e1] hover:text-primary-fixed transition-all duration-500" href="#work">Work</Link></li>
            <li><Link className="text-[#e5e2e1] hover:text-primary-fixed transition-all duration-500" href="#about">About</Link></li>
            <li><Link className="text-[#e5e2e1] hover:text-primary-fixed transition-all duration-500" href="#contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-primary-fixed font-headline font-bold uppercase text-xs tracking-widest mb-6">Legal</h5>
          <ul className="space-y-4 font-headline uppercase text-xs tracking-widest">
            <li><Link className="text-[#e5e2e1] hover:text-primary-fixed transition-all duration-500" href="#">Privacy Policy</Link></li>
            <li><Link className="text-[#e5e2e1] hover:text-primary-fixed transition-all duration-500" href="#">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-24 pointer-events-none select-none">
        <h2 className="font-headline text-[clamp(4rem,15vw,12rem)] leading-[0.8] font-black uppercase text-[#e5e2e1] opacity-10">
          MONOLITH
        </h2>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mt-12 pt-8 border-t border-outline-variant/10">
        <div className="text-[#e5e2e1]/40 font-headline uppercase text-[10px] tracking-[0.3em]">
          © 2024 NEON MONOLITH — ALL RIGHTS RESERVED
        </div>
        <div className="flex gap-8">
          {['Instagram', 'LinkedIn', 'Dribbble', 'GitHub'].map((social) => (
            <Link key={social} href="#" className="font-headline text-xs uppercase tracking-widest text-[#e5e2e1] hover:text-primary-fixed hover:tracking-[0.2em] transition-all duration-700">
              {social}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
