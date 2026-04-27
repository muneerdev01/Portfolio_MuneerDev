export const drugInteractionData = [
  {
    drugA: "Metformin",
    drugB: "Contrast Dye",
    severity: "High",
    effect: "Lactic Acidosis Risk",
    recommendation: "Hold Metformin 48h post-procedure",
  },
  {
    drugA: "Warfarin",
    drugB: "Amiodarone",
    severity: "Critical",
    effect: "Increased Bleeding Risk",
    recommendation: "Reduce Warfarin dose by 30-50%",
  },
  {
    drugA: "Lisinopril",
    drugB: "Spironolactone",
    severity: "Moderate",
    effect: "Hyperkalemia Risk",
    recommendation: "Monitor potassium levels closely",
  },
  {
    drugA: "Simvastatin",
    drugB: "Clarithromycin",
    severity: "High",
    effect: "Myopathy/Rhabdomyolysis",
    recommendation: "Avoid combination; use temporary statin hold",
  }
];

export const mockParsePrescription = async (text: string) => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const lowerText = text.toLowerCase();
  if (lowerText.includes("warfarin") && lowerText.includes("aspirin")) {
    return {
      status: "Alert",
      message: "Potential major interaction detected: Warfarin + Aspirin increases bleeding risk.",
      action: "Clinical Review Required",
      confidence: 0.98
    };
  }
  
  return {
    status: "Safe",
    message: "No major clinical contraindications found in the input text.",
    action: "Proceed to validation",
    confidence: 0.85
  };
};

export const kpiMetrics = [
  { label: "Safety Score", value: "99.2%", description: "Drug interaction accuracy", trend: "+2.1%" },
  { label: "Efficiency Gain", value: "45%", description: "OPD wait time reduction", trend: "+12%" },
  { label: "Inventory Health", value: "94%", description: "Stock-out prevention rate", trend: "+5.4%" },
  { label: "Data Compliance", value: "100%", description: "HIPAA/Privacy readiness", trend: "Stable" },
];
