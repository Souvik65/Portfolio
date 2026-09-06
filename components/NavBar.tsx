'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MagneticButton } from '@/components/MagneticButton';

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
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.sectionId);

    let intersectionObserver: IntersectionObserver | null = null;
    const observedIds = new Set<string>();

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
    setActiveSection(sectionId);

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
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center pointer-events-none">
        <div className="bg-[#1c1b1b]/80 backdrop-blur-2xl border border-white/10 rounded-full mt-4 md:mt-6 mx-auto w-fit px-4 md:px-6 py-2 md:py-2.5 flex items-center gap-4 md:gap-7 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(200,255,0,0.05)] pointer-events-auto">
          {/* Brand Logo with Magnetic Effect */}
          <MagneticButton strength={0.3} radius={120}>
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="font-headline font-black text-primary-fixed tracking-tight text-sm sm:text-base md:text-lg bg-transparent border-none cursor-pointer group pr-1 flex items-center gap-1.5 transition-transform active:scale-95 select-none"
              aria-label="Scroll to home"
            >
              <span className="drop-shadow-[0_0_12px_rgba(200,255,0,0.4)]">SOUVIK DEBNATH</span>
            </button>
          </MagneticButton>

          {/* Vertical Divider */}
          <div className="hidden md:block w-[1px] h-4 bg-white/20" />

          {/* Desktop Motion Navigation Menu with Spring-Morphing Active Pill & Magnetic Pull */}
          <div
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => setHoveredSection(null)}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.sectionId;
              const isHovered = hoveredSection === item.sectionId;

              return (
                <MagneticButton key={item.sectionId} strength={0.25} radius={80}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.sectionId)}
                    onMouseEnter={() => setHoveredSection(item.sectionId)}
                    aria-current={isActive ? 'true' : undefined}
                    className="relative px-3.5 py-1.5 rounded-full font-headline text-xs uppercase cursor-pointer bg-transparent border-none transition-colors duration-200 outline-none select-none flex items-center justify-center"
                  >
                    {/* Hover Morphing Highlight */}
                    {isHovered && !isActive && (
                      <motion.div
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 bg-white/[0.08] rounded-full"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Active Layout-Morphing Spring Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 bg-primary-fixed/15 border border-primary-fixed/40 rounded-full shadow-[0_0_15px_rgba(200,255,0,0.2)]"
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 32,
                        }}
                      />
                    )}

                    {/* Nav Item Label */}
                    <span
                      className={`relative z-10 transition-all duration-300 ${
                        isActive
                          ? 'text-primary-fixed font-bold tracking-[0.2em]'
                          : 'text-[#e5e2e1]/80 hover:text-white tracking-widest'
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                </MagneticButton>
              );
            })}
          </div>

          {/* Mobile hamburger button with Magnetic Effect */}
          <MagneticButton strength={0.3} radius={90} className="md:hidden">
            <button
              type="button"
              className="flex flex-col justify-center items-center w-9 h-9 bg-transparent border-none cursor-pointer gap-[5px] group"
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
          </MagneticButton>
        </div>
      </nav>

      {/* Mobile full-screen spring drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 md:hidden"
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
              className="absolute bottom-0 left-0 right-0 bg-[#1c1b1b]/95 backdrop-blur-2xl border-t border-white/10 rounded-t-3xl pt-6 pb-12 px-6"
            >
              {/* Drawer handle */}
              <div className="flex justify-center mb-6">
                <div className="w-10 h-1 bg-white/20 rounded-full" />
              </div>

              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = activeSection === item.sectionId;
                  return (
                    <motion.button
                      key={item.sectionId}
                      type="button"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * index, duration: 0.25 }}
                      onClick={() => scrollToSection(item.sectionId)}
                      className={`font-headline text-left text-base uppercase tracking-widest bg-transparent border-none cursor-pointer py-3.5 px-4 rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-between ${
                        isActive
                          ? 'text-primary-fixed font-bold bg-primary-fixed/10 border border-primary-fixed/20'
                          : 'text-[#e5e2e1]/70 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-primary-fixed/50 text-xs font-mono">
                          0{index + 1}
                        </span>
                        {item.label}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse" />
                      )}
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
