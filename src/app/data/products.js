const categories = [
  { id: "surgical", nameKey: "categories.surgical", icon: "Scissors" },
  { id: "diagnostic", nameKey: "categories.diagnostic", icon: "Stethoscope" },
  { id: "ppe", nameKey: "categories.ppe", icon: "ShieldCheck" },
  { id: "lab", nameKey: "categories.lab", icon: "TestTube" },
  { id: "disposable", nameKey: "categories.disposable", icon: "Syringe" },
  { id: "rehabilitation", nameKey: "categories.rehabilitation", icon: "Heart" }
];
const products = [
  {
    id: "1",
    nameKey: "products.1.name",
    code: "DS-3000",
    category: "diagnostic",
    descriptionKey: "products.1.description",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=800&q=80",
    featured: true
  },
  {
    id: "2",
    nameKey: "products.2.name",
    code: "SS-450",
    category: "surgical",
    descriptionKey: "products.2.description",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80",
    featured: true
  },
  {
    id: "3",
    nameKey: "products.3.name",
    code: "N95-100",
    category: "ppe",
    descriptionKey: "products.3.description",
    image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=800&q=80",
    featured: true
  },
  {
    id: "4",
    nameKey: "products.4.name",
    code: "BPM-2500",
    category: "diagnostic",
    descriptionKey: "products.4.description",
    image: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=800&q=80",
    featured: true
  },
  {
    id: "5",
    nameKey: "products.5.name",
    code: "GLV-500",
    category: "ppe",
    descriptionKey: "products.5.description",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&q=80",
    featured: true
  },
  {
    id: "6",
    nameKey: "products.6.name",
    code: "THERM-IR200",
    category: "diagnostic",
    descriptionKey: "products.6.description",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    featured: true
  },
  {
    id: "7",
    nameKey: "products.7.name",
    code: "WC-STD-01",
    category: "rehabilitation",
    descriptionKey: "products.7.description",
    image: "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800&q=80",
    featured: true
  },
  {
    id: "8",
    nameKey: "products.8.name",
    code: "OX-1000",
    category: "diagnostic",
    descriptionKey: "products.8.description",
    image: "https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=800&q=80",
    featured: true
  },
  {
    id: "9",
    nameKey: "products.9.name",
    code: "SFM-50",
    category: "ppe",
    descriptionKey: "products.9.description",
    image: "https://images.unsplash.com/photo-1585559604959-3a335dd6b1f0?w=800&q=80"
  },
  {
    id: "10",
    nameKey: "products.10.name",
    code: "SYR-3ML-100",
    category: "disposable",
    descriptionKey: "products.10.description",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80"
  },
  {
    id: "11",
    nameKey: "products.11.name",
    code: "ECG-12L-PRO",
    category: "diagnostic",
    descriptionKey: "products.11.description",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80"
  },
  {
    id: "12",
    nameKey: "products.12.name",
    code: "IVS-ADJ-01",
    category: "disposable",
    descriptionKey: "products.12.description",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80"
  },
  {
    id: "13",
    nameKey: "products.13.name",
    code: "CENT-LAB-3000",
    category: "lab",
    descriptionKey: "products.13.description",
    image: "https://images.unsplash.com/photo-1582719366249-e8a2a50ce598?w=800&q=80"
  },
  {
    id: "14",
    nameKey: "products.14.name",
    code: "MICRO-BIN-400",
    category: "lab",
    descriptionKey: "products.14.description",
    image: "https://images.unsplash.com/photo-1579154392429-0e6b4e850ad2?w=800&q=80"
  },
  {
    id: "15",
    nameKey: "products.15.name",
    code: "BED-ELEC-01",
    category: "rehabilitation",
    descriptionKey: "products.15.description",
    image: "https://images.unsplash.com/photo-1598300188089-3582c0839af3?w=800&q=80"
  },
  {
    id: "16",
    nameKey: "products.16.name",
    code: "WF-ZIMM-01",
    category: "rehabilitation",
    descriptionKey: "products.16.description",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
  },
  {
    id: "17",
    nameKey: "products.17.name",
    code: "AUTO-STEAM-23L",
    category: "lab",
    descriptionKey: "products.17.description",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"
  },
  {
    id: "18",
    nameKey: "products.18.name",
    code: "GOWN-DISP-50",
    category: "ppe",
    descriptionKey: "products.18.description",
    image: "https://images.unsplash.com/photo-1585559604959-3a335dd6b1f0?w=800&q=80"
  },
  {
    id: "19",
    nameKey: "products.19.name",
    code: "NEB-COMP-01",
    category: "diagnostic",
    descriptionKey: "products.19.description",
    image: "https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=800&q=80"
  },
  {
    id: "20",
    nameKey: "products.20.name",
    code: "BCT-EDTA-100",
    category: "lab",
    descriptionKey: "products.20.description",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"
  }
];
export {
  categories,
  products
};
