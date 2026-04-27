"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { kpiMetrics } from '@/lib/mockData';
import { FiActivity, FiClock, FiShield, FiDatabase } from 'react-icons/fi';

const iconMap: { [key: string]: any } = {
  "Safety Score": FiShield,
  "Efficiency Gain": FiClock,
  "Inventory Health": FiActivity,
  "Data Compliance": FiDatabase,
};

const KPIDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiMetrics.map((kpi, index) => {
        const Icon = iconMap[kpi.label] || FiActivity;
        return (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="p-6 rounded-2xl bg-surface border border-white/10 backdrop-blur-md shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-accent-teal-dim text-accent-teal">
                <Icon size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                kpi.trend.startsWith('+') ? 'bg-safe/20 text-safe' : 'bg-accent-blue-dim text-accent-blue'
              }`}>
                {kpi.trend}
              </span>
            </div>
            <h3 className="text-text-secondary text-sm font-medium mb-1">{kpi.label}</h3>
            <div className="text-2xl font-bold text-text-primary mb-2">{kpi.value}</div>
            <p className="text-xs text-text-secondary">{kpi.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default KPIDashboard;
