'use client';

import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-outline-variant/15 py-6 sm:py-8 px-4 sm:px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-on-surface-variant/70">
        {/* Copyright & Identity */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed shrink-0" />
          <span>
            © {new Date().getFullYear()}{' '}
            <strong className="text-[#e5e2e1] font-headline uppercase font-bold tracking-wider">
              Souvik Debnath
            </strong>{' '}
            — Software Developer &amp; UI Engineer
          </span>
        </div>

        {/* Back to Top Action */}
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="hidden md:inline-block text-[11px] text-white/40">
            KOLKATA, IN
          </span>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/20 text-[#e5e2e1] hover:text-primary-fixed hover:border-primary-fixed/40 transition-all text-[11px] uppercase tracking-wider cursor-pointer active:scale-95"
            aria-label="Scroll back to top of the page"
          >
            <span>Back to top</span>
            <ArrowUp
              size={12}
              className="text-primary-fixed transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
