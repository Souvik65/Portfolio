import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram, FaDribbble } from "react-icons/fa";

export function Contact() {
  const socials = [
    { name: "Instagram", url: "https://instagram.com/yourusername", icon: <FaInstagram /> },
    { name: "LinkedIn", url: "https://linkedin.com/in/yourusername", icon: <FaLinkedin /> },
    { name: "Dribbble", url: "https://dribbble.com/yourusername", icon: <FaDribbble /> },
    { name: "GitHub", url: "https://github.com/yourusername", icon: <FaGithub /> },
  ];
  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-[#0a0a0a] relative overflow-hidden"
      id="contact"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary-fixed/5 rounded-full blur-[200px]"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary-fixed/5 rounded-full blur-[200px]"></div>
      </div>
      <div className="relative z-10 space-y-20">
        <h2 className="font-headline font-black text-6xl md:text-[8vw] uppercase leading-none tracking-tighter">
          Let&apos;s work <br />{" "}
          <span className="text-primary-fixed">Together</span>
        </h2>
        <a
          className="block font-headline font-bold text-2xl md:text-5xl uppercase tracking-tighter hover:text-primary-fixed transition-colors"
          href="mailto:kivuos.work@gmail.com"
        >
          kivuos.work@gmail.com
        </a>
        <div className="flex gap-8 justify-center pt-12">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-headline text-xs uppercase tracking-widest text-[#e5e2e1] hover:text-primary-fixed hover:tracking-[0.5em] transition-all duration-700"
            >
              {social.name}{" "}
              <span className="inline-block translate-y-px transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
