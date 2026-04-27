"use client";

import React from 'react';
import { motion } from 'framer-motion';

const TechStackCard = () => {
  const codeString = `class HealthTechStrategist:
    def __init__(self):
        self.domain = "Pharmacology"
        self.experience = 19  # Years
        self.stack = ["Python", "FastAPI", "MongoDB", "EDA"]

    def bridge_gap(self, raw_medical_data):
        # Transforming messy logs into patient safety insights
        insights = self.apply_clinical_logic(raw_medical_data)
        return insights`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="p-1 rounded-2xl bg-gradient-to-br from-accent-teal to-accent-blue shadow-teal-lg"
    >
      <div className="bg-[#0d1117] rounded-xl p-6 font-mono text-sm sm:text-base overflow-hidden">
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <pre className="text-text-primary overflow-x-auto custom-scrollbar">
          <code>
            {codeString.split('\n').map((line, i) => (
              <div key={i} className="whitespace-pre">
                <span className="text-text-secondary mr-4 select-none w-4 inline-block">{i + 1}</span>
                <span className={
                  line.includes('class') || line.includes('def') || line.includes('self') ? 'text-[#ff7b72]' :
                  line.includes('"') ? 'text-[#a5d6ff]' :
                  line.includes('#') ? 'text-[#8b949e]' :
                  'text-[#d2a8ff]'
                }>
                  {line}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </motion.div>
  );
};

export default TechStackCard;
