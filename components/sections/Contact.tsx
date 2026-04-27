'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MessageCircle, Github, Linkedin, ExternalLink, Twitter, MapPin, Clock } from 'lucide-react';

const socialLinks = [
  {
    label: 'GitHub',
    desc: 'Source code & repos',
    href: 'https://github.com/muneerdev01/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    color: '#e8eaed',
    hoverBg: 'hover:bg-white/5 hover:border-white/20',
  },
  {
    label: 'LinkedIn',
    desc: 'Professional network',
    href: 'https://www.linkedin.com/in/muneer-dev-57871b3b4/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: '#0A66C2',
    hoverBg: 'hover:bg-[#0A66C2]/5 hover:border-[#0A66C2]/30',
  },
  {
    label: 'X (Twitter)',
    desc: 'Thoughts & updates',
    href: 'https://x.com/DevMuneerAi/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: '#e8eaed',
    hoverBg: 'hover:bg-white/5 hover:border-white/20',
  },
  {
    label: 'Vercel',
    desc: 'Live deployments',
    href: 'https://vercel.com/muneerdev01-5476s-projects/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 22.525H0l12-21.05 12 21.05z" />
      </svg>
    ),
    color: '#e8eaed',
    hoverBg: 'hover:bg-white/5 hover:border-white/20',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const whatsappNumber = "923151304012";
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="connect" ref={ref} className="py-24 px-6 relative bg-grid overflow-hidden">
      {/* Ambient glow - pointer-events-none is CRITICAL here */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 rounded-full opacity-10 blur-[80px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #00d4aa, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="font-mono font-bold text-3xl sm:text-4xl text-text-primary mb-4">
             <span className="gradient-text-teal">CONNECT</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-sm leading-relaxed">
            Ready to build something precise? Whether it's a clinical dashboard, data platform, 
            or a health-tech product — let's connect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT — quick info card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bento-card flex flex-col gap-6 relative" 
          >
            <div className="flex flex-col gap-3">
              <h3 className="font-mono font-semibold text-lg text-text-primary">Developer Profile</h3>
              <p className="text-text-secondary text-sm leading-relaxed italic">
                &ldquo;Muneer is a Data-Focused Developer specializing in turning complex datasets into high-performance, 
                interactive visual experiences. Expert in bridging the gap between raw data and actionable intelligence.&rdquo;
              </p>
            </div>

            {/* Meta info */}
            <div className="flex flex-col gap-3 text-sm font-mono">
              <div className="flex items-center gap-3 text-text-secondary">
                <MapPin className="w-4 h-4 text-accent-teal flex-shrink-0" />
                <span>Pakistan</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <Clock className="w-4 h-4 text-accent-teal flex-shrink-0" />
                <span>PKT (UTC +5) — Available Mon–Sat</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <span className="pulse-dot flex-shrink-0 bg-green-500" />
                <span className="text-safe">Available for Strategic Collaborations</span>
              </div>
            </div>

            {/* ACTION BUTTONS - Isolated in their own container */}
            <div className="flex flex-col gap-3 mt-auto relative z-20">
                <motion.a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-semibold text-sm text-white transition-all cursor-pointer shadow-lg active:shadow-none"
                  style={{
                    background: 'linear-gradient(135deg, #25d366, #128c7e)',
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Message on WhatsApp
                </motion.a>

                <a
                  href="mailto:muneer.dev01@gmail.com"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-surface-2 text-sm text-text-secondary hover:text-text-primary hover:border-accent-teal/30 hover:bg-accent-teal/5 transition-all font-mono"
                >
                  <Mail className="w-4 h-4" />
                  muneer.dev01@gmail.com
                </a>
            </div>
          </motion.div>

          {/* RIGHT — social platform grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            <h3 className="font-mono font-semibold text-lg text-text-primary">Professional Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border border-surface-2 bg-surface/40 transition-all duration-200 group relative z-20 ${link.hoverBg}`}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl border border-surface-2 flex items-center justify-center bg-surface/60 transition-all duration-200 group-hover:border-current"
                    style={{ color: link.color }}>
                    {link.icon}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono font-semibold text-sm text-text-primary group-hover:text-white transition-colors">{link.label}</span>
                    <span className="text-xs text-text-secondary truncate">{link.desc}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-text-secondary ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>

            {/* Domain expertise tags */}
            <div className="mt-4 glass rounded-2xl p-5 border border-surface-2 flex flex-col gap-3 relative z-10">
              <p className="text-xs font-mono text-text-secondary uppercase tracking-widest">Domain Expertise</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Medical Dashboards', 'Geospatial Data', 'Clinical Analytics',
                  'Healthcare APIs', 'Data Visualization', 'Pharmaceutical Tech',
                  'Next.js', 'TypeScript', 'Recharts', 'Python'
                ].map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-mono border border-surface-2 bg-surface/40 text-text-secondary hover:text-accent-teal hover:border-accent-teal/25 transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 pt-8 border-t border-surface-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-secondary"
        >
          <p>
            <span className="text-accent-teal">A product of MuneerDataAI Healthcare & Intelligence </span>
          </p>
          <p>© {new Date().getFullYear()} Muneer Dev. All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  );
}