'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import {
  Mail,
  Send,
  Copy,
  Check,
  MapPin,
  Clock,
  Briefcase,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingBadge {
  id: number;
  text: string;
  x: number;
  y: number;
  drift: number;
  size: number;
  delay: number;
  rotate: number;
}

const INQUIRY_TYPES = [
  { id: 'fulltime', label: 'Full-Time Role', subject: 'Inquiry: Full-Time Software Developer Position' },
  { id: 'freelance', label: 'Freelance / MVP', subject: 'Project Inquiry: Freelance / MVP Development' },
  { id: 'security', label: 'Security & Audit', subject: 'Inquiry: Cybersecurity & Security Assessment' },
  { id: 'ai', label: 'AI & Automation', subject: 'Inquiry: AI Systems & Workflow Automation' },
  { id: 'general', label: 'General / Hello', subject: 'Hello / Let\'s Connect' },
];

export function Contact() {
  const [selectedType, setSelectedType] = useState(INQUIRY_TYPES[0].id);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [badges, setBadges] = useState<FloatingBadge[]>([]);

  const idCounter = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const email = "souvikdn.work@gmail.com";

  const spawnBadges = useCallback((customText?: string) => {
    const defaultLabels = ['COPIED TO CLIPBOARD ✓', 'EMAIL COPIED', 'READY TO CONNECT', 'DIRECT INBOX'];
    const count = 4 + Math.floor(Math.random() * 3);
    const newBadges: FloatingBadge[] = Array.from({ length: count }, (_, i) => {
      idCounter.current += 1;
      return {
        id: idCounter.current,
        text: customText || defaultLabels[i % defaultLabels.length],
        x: 20 + Math.random() * 60,
        y: 40 + Math.random() * 30,
        drift: (Math.random() - 0.5) * 80,
        size: 0.85 + Math.random() * 0.3,
        delay: Math.random() * 0.12,
        rotate: -6 + Math.random() * 12,
      };
    });

    setBadges((prev) => [...prev, ...newBadges]);

    setTimeout(() => {
      setBadges((prev) => prev.filter((b) => !newBadges.includes(b)));
    }, 3000);
  }, []);

  const handleCopyEmail = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    spawnBadges('COPIED: ' + email);
    setTimeout(() => setCopied(false), 2400);
  }, [email, spawnBadges]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const typeObj = INQUIRY_TYPES.find((t) => t.id === selectedType);
    const subject = typeObj ? typeObj.subject : 'Portfolio Inquiry';
    const body = `Hi Souvik,\n\nName / Organization: ${senderName || 'N/A'}\nEmail: ${senderEmail || 'N/A'}\nInquiry Type: ${typeObj?.label}\n\nMessage:\n${message}\n\nBest regards,\n${senderName || 'Anonymous'}`;

    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    spawnBadges('DISPATCHING EMAIL...');

    setTimeout(() => {
      window.location.href = mailto;
      setIsSending(false);
    }, 400);
  };

  const socials = [
    { name: 'GitHub', username: '@Souvik65', url: 'https://github.com/Souvik65', icon: <FaGithub /> },
    { name: 'LinkedIn', username: 'in/kivuos', url: 'https://www.linkedin.com/in/kivuos/', icon: <FaLinkedin /> },
    { name: 'Instagram', username: '@1.m_sk', url: 'https://www.instagram.com/1.m_sk/', icon: <FaInstagram /> },
  ];

  return (
    <section
      ref={sectionRef}
      className="pt-8 sm:pt-12 md:pt-16 pb-20 sm:pb-28 md:pb-36 px-4 sm:px-6 md:px-12 bg-background relative overflow-hidden"
      id="contact"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary-fixed/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-10 -left-1/4 w-[500px] h-[500px] bg-primary-fixed/5 rounded-full blur-[180px]" />
      </div>

      {/* Floating Badges */}
      <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
        <AnimatePresence>
          {badges.map((badge) => (
            <motion.div
              key={badge.id}
              className="absolute"
              style={{ left: `${badge.x}%`, top: `${badge.y}%` }}
              initial={{ opacity: 0, y: 0, x: 0, scale: 0.4, rotate: badge.rotate }}
              animate={{
                opacity: [0, 1, 1, 0.7, 0],
                y: [0, -70, -180, -320, -450],
                x: [0, badge.drift * 0.3, badge.drift, badge.drift * 0.8, badge.drift * 1.3],
                scale: [0.4, badge.size, badge.size * 1.05, badge.size * 0.9, badge.size * 0.6],
                rotate: [-6, 4, -4, 5, 0],
              }}
              transition={{
                duration: 2.8 + badge.delay,
                delay: badge.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="bg-primary-fixed text-black px-3.5 py-1.5 rounded-full font-headline font-bold text-[10px] sm:text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(200,255,0,0.4)] border border-black/20 select-none flex items-center gap-1.5">
                <Sparkles size={12} className="shrink-0" />
                {badge.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-20">
          <div className="font-headline font-bold text-sm md:text-base text-primary-fixed uppercase tracking-[0.4em] mb-4 flex items-center gap-4">
            <span className="w-8 md:w-12 h-[1px] bg-primary-fixed" />
            <span>Get In Touch</span>
          </div>

          <h2 className="font-headline font-black text-5xl sm:text-7xl md:text-9xl leading-[0.85] tracking-tight uppercase">
            LET&apos;S WORK <br />
            <span className="text-primary-fixed">TOGETHER</span>
          </h2>

          <p className="mt-6 text-on-surface-variant text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            Have a project in mind, an open software engineering role, or a technical inquiry?
            Feel free to send a message or copy my email directly.
          </p>
        </div>

        {/* 2-Column Grid (shadcn/ui Card style layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Social Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 sm:p-8 hover:border-primary-fixed/40 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed/5 rounded-full blur-2xl group-hover:bg-primary-fixed/10 transition-all pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed/10 border border-primary-fixed/30 flex items-center justify-center text-primary-fixed">
                  <Mail size={20} />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-headline font-bold bg-primary-fixed/10 text-primary-fixed border border-primary-fixed/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-pulse" />
                  Fast Response
                </span>
              </div>

              <div className="text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-1">
                Direct Email
              </div>

              <a
                href={`mailto:${email}`}
                className="font-headline font-bold text-lg sm:text-2xl text-[#e5e2e1] hover:text-primary-fixed transition-colors block break-all mb-4"
              >
                {email}
              </a>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 py-3 px-4 bg-primary-fixed text-black font-headline font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(200,255,0,0.25)] cursor-pointer"
                >
                  {copied ? <Check size={14} className="stroke-[3]" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy Email Address'}</span>
                </button>
              </div>
            </div>

            {/* Availability & Location Info Card */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-primary-fixed shrink-0">
                  <Briefcase size={18} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                    Availability
                  </div>
                  <div className="text-sm sm:text-base font-headline font-bold text-[#e5e2e1] mt-0.5">
                    Open to Full-Time Roles &amp; Freelance
                  </div>
                  <p className="text-xs text-on-surface-variant/80 mt-1">
                    Ready for immediate joining and remote/hybrid collaborations.
                  </p>
                </div>
              </div>

              <div className="w-full h-[1px] bg-outline-variant/15" />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-primary-fixed shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                    Location
                  </div>
                  <div className="text-sm sm:text-base font-headline font-bold text-[#e5e2e1] mt-0.5">
                    Kolkata, India
                  </div>
                  <p className="text-xs text-on-surface-variant/80 mt-1">
                    Open to remote opportunities and worldwide relocation.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Networks Card */}
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6">
              <div className="text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-4 flex items-center justify-between">
                <span>Connect on Socials</span>
                <span className="text-[10px] text-primary-fixed">Verified</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-black/40 border border-outline-variant/20 hover:border-primary-fixed hover:bg-primary-fixed/10 transition-all flex flex-col justify-between min-h-[75px] group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-primary-fixed text-lg group-hover:scale-110 transition-transform">
                        {social.icon}
                      </span>
                      <ArrowUpRight size={14} className="text-white/40 group-hover:text-primary-fixed group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <div className="font-headline font-bold text-xs text-[#e5e2e1] group-hover:text-primary-fixed transition-colors mt-2">
                      {social.name}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: shadcn-style Interactive Message Form Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl relative">
              {/* Form Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-on-surface-variant mb-3">
                  <MessageSquare size={13} className="text-primary-fixed" />
                  <span>Send a direct transmission</span>
                </div>
                <h3 className="font-headline font-black text-2xl sm:text-3xl text-[#e5e2e1] uppercase tracking-tight">
                  Drop a Message
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                  Select your inquiry type and I&apos;ll get back to you promptly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Inquiry Type Chips (shadcn Tabs / Badge Style) */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-3">
                    Inquiry Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {INQUIRY_TYPES.map((type) => {
                      const isSelected = selectedType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setSelectedType(type.id)}
                          className={cn(
                            'px-4 py-2 rounded-xl text-xs font-headline font-medium transition-all duration-200 cursor-pointer border flex items-center gap-1.5',
                            isSelected
                              ? 'bg-primary-fixed text-black border-primary-fixed font-bold shadow-[0_0_15px_rgba(200,255,0,0.3)] scale-[1.02]'
                              : 'bg-black/40 text-on-surface-variant border-outline-variant/30 hover:border-white/40 hover:text-[#e5e2e1]'
                          )}
                        >
                          {isSelected && <Check size={13} className="stroke-[3]" />}
                          <span>{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Input Row: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                      Your Name / Org
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Alex Miller"
                      className="w-full bg-black/40 border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-[#e5e2e1] placeholder:text-white/20 focus:outline-none focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full bg-black/40 border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-[#e5e2e1] placeholder:text-white/20 focus:outline-none focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed transition-all"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                      Your Message
                    </label>
                    <span className="text-[11px] text-on-surface-variant/60">
                      {message.length} characters
                    </span>
                  </div>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your role, project scope, timeline, or whatever you have in mind..."
                    className="w-full bg-black/40 border border-outline-variant/30 rounded-xl p-4 text-sm text-[#e5e2e1] placeholder:text-white/20 focus:outline-none focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed transition-all resize-y leading-relaxed"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-on-surface-variant flex items-center gap-2 order-2 sm:order-1">
                    <ShieldCheck size={16} className="text-primary-fixed" />
                    <span>Dispatches straight to private inbox</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full sm:w-auto px-8 py-3.5 bg-primary-fixed text-black font-headline font-bold text-xs uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(200,255,0,0.35)] cursor-pointer order-1 sm:order-2"
                  >
                    <Send size={14} className={isSending ? 'animate-spin' : ''} />
                    <span>{isSending ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
