'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, Cpu, FlaskConical, Stethoscope } from 'lucide-react';

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Vercel',
    href: 'https://vercel.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 22.525H0l12-21.05 12 21.05z" />
      </svg>
    ),
  },
];

const pills = [
  { icon: <Cpu className="w-3.5 h-3.5" />, label: 'Automation Engineering' },
  { icon: <FlaskConical className="w-3.5 h-3.5" />, label: '19 Yrs Pharma Expertise' },
  { icon: <Stethoscope className="w-3.5 h-3.5" />, label: 'Medical Data Systems' },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-12 bg-grid overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #00d4aa, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Two-column layout on desktop */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* LEFT — text content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="font-mono font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight text-text-primary"
            >
              <br />
              <span className="gradient-text-teal">Ghulam Muneer Uddin</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-3 flex-wrap justify-center lg:justify-start"
            >
              <p className="text-text-secondary font-mono text-lg sm:text-xl tracking-wide leading-relaxed max-w-2xl text-left opacity-90">
  Bridging 19 years of clinical expertise with precision engineering. I build production-ready medical dashboards, AI-powered analytics, and automated health platforms that turn complex data into actionable clinical insights.
</p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="text-text-secondary text-base sm:text-lg max-w-lg leading-relaxed"
            >
              {/* Bridging 19 years of pharmaceutical expertise with precision software engineering —
              building medical dashboards, AI-powered analytics, and data-driven health platforms. */}
            </motion.p>

            {/* Expertise pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              {pills.map((p, i) => (
                <div key={i} className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-surface-2 bg-surface/60 text-xs font-medium text-text-secondary">
                  <span className="text-accent-teal">{p.icon}</span>
                  {p.label}
                </div>
              ))}
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.05 }}
              className="flex items-center gap-3"
            >
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i} href={link.href} target="_blank" rel="noopener noreferrer"
                  aria-label={link.label}
                  whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-surface-2 bg-surface/60 text-text-secondary hover:text-accent-teal hover:border-accent-teal/30 hover:bg-accent-teal/5 transition-colors duration-200"
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <motion.button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="px-7 py-3 rounded-xl bg-surface-2/50 border border-white/10 text-text-primary font-semibold text-sm hover:bg-surface-2 transition-all duration-200"
              >
                View Projects
              </motion.button>
              <motion.button
                onClick={() => document.querySelector('#connect')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="px-7 py-3 rounded-xl border border-accent-teal/25 text-accent-teal font-semibold text-sm hover:bg-accent-teal/5 transition-all duration-200"
              >
                Get in Touch
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT — profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            className="relative flex-shrink-0"
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-4 rounded-full opacity-30 blur-2xl"
              style={{ background: 'radial-gradient(circle, #00d4aa, #6366f1, transparent 70%)' }} />

            {/* Hexagonal-ish border */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-3xl p-1"
              style={{ background: 'linear-gradient(135deg, #00d4aa44, #6366f144, #00d4aa22)' }}>
              <div className="w-full h-full rounded-[22px] overflow-hidden border border-accent-teal/10">
                <Image
                  src="/profile.png"
                  alt="Muneer — Senior Developer & Health-Tech Architect"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* Floating stat badge — bottom left */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2 border border-accent-teal/20"
            >
              <p className="text-xs font-mono text-text-secondary"> Founder of </p>
              <p className="text-sm font-bold text-accent-teal">MuneerDataAI</p>
            </motion.div>

            {/* Floating stat badge — top right */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="absolute -top-4 -right-4 glass rounded-xl px-3 py-2 border border-accent-blue/20"
            >
              <p className="text-xs font-mono text-text-secondary">Domain</p>
              <p className="text-sm font-bold" style={{ color: '#6366f1' }}>Pharma-Tech</p>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-text-secondary hover:text-accent-teal transition-colors"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
