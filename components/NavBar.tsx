'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const NAV_ITEMS = [
  { label: 'Home', sectionId: 'home' },
  { label: 'About', sectionId: 'about' },
  { label: 'Work', sectionId: 'work' },
  { label: 'Arsenal', sectionId: 'arsenal' },
  { label: 'Projects', sectionId: 'projects' },
  { label: 'Contact', sectionId: 'contact' },
];

export function NavBar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.sectionId);

    let intersectionObserver: IntersectionObserver | null = null;
    let observedIds = new Set<string>();

    const createObserver = () => {
      if (intersectionObserver) intersectionObserver.disconnect();
      observedIds.clear();

      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      if (sections.length === 0) return;

      intersectionObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          if (visible.length > 0) {
            const newSection = visible[0].target.id;
            setActiveSection(newSection);

            if (window.location.hash) {
              history.replaceState(null, '', window.location.pathname);
            }
          }
        },
        {
          rootMargin: '-20% 0px -60% 0px',
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
        }
      );

      sections.forEach((section) => {
        intersectionObserver!.observe(section);
        observedIds.add(section.id);
      });
    };

    createObserver();

    const mutationObserver = new MutationObserver(() => {
      const hasNew = sectionIds.some(
        (id) => !observedIds.has(id) && document.getElementById(id)
      );
      if (hasNew) {
        createObserver();
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (intersectionObserver) intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    setMobileMenuOpen(false);

    const scroll = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return true;
      }
      return false;
    };

    if (sectionId === 'projects') {
      window.dispatchEvent(new CustomEvent('show-projects'));

      let attempts = 0;
      const tryScroll = () => {
        if (scroll()) return;
        if (attempts < 10) {
          attempts++;
          requestAnimationFrame(tryScroll);
        }
      };
      requestAnimationFrame(tryScroll);
      return;
    }

    scroll();
  }, []);

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-40 flex justify-center items-center">
      <div className="bg-[#1c1b1b]/60 backdrop-blur-xl rounded-full mt-4 md:mt-6 mx-auto w-fit px-4 md:px-6 py-2.5 md:py-3 flex items-center gap-5 md:gap-10 shadow-[0_20px_40px_rgba(229,226,225,0.15)]">
          <button
            onClick={() => scrollToSection('home')}
            className="font-headline font-bold text-primary-fixed tracking-tighter text-base md:text-lg bg-transparent border-none cursor-pointer group pr-2"
          >
            SOUVIK DEBNATH
          </button>
          {/* Vertical Divider */}
          <div className="hidden md:block w-[1px] h-5 bg-outline-variant/90" />

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`font-headline text-xs uppercase cursor-pointer bg-transparent border-none transition-all duration-700 ease-out active:scale-90 ${
                    isActive
                      ? 'text-primary-fixed font-bold text-9xl tracking-[0.35em] scale-110 backdrop-blur-md bg-white/10 px-4 py-2 rounded-2xl shadow-2xl transition-all duration-100 ease-out'
                      : 'text-[#e5e2e1] tracking-widest hover:text-primary-fixed hover:tracking-[0.8em] hover:scale-105 transition-all duration-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 bg-transparent border-none cursor-pointer gap-[5px] group"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <motion.span
              className="block w-5 h-[2px] bg-primary-fixed origin-center"
              animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-5 h-[2px] bg-primary-fixed origin-center"
              animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-[2px] bg-primary-fixed origin-center"
              animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu content */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-[#1c1b1b]/95 backdrop-blur-2xl rounded-t-3xl pt-8 pb-12 px-8"
            >
              {/* Drawer handle */}
              <div className="flex justify-center mb-8">
                <div className="w-10 h-1 bg-white/20 rounded-full" />
              </div>

              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = activeSection === item.sectionId;
                  return (
                    <motion.button
                      key={item.sectionId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index, duration: 0.3 }}
                      onClick={() => scrollToSection(item.sectionId)}
                      className={`font-headline text-left text-lg uppercase tracking-widest bg-transparent border-none cursor-pointer py-4 px-4 rounded-xl transition-all duration-300 active:scale-95 ${
                        isActive
                          ? 'text-primary-fixed font-bold bg-primary-fixed/10'
                          : 'text-[#e5e2e1]/70'
                      }`}
                    >
                      <span className="text-primary-fixed/50 text-xs mr-3 font-mono">
                        0{index + 1}
                      </span>
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
