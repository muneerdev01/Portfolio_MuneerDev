"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiBriefcase, FiTarget, FiShield } from 'react-icons/fi';

const AboutSection = () => {
  const sections = [
    {
      title: 'The "Bridge Builder"',
      icon: FiUser,
      content: [
        "I operate at the intersection of clinical excellence and digital innovation, translating complex pharmacological needs into scalable software solutions.",
        "With a foundation in Pharmacy and a drive for Software Development, I build tools that don't just function—they heal and protect.",
        "My mission is to modernize the healthcare experience by applying full-stack development to the challenges of modern medicine."
      ]
    },
    {
      title: '🛡️ The "Safety & Logic" Expert',
      icon: FiShield,
      content: [
        "A developer with a Pharmacist’s eye for detail; I approach every line of code with the same precision required for medication therapy management.",
        "Specializing in high-stakes environments where accuracy is non-negotiable—leveraging my clinical background to ensure software safety and regulatory compliance.",
        "I blend the logic of an algorithm with the empathy of a healthcare provider to create user-centric health-tech solutions."
      ]
    },
    {
      title: '📈 The "Results-Oriented" Professional',
      icon: FiBriefcase,
      content: [
        "Strategic Pharmacist turned Full-Stack Developer, dedicated to optimizing clinical workflows through automated digital systems.",
        "Leveraging deep domain expertise in Pharmacy Information Systems (PIS) to architect more intuitive Electronic Health Records (EHR).",
        "Passionate about improving patient adherence and health literacy through the integration of modern web technologies."
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {sections.map((section, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="p-8 rounded-3xl bg-surface border border-white/10 hover:border-accent-teal/30 transition-all group"
        >
          <div className="mb-6 p-4 w-fit rounded-2xl bg-background border border-white/5 group-hover:scale-110 transition-transform">
            <section.icon className="text-accent-teal" size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-4">{section.title}</h3>
          <div className="space-y-4">
            {section.content.map((text, i) => (
              <p key={i} className="text-text-secondary text-sm leading-relaxed">
                {text}
              </p>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AboutSection;
