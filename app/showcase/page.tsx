"use client";

import React from 'react';
import { motion } from 'framer-motion';
import InsightGrid from '@/components/InsightGrid';
import DataToDoseSimulator from '@/components/DataToDoseSimulator';
import TechStackCard from '@/components/TechStackCard';
import KPIDashboard from '@/components/KPIDashboard';
import AboutSection from '@/components/AboutSection';
import { FiArrowLeft, FiHeart } from 'react-icons/fi';
import Link from 'next/link';

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-background text-text-primary selection:bg-accent-teal/30 selection:text-accent-teal">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-teal/10 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-blue/10 blur-[120px] rounded-full animate-pulse-slow" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-20">
        {/* Navigation Header */}
        <nav className="flex justify-between items-center mb-16">
          <Link 
            href="/"
            className="flex items-center gap-2 text-text-secondary hover:text-accent-teal transition-colors group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm">Back to Home</span>
          </Link>
          <div className="text-xs font-mono tracking-widest text-text-secondary uppercase">
            V 2.0 // Showcase Module
          </div>
        </nav>

        {/* Hero Section */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-accent-teal-dim border border-accent-teal/30 text-accent-teal text-xs font-bold tracking-widest uppercase mb-6">
              Pharmacy Precision meets Developer Innovation
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-r from-white via-text-primary to-text-secondary bg-clip-text text-transparent">
              Coding for a <br />
              <span className="text-accent-teal">Healthier Tomorrow.</span>
            </h1>
            <p className="text-lg lg:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Experience the live "Proof of Work" where domain expertise in pharmacology 
              converges with modern full-stack architecture.
            </p>
          </motion.div>
        </section>

        {/* Key Metrics Dashboard */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Live Performance Metrics</h2>
              <p className="text-text-secondary">Quantifiable impact of integrated health-tech solutions.</p>
            </div>
          </div>
          <KPIDashboard />
        </section>

        {/* Anatomy of an Insight */}
        <section className="mb-24">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-2">Anatomy of an Insight</h2>
            <p className="text-text-secondary">Interactive modules showcasing automated clinical logic.</p>
          </div>
          <InsightGrid />
        </section>

        {/* Interactive Simulator & Tech Stack */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">
          <div className="space-y-6">
            <div className="mb-4">
              <h2 className="text-3xl font-bold mb-2">The Simulator</h2>
              <p className="text-text-secondary">Experience the real-time data-to-dose pipeline.</p>
            </div>
            <DataToDoseSimulator />
          </div>
          <div className="space-y-6">
            <div className="mb-4">
              <h2 className="text-3xl font-bold mb-2">Strategic Stack</h2>
              <p className="text-text-secondary">Clean, modular code built for safety and scale.</p>
            </div>
            <TechStackCard />
          </div>
        </section>

        {/* About Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-2">Professional Philosophy</h2>
            <p className="text-text-secondary">Bridging the gap between medicine and technology.</p>
          </div>
          <AboutSection />
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t border-white/10 flex flex-col items-center gap-4 text-text-secondary">
          <div className="flex items-center gap-2 text-sm">
            <span>Built with</span>
            <FiHeart className="text-risk fill-risk" />
            <span>by Muneer Dev</span>
          </div>
          <p className="text-xs font-mono opacity-50 tracking-widest uppercase">
            © 2026 Pharmacist Programmer • All Rights Reserved
          </p>
        </footer>
      </div>
    </main>
  );
}
