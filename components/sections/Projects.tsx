'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Activity, AlertTriangle, ExternalLink, Github,
  MapPin, Database, Microscope, HeartPulse, TrendingUp, TrendingDown, Search,
  Users, Percent, Zap,
} from 'lucide-react';
import { ckdData, ckdSummary, universities } from '@/lib/data';
import { getStatusColor, getStatusLabel, cn } from '@/lib/utils';

// ─── Custom Tooltip ──────────────────────────────────────────────────────────
const CKDTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl p-3 border border-accent-teal/20 text-xs font-mono shadow-teal">
      <p className="text-accent-teal font-semibold mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{p.value}{p.name === 'GFR' ? ' mL/min' : ' mg/dL'}</span>
        </p>
      ))}
    </div>
  );
};

// ─── Mini metric bar ─────────────────────────────────────────────────────────
function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs font-mono">
        <span className="text-text-secondary">{label}</span>
        <span className="text-accent-teal">{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full bg-accent-teal"
        />
      </div>
    </div>
  );
}

// ─── Quantum Command Card ────────────────────────────────────────────────────
function QuantumCommandCard() {
  const [query, setQuery] = useState('');
  const filtered = universities.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bento-card flex flex-col gap-5 h-full">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="section-label">01.</span>
          <span className="badge bg-accent-teal/10 border border-accent-teal/20 text-accent-teal">
            <MapPin className="w-3 h-3" /> University Rankings • Pakistan Sector
          </span>
        </div>
        <h2 className="font-mono font-bold text-2xl sm:text-3xl text-text-primary">Proprietary University Ranking Engine</h2>
        <p className="text-text-secondary text-sm leading-relaxed max-w-md">
          Geospatial intelligence platform that maps Pakistan's academic landscape via interactive
          dark-themed maps and a proprietary "Quantum" metric system — <em className="text-accent-teal not-italic">Gravity Res.</em>,{' '}
          <em className="text-accent-teal not-italic">Orb. Stability</em>, and{' '}
          <em className="text-accent-teal not-italic">Thrust</em> — turning institutional data into discoverable insight.
        </p>
      </div>

      {/* Screenshot */}
      <div className="relative rounded-xl overflow-hidden border border-surface-2 aspect-video w-full group cursor-pointer">
        <Image
          src="/quantum-command.png"
          alt="Quantum Command — University Rankings Pakistan"
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-background/60 border border-accent-teal/20 text-accent-teal backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse" />
          Interactive Map View
        </div>
      </div>

      {/* Live search demo */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search Quantum Coordinates (Name or City)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-surface-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent-teal/40 transition-all font-mono"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-surface-2">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-surface-2 bg-surface/50">
                <th className="px-3 py-2 text-left text-text-secondary">#</th>
                <th className="px-3 py-2 text-left text-text-secondary">Institution</th>
                <th className="px-3 py-2 text-left text-text-secondary">City</th>
                <th className="px-3 py-2 text-left text-text-secondary">Gravity Res.</th>
                <th className="px-3 py-2 text-left text-text-secondary">Thrust</th>
                <th className="px-3 py-2 text-left text-text-secondary hidden sm:table-cell">Δ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 5).map(u => (
                <tr key={u.rank} className="border-b border-surface-2/40 hover:bg-surface/40 transition-colors">
                  <td className="px-3 py-2 text-accent-teal font-bold">{u.rank}</td>
                  <td className="px-3 py-2 text-text-primary font-semibold">{u.name}</td>
                  <td className="px-3 py-2 text-text-secondary">{u.city}</td>
                  <td className="px-3 py-2">
                    <span className="text-safe">{u.gravityRes}</span>
                  </td>
                  <td className="px-3 py-2 text-accent-teal">{u.thrust}</td>
                  <td className="px-3 py-2 hidden sm:table-cell">
                    {u.trend === 'up'
                      ? <TrendingUp className="w-3.5 h-3.5 text-safe" />
                      : u.trend === 'down'
                        ? <TrendingDown className="w-3.5 h-3.5 text-risk" />
                        : <span className="text-text-secondary">—</span>}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-4 text-center text-text-secondary">
                    No coordinates found for "{query}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Orb. Stability bars for top 3 */}
        <div className="grid grid-cols-3 gap-3 pt-1">
          {universities.slice(0, 3).map(u => (
            <div key={u.rank} className="glass rounded-xl p-3 border border-surface-2 flex flex-col gap-2">
              <span className="text-xs font-mono font-semibold text-text-primary">{u.name}</span>
              <MetricBar label="Orb. Stability" value={u.orbStability} />
            </div>
          ))}
        </div>
      </div>

      {/* Tech & links */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto pt-3 border-t border-surface-2">
        <div className="flex flex-wrap gap-2">
          {['Next.js', 'Leaflet.js', 'TypeScript', 'Tailwind CSS', 'CSV Engine'].map(t => (
            <span key={t} className="tech-chip">{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-2 text-xs text-text-secondary hover:text-text-primary hover:border-accent-teal/30 transition-all">
            <Github className="w-3.5 h-3.5" /> Code
          </a>
          <a href="https://calendly.com/muneer-dev01/30min" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-teal/10 border border-accent-teal/20 text-xs text-accent-teal hover:bg-accent-teal/20 transition-all">
            <ExternalLink className="w-3.5 h-3.5" /> Book Meeting
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── RenalMetrics Card ───────────────────────────────────────────────────────
const vitals = [
  { label: 'Creatinine', value: '1.4', unit: 'mg/dL', ref: '0.7–1.3', status: 'moderate' as const, icon: <Microscope className="w-4 h-4" /> },
  { label: 'GFR', value: '63', unit: 'mL/min', ref: '>60', status: 'normal' as const, icon: <Activity className="w-4 h-4" /> },
  { label: 'BUN', value: '18', unit: 'mg/dL', ref: '7–20', status: 'normal' as const, icon: <Database className="w-4 h-4" /> },
  { label: 'Blood Pres.', value: '128/82', unit: 'mmHg', ref: '<130/80', status: 'moderate' as const, icon: <HeartPulse className="w-4 h-4" /> },
];

function RenalMetricsCard() {
  return (
    <div className="bento-card flex flex-col gap-5 h-full"
      style={{ borderColor: 'rgba(99,102,241,0.15)' }}>
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="section-label" style={{ color: '#6366f1' }}>02.</span>
          <span className="badge bg-accent-blue/10 border border-accent-blue/20 text-accent-blue">
            <HeartPulse className="w-3 h-3" /> Clinical Analytics Dashboard
          </span>
        </div>
        <h2 className="font-mono font-bold text-2xl sm:text-3xl text-text-primary">RenalMetrics</h2>
        <p className="text-text-secondary text-sm leading-relaxed max-w-md">
          Professional-grade CKD monitoring tool for clinicians — biomarker correlation heatmaps,
          GFR/Creatinine scatter plots, risk stratification (Low→Critical), and a
          full patient explorer with CSV export for clinical portability.
        </p>
      </div>

      {/* Executive summary tiles */}
      <div className="grid grid-cols-5 gap-2">
        {[
          { label: 'Patients', value: ckdSummary.totalPatients.toLocaleString(), icon: <Users className="w-3.5 h-3.5" />, color: '#6366f1' },
          { label: 'Prevalence', value: `${ckdSummary.prevalence}%`, icon: <Percent className="w-3.5 h-3.5" />, color: '#ef4444' },
          { label: 'Avg GFR', value: ckdSummary.avgGFR, icon: <Activity className="w-3.5 h-3.5" />, color: '#22c55e' },
          { label: 'Avg Creat.', value: ckdSummary.avgCreatinine, icon: <Microscope className="w-3.5 h-3.5" />, color: '#a855f7' },
          { label: 'High Risk', value: ckdSummary.highCritical, icon: <Zap className="w-3.5 h-3.5" />, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="flex flex-col items-center gap-1 px-2 py-3 rounded-xl border border-surface-2 bg-surface/40 text-center">
            <span style={{ color: s.color }}>{s.icon}</span>
            <span className="font-mono font-bold text-sm text-text-primary leading-none">{s.value}</span>
            <span className="text-[10px] text-text-secondary font-mono leading-none">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Dashboard screenshot */}
      <div className="relative rounded-xl overflow-hidden border border-surface-2 aspect-video w-full group cursor-pointer">
        <Image
          src="/ckd-dashboard.jpg"
          alt="RenalMetrics — CKD Clinical Analytics Dashboard"
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-background/60 border border-accent-blue/20 backdrop-blur-sm" style={{ color: '#6366f1' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" style={{ background: '#6366f1' }} />
          Biomarker Heatmap + Scatter Plot
        </div>
      </div>

      {/* Live vitals grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {vitals.map(v => {
          const color = getStatusColor(v.status);
          return (
            <div key={v.label} className={cn('rounded-xl p-3 border flex flex-col gap-1.5', color.bg, color.border)}>
              <div className={cn('flex items-center gap-1.5 text-xs font-mono font-medium', color.text)}>
                {v.icon} {v.label}
              </div>
              <p className="font-mono font-bold text-lg text-text-primary leading-none">
                {v.value}<span className="text-xs text-text-secondary ml-1">{v.unit}</span>
              </p>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-text-secondary font-mono">ref: {v.ref}</span>
                <span className={cn('text-[10px] font-mono font-semibold', color.text)}>{getStatusLabel(v.status)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recharts 12-week trend */}
      <div className="rounded-xl border border-surface-2 bg-surface/30 p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-mono text-text-secondary">12-Week Biomarker Trend (GFR ↔ Creatinine)</p>
          <div className="flex items-center gap-3 text-[10px] font-mono text-text-secondary">
            <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-accent-teal inline-block rounded" /> Creatinine</span>
            <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 inline-block rounded" style={{ background: '#6366f1' }} /> GFR</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={ckdData} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,212,170,0.07)" />
            <XAxis dataKey="week" tick={{ fill: '#8b949e', fontSize: 9, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#8b949e', fontSize: 9, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CKDTooltip />} />
            <Line type="monotone" dataKey="creatinine" name="Creatinine" stroke="#00d4aa" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#00d4aa' }} />
            <Line type="monotone" dataKey="gfr" name="GFR" stroke="#6366f1" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#6366f1' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Status alert */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-moderate/5 border border-moderate/20">
        <AlertTriangle className="w-4 h-4 text-moderate flex-shrink-0 mt-0.5" />
        <p className="text-xs font-mono text-text-secondary leading-relaxed">
          <span className="text-moderate font-semibold">Monitor — </span>
          Creatinine/GFR correlation: <span className="text-accent-teal">−0.96</span> (strong inverse).
          555 patients classified High/Critical Risk. Trending toward stability over last 3 weeks.
        </p>
      </div>

      {/* Tech & links */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto pt-3 border-t border-surface-2">
        <div className="flex flex-wrap gap-2">
          {['Next.js', 'Recharts', 'Lucide-React', 'TypeScript', 'Tailwind CSS'].map(t => (
            <span key={t} className="tech-chip" style={{ color: '#6366f1', background: 'rgba(99,102,241,0.08)', borderColor: 'rgba(99,102,241,0.15)' }}>{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-2 text-xs text-text-secondary hover:text-text-primary hover:border-accent-blue/30 transition-all">
            <Github className="w-3.5 h-3.5" /> Code
          </a>
          <a href="https://calendly.com/muneer-dev01/30min" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-accent-blue/20 hover:bg-accent-blue/10 transition-all"
            style={{ color: '#6366f1', background: 'rgba(99,102,241,0.08)' }}>
            <ExternalLink className="w-3.5 h-3.5" /> Book Meeting
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Section wrapper ─────────────────────────────────────────────────────────
export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" ref={ref} className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-2"></p>
          <h2 className="font-mono font-bold text-3xl sm:text-4xl text-text-primary mb-3">
            Featured <span className="gradient-text-teal">Work</span>
          </h2>
          <p className="text-text-secondary max-w-2xl text-sm leading-relaxed">
            Production-grade applications at the intersection of pharmaceutical science and modern engineering —
            turning complex datasets into high-performance, interactive visual experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}>
            <QuantumCommandCard />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
            <RenalMetricsCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
