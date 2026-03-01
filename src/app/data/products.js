const categories = [
  { id: "surgical", name: "Surgical Instruments", icon: "Scissors" },
  { id: "diagnostic", name: "Diagnostic Equipment", icon: "Stethoscope" },
  { id: "ppe", name: "Personal Protective Equipment", icon: "ShieldCheck" },
  { id: "lab", name: "Laboratory Supplies", icon: "TestTube" },
  { id: "disposable", name: "Disposable Medical Supplies", icon: "Syringe" },
  { id: "rehabilitation", name: "Rehabilitation Equipment", icon: "Heart" }
];
const products = [
  {
    id: "1",
    name: "Digital Stethoscope",
    code: "DS-3000",
    category: "diagnostic",
    description: "High-precision digital stethoscope with Bluetooth connectivity for real-time diagnostics. Features advanced noise cancellation and recording capabilities.",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=800&q=80",
    featured: true
  },
  {
    id: "2",
    name: "Surgical Scissors Set",
    code: "SS-450",
    category: "surgical",
    description: "Premium stainless steel surgical scissors set including Mayo, Metzenbaum, and iris scissors. Autoclavable and corrosion-resistant.",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80",
    featured: true
  },
  {
    id: "3",
    name: "N95 Respirator Masks",
    code: "N95-100",
    category: "ppe",
    description: "NIOSH-approved N95 respirator masks. Box of 100 units. High filtration efficiency and comfortable fit for extended wear.",
    image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=800&q=80",
    featured: true
  },
  {
    id: "4",
    name: "Blood Pressure Monitor",
    code: "BPM-2500",
    category: "diagnostic",
    description: "Automatic digital blood pressure monitor with large LCD display. Includes memory storage for 120 readings and irregular heartbeat detection.",
    image: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=800&q=80",
    featured: true
  },
  {
    id: "5",
    name: "Disposable Gloves (Latex)",
    code: "GLV-500",
    category: "ppe",
    description: "Powder-free latex examination gloves. Box of 500 units. Ambidextrous design with textured fingertips for enhanced grip.",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&q=80",
    featured: true
  },
  {
    id: "6",
    name: "Infrared Thermometer",
    code: "THERM-IR200",
    category: "diagnostic",
    description: "Non-contact infrared thermometer with instant reading. Measures body, surface, and room temperature with high accuracy.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    featured: true
  },
  {
    id: "7",
    name: "Wheelchair - Standard",
    code: "WC-STD-01",
    category: "rehabilitation",
    description: "Standard manual wheelchair with padded armrests and footrests. Foldable design for easy transport and storage.",
    image: "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800&q=80",
    featured: true
  },
  {
    id: "8",
    name: "Pulse Oximeter",
    code: "OX-1000",
    category: "diagnostic",
    description: "Fingertip pulse oximeter with LED display showing SpO2 and pulse rate. Portable and battery-powered with auto-shutoff.",
    image: "https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=800&q=80",
    featured: true
  },
  {
    id: "9",
    name: "Surgical Face Masks",
    code: "SFM-50",
    category: "ppe",
    description: "Type IIR surgical face masks with high bacterial filtration efficiency. Fluid-resistant and latex-free. Box of 50 units.",
    image: "https://images.unsplash.com/photo-1585559604959-3a335dd6b1f0?w=800&q=80"
  },
  {
    id: "10",
    name: "Disposable Syringes",
    code: "SYR-3ML-100",
    category: "disposable",
    description: "3ml disposable syringes with needle. Sterile, single-use, and latex-free. Box of 100 units with clear barrel for easy measurement.",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80"
  },
  {
    id: "11",
    name: "ECG Machine - 12 Lead",
    code: "ECG-12L-PRO",
    category: "diagnostic",
    description: "Professional 12-lead ECG machine with digital display and thermal printer. Includes interpretation software and data storage.",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80"
  },
  {
    id: "12",
    name: "IV Stand (Adjustable)",
    code: "IVS-ADJ-01",
    category: "disposable",
    description: "Height-adjustable IV stand with 4-hook top. Chrome-plated steel with stable base and smooth-rolling casters.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80"
  },
  {
    id: "13",
    name: "Laboratory Centrifuge",
    code: "CENT-LAB-3000",
    category: "lab",
    description: "High-speed laboratory centrifuge with digital controls. 12-tube capacity with safety lid lock and automatic imbalance detection.",
    image: "https://images.unsplash.com/photo-1582719366249-e8a2a50ce598?w=800&q=80"
  },
  {
    id: "14",
    name: "Microscope - Binocular",
    code: "MICRO-BIN-400",
    category: "lab",
    description: "Professional binocular microscope with LED illumination. 40x to 1000x magnification range with coaxial coarse/fine focus.",
    image: "https://images.unsplash.com/photo-1579154392429-0e6b4e850ad2?w=800&q=80"
  },
  {
    id: "15",
    name: "Hospital Bed - Electric",
    code: "BED-ELEC-01",
    category: "rehabilitation",
    description: "Electric hospital bed with adjustable height and backrest. Includes side rails and mattress. Remote control operation.",
    image: "https://images.unsplash.com/photo-1598300188089-3582c0839af3?w=800&q=80"
  },
  {
    id: "16",
    name: "Walking Frame (Zimmer)",
    code: "WF-ZIMM-01",
    category: "rehabilitation",
    description: "Lightweight aluminum walking frame with rubber ferrules. Height adjustable with ergonomic hand grips for maximum comfort.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
  },
  {
    id: "17",
    name: "Autoclave Sterilizer",
    code: "AUTO-STEAM-23L",
    category: "lab",
    description: "23L capacity steam autoclave sterilizer with digital display. Automatic temperature and pressure control with multiple cycle options.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"
  },
  {
    id: "18",
    name: "Surgical Gowns (Disposable)",
    code: "GOWN-DISP-50",
    category: "ppe",
    description: "Level 3 disposable isolation gowns. Fluid-resistant with elastic cuffs and tie closures. Box of 50 units.",
    image: "https://images.unsplash.com/photo-1585559604959-3a335dd6b1f0?w=800&q=80"
  },
  {
    id: "19",
    name: "Nebulizer Machine",
    code: "NEB-COMP-01",
    category: "diagnostic",
    description: "Compressor nebulizer for respiratory therapy. Quiet operation with adjustable flow rate and complete mask set included.",
    image: "https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=800&q=80"
  },
  {
    id: "20",
    name: "Blood Collection Tubes",
    code: "BCT-EDTA-100",
    category: "lab",
    description: "EDTA vacuum blood collection tubes. Sterile and latex-free. Box of 100 tubes with purple cap for hematology testing.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"
  }
];
export {
  categories,
  products
};
