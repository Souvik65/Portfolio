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

    const setupObserver = () => {
      // Disconnect previous if exists
      if (intersectionObserver) intersectionObserver.disconnect();

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

      sections.forEach((section) => intersectionObserver!.observe(section));
    };

    // Initial setup
    setupObserver();

    // Watch for dynamically added sections (e.g. #projects)
    const mutationObserver = new MutationObserver(() => {
      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        setupObserver();
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (intersectionObserver) intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'projects') {
      // Dispatch event to reveal hidden Projects section
      window.dispatchEvent(new CustomEvent('show-projects'));
      // Fallback: attempt scroll after a short delay if Projects handles its own scroll
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (attempts < 10) {
          requestAnimationFrame(() => tryScroll(attempts + 1));
        }
      };
      requestAnimationFrame(() => tryScroll());
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center">
      <div className="bg-[#1c1b1b]/60 backdrop-blur-xl rounded-full mt-6 mx-auto w-fit px-6 py-3 flex items-center gap-8 shadow-[0_20px_40px_rgba(229,226,225,0.15)]">
        <button
          onClick={() => scrollToSection('home')} 
          className="font-headline font-bold text-primary-fixed tracking-tighter text-lg bg-transparent border-none cursor-pointer" > 
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
                className={`font-headline tracking-tight text-sm uppercase transition-colors duration-300 scale-95 active:scale-90 cursor-pointer bg-transparent border-none ${
                  isActive
                    ? 'text-primary-fixed font-bold'
                    : 'text-on-surface/70 hover:text-primary-fixed'
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
