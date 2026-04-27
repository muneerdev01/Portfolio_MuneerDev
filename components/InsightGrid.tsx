"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { drugInteractionData } from '@/lib/mockData';
import { FiActivity, FiZap, FiPlusCircle, FiBarChart2, FiX } from 'react-icons/fi';

// Dynamically import Plotly with SSR disabled
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const InsightGrid = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const icons = [
    { id: 1, icon: FiActivity, label: "DUR Analysis", color: "text-accent-teal" },
    { id: 2, icon: FiZap, label: "Real-time DDI", color: "text-accent-blue" },
    { id: 3, icon: FiPlusCircle, label: "Clinical Audit", color: "text-safe" },
    { id: 4, icon: FiBarChart2, label: "Safety Trends", color: "text-moderate" },
  ];

  const getChartData = () => {
    return [
      {
        x: drugInteractionData.map(d => d.drugA),
        y: [10, 25, 15, 30], // Mock severity scores
        type: 'bar',
        marker: { color: '#00d4aa' },
        name: 'Severity Score'
      }
    ];
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {icons.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
              className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 ${
                selectedId === item.id 
                ? "bg-accent-teal-dim border-accent-teal shadow-teal" 
                : "bg-surface border-white/10 hover:border-white/20"
              }`}
            >
              <div className={`p-3 rounded-full bg-background ${item.color}`}>
                <Icon size={24} />
              </div>
              <span className="text-sm font-semibold text-text-primary">{item.label}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selectedId && (
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-surface rounded-3xl p-8 border border-white/10 shadow-2xl relative">
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 text-text-secondary hover:text-text-primary"
              >
                <FiX size={20} />
              </button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                    {icons.find(i => i.id === selectedId)?.label} Report
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent-teal-dim text-accent-teal uppercase tracking-tighter">Live Demo</span>
                  </h3>
                  <div className="space-y-4">
                    {drugInteractionData.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-background border border-white/5">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-bold text-text-primary">{item.drugA} + {item.drugB}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                            item.severity === 'Critical' ? 'bg-risk/20 text-risk' : 'bg-moderate/20 text-moderate'
                          }`}>{item.severity}</span>
                        </div>
                        <p className="text-xs text-text-secondary">{item.effect}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="h-[300px] w-full rounded-2xl bg-[#0a0e14] border border-white/5 flex items-center justify-center p-4">
                  <Plot
                    data={getChartData() as any}
                    layout={{
                      width: undefined,
                      height: 250,
                      autosize: true,
                      paper_bgcolor: 'rgba(0,0,0,0)',
                      plot_bgcolor: 'rgba(0,0,0,0)',
                      margin: { t: 10, b: 40, l: 40, r: 10 },
                      font: { color: '#8b949e', size: 10 },
                      xaxis: { gridcolor: '#1a2230', zeroline: false },
                      yaxis: { gridcolor: '#1a2230', zeroline: false },
                      showlegend: false,
                    }}
                    config={{ displayModeBar: false, responsive: true }}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InsightGrid;
