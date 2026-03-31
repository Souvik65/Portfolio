'use client';

import { useEffect, useState, useCallback } from 'react';

const NAV_ITEMS = [
  { label: 'Home', sectionId: 'home' },
  { label: 'About', sectionId: 'about' },
  { label: 'Work', sectionId: 'work' },
  { label: 'Projects', sectionId: 'projects' },
  { label: 'Contact', sectionId: 'contact' },
];

export function NavBar() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.sectionId);

    let intersectionObserver: IntersectionObserver | null = null;
    let observedIds = new Set<string>();

    const createObserver = () => {
      // Disconnect old observer if it exists
      if (intersectionObserver) intersectionObserver.disconnect();
      observedIds.clear();

      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      // Start with whatever sections exist — don't wait for all
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

    // Initial setup — starts immediately with existing sections
    createObserver();

    // Watch for dynamically added sections (e.g. #projects)
    const mutationObserver = new MutationObserver(() => {
      // Check if any new section appeared that we aren't observing yet
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
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center">
      <div className="bg-[#1c1b1b]/60 backdrop-blur-xl rounded-full mt-6 mx-auto w-fit px-6 py-3 flex items-center gap-8 shadow-[0_20px_40px_rgba(229,226,225,0.15)]">
        <button
          onClick={() => scrollToSection('home')} 
          className="font-headline font-bold text-primary-fixed tracking-tighter text-lg bg-transparent border-none cursor-pointer
          group uppercase hover:text-primary-fixed hover:tracking-[0.3em] transition-all duration-700" > 
          Souvik 
        </button>
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
                    ? 'text-primary-fixed font-bold tracking-[0.3em]'
                    : 'text-[#e5e2e1]/70 tracking-widest hover:text-primary-fixed hover:tracking-[0.8em]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
