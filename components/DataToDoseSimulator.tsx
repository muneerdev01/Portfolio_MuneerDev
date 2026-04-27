"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockParsePrescription } from '@/lib/mockData';
import { FiCpu, FiCheckCircle, FiAlertTriangle, FiLoader } from 'react-icons/fi';

const DataToDoseSimulator = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<any>(null);

  const steps = [
    "Cleaning Data...",
    "Applying Clinical Logic...",
    "Generating Insight..."
  ];

  const handleSimulate = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setResult(null);
    
    for (let i = 0; i < steps.length; i++) {
      setStep(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    const outcome = await mockParsePrescription(input);
    setResult(outcome);
    setLoading(false);
  };

  return (
    <div className="bg-surface rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <FiCpu size={120} />
      </div>
      
      <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
        <span className="p-2 rounded-lg bg-accent-blue-dim text-accent-blue"><FiCpu /></span>
        Data-to-Dose Simulator
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Input Messy Clinical Data (e.g., Warfarin 5mg and Aspirin 81mg)</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 bg-background border border-white/10 rounded-xl p-4 text-text-primary focus:border-accent-teal outline-none transition-colors resize-none"
            placeholder="Type or paste medical text here..."
          />
        </div>

        <button
          onClick={handleSimulate}
          disabled={loading || !input.trim()}
          className="w-full py-4 bg-gradient-to-r from-accent-teal to-accent-blue text-white font-bold rounded-xl shadow-lg hover:shadow-teal transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? <FiLoader className="animate-spin" /> : "Run Pipeline"}
        </button>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="flex justify-between text-xs font-mono text-accent-teal uppercase tracking-widest">
                <span>{steps[step]}</span>
                <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                  className="h-full bg-accent-teal"
                />
              </div>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-6 rounded-xl border ${
                result.status === "Alert" ? "bg-risk/10 border-risk/30" : "bg-safe/10 border-safe/30"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${
                  result.status === "Alert" ? "bg-risk/20 text-risk" : "bg-safe/20 text-safe"
                }`}>
                  {result.status === "Alert" ? <FiAlertTriangle size={24} /> : <FiCheckCircle size={24} />}
                </div>
                <div>
                  <h4 className={`font-bold mb-1 ${result.status === "Alert" ? "text-risk" : "text-safe"}`}>
                    {result.status} Insight Detected
                  </h4>
                  <p className="text-text-primary text-sm mb-3">{result.message}</p>
                  <div className="flex gap-4 text-xs font-mono">
                    <span className="text-text-secondary">Action: <span className="text-text-primary">{result.action}</span></span>
                    <span className="text-text-secondary">Confidence: <span className="text-text-primary">{(result.confidence * 100).toFixed(0)}%</span></span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DataToDoseSimulator;
