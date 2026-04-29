// ─── Quantum Command — Pakistan Universities ─────────────────────────────────
export interface University {
  rank: number;
  name: string;
  city: string;
  sector: 'Public' | 'Private';
  gravityRes: number;   // Research weight (0–100)
  orbStability: number; // Institutional consistency (0–100)
  thrust: number;       // Growth/Output score (0–100)
  trend: 'up' | 'down' | 'stable';
}

export const universities: University[] = [
  { rank: 1,  name: 'NUST',  city: 'Islamabad', sector: 'Public',  gravityRes: 94, orbStability: 91, thrust: 88, trend: 'up'     },
  { rank: 2,  name: 'LUMS',  city: 'Lahore',    sector: 'Private', gravityRes: 92, orbStability: 95, thrust: 90, trend: 'stable' },
  { rank: 3,  name: 'QAU',   city: 'Islamabad', sector: 'Public',  gravityRes: 89, orbStability: 85, thrust: 78, trend: 'up'     },
  { rank: 4,  name: 'UET',   city: 'Lahore',    sector: 'Public',  gravityRes: 86, orbStability: 83, thrust: 80, trend: 'stable' },
  { rank: 5,  name: 'COMSATS', city: 'Islamabad', sector: 'Public', gravityRes: 82, orbStability: 80, thrust: 84, trend: 'up'   },
  { rank: 6,  name: 'IBA',   city: 'Karachi',   sector: 'Public',  gravityRes: 80, orbStability: 88, thrust: 76, trend: 'stable' },
  { rank: 7,  name: 'GCU',   city: 'Lahore',    sector: 'Public',  gravityRes: 78, orbStability: 82, thrust: 71, trend: 'down'   },
  { rank: 8,  name: 'GIKI',  city: 'Topi',      sector: 'Public',  gravityRes: 76, orbStability: 79, thrust: 74, trend: 'up'     },
  { rank: 9,  name: 'NED',   city: 'Karachi',   sector: 'Public',  gravityRes: 74, orbStability: 76, thrust: 70, trend: 'stable' },
  { rank: 10, name: 'Agha Khan Univ.', city: 'Karachi', sector: 'Private', gravityRes: 88, orbStability: 92, thrust: 82, trend: 'up' },
];

// ─── RenalMetrics CKD Data ───────────────────────────────────────────────────
export interface CKDDataPoint {
  week: string;
  creatinine: number;
  gfr: number;
  status: 'normal' | 'moderate' | 'at-risk';
}

export const ckdData: CKDDataPoint[] = [
  { week: 'Wk 1',  creatinine: 1.1, gfr: 72, status: 'normal'   },
  { week: 'Wk 2',  creatinine: 1.2, gfr: 70, status: 'normal'   },
  { week: 'Wk 3',  creatinine: 1.4, gfr: 65, status: 'normal'   },
  { week: 'Wk 4',  creatinine: 1.6, gfr: 60, status: 'moderate' },
  { week: 'Wk 5',  creatinine: 1.5, gfr: 62, status: 'moderate' },
  { week: 'Wk 6',  creatinine: 1.8, gfr: 55, status: 'moderate' },
  { week: 'Wk 7',  creatinine: 2.1, gfr: 48, status: 'at-risk'  },
  { week: 'Wk 8',  creatinine: 2.4, gfr: 42, status: 'at-risk'  },
  { week: 'Wk 9',  creatinine: 2.2, gfr: 44, status: 'at-risk'  },
  { week: 'Wk 10', creatinine: 2.0, gfr: 48, status: 'moderate' },
  { week: 'Wk 11', creatinine: 1.7, gfr: 55, status: 'moderate' },
  { week: 'Wk 12', creatinine: 1.4, gfr: 63, status: 'normal'   },
];

// CKD Dashboard summary stats (from real dashboard)
export const ckdSummary = {
  totalPatients:  2013,
  prevalence:     27.1,
  avgGFR:         72.8,
  avgCreatinine:  2.01,
  highCritical:   555,
};

export const whatsappNumber = '923151304012'; 
