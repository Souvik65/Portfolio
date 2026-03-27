import Link from 'next/link';

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center">
      <div className="bg-[#1c1b1b]/60 backdrop-blur-xl rounded-full mt-6 mx-auto w-fit px-6 py-3 flex items-center gap-8 shadow-[0_20px_40px_rgba(229,226,225,0.15)]">
        <span className="font-headline font-bold text-primary-fixed tracking-tighter text-lg">CD/UI</span>
        <div className="hidden md:flex items-center gap-6">
          <Link href="#" className="font-headline tracking-tight text-sm uppercase text-primary-fixed font-bold hover:text-primary-fixed transition-colors duration-300 scale-95 active:scale-90">
            Home
          </Link>
          <Link href="#work" className="font-headline tracking-tight text-sm uppercase text-on-surface/70 hover:text-primary-fixed transition-colors duration-300 scale-95 active:scale-90">
            Work
          </Link>
          <Link href="#about" className="font-headline tracking-tight text-sm uppercase text-on-surface/70 hover:text-primary-fixed transition-colors duration-300 scale-95 active:scale-90">
            About
          </Link>
          <Link href="#contact" className="font-headline tracking-tight text-sm uppercase text-on-surface/70 hover:text-primary-fixed transition-colors duration-300 scale-95 active:scale-90">
            Contact
          </Link>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full text-[10px] font-bold uppercase tracking-widest text-primary-fixed border border-primary-fixed/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-fixed opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-fixed"></span>
          </span>
          Currently Available
        </div>
      </div>
    </nav>
  );
}
