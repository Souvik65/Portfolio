import { CustomCursor } from '@/components/CustomCursor';
import { Preloader } from '@/components/Preloader';
import { NavBar } from '@/components/NavBar';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { About } from '@/components/About';
import { SelectedWork } from '@/components/SelectedWork';
import { Projects } from '@/components/Projects';
import { Capabilities } from '@/components/Capabilities';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <CustomCursor />
      <Preloader />
      <NavBar />
      <Hero />
      <Marquee />
      <About />
      <SelectedWork />
      <Projects />
      <Capabilities />
      <Contact />
      <Footer />
    </main>
  );
}

