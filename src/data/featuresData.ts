export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge: string;
  color: string;
}

export const FEATURES_DATA: Feature[] = [
  {
    id: 'ai-awareness',
    title: 'AI Disease Awareness',
    description: 'Instant, evidence-based insights into infectious and chronic diseases curated by WHO and public health standards.',
    iconName: 'Brain',
    badge: 'AI Core',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'symptom-checker',
    title: 'Symptom Checker',
    description: 'Intelligent triage tool that evaluates your reported symptoms and guides you to the right care level.',
    iconName: 'Stethoscope',
    badge: 'Interactive',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'preventive-care',
    title: 'Preventive Healthcare',
    description: 'Proactive daily health habits, dietary recommendations, and environmental risk mitigation advice.',
    iconName: 'ShieldCheck',
    badge: 'Prevention',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'vaccination-info',
    title: 'Vaccination Information',
    description: 'Complete immunization schedules, booster recommendations, and vaccine efficacy guidelines for all ages.',
    iconName: 'Syringe',
    badge: 'Immunization',
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'emergency-guidance',
    title: 'Emergency Health Guidance',
    description: 'Critical red-flag symptom warnings, immediate first-aid protocols, and emergency medical contacts.',
    iconName: 'AlertCircle',
    badge: '24/7 Critical',
    color: 'from-red-500 to-rose-500'
  },
  {
    id: 'nearby-hospitals',
    title: 'Nearby Hospitals Locator',
    description: 'Quickly find local accredited clinics, trauma centers, and emergency rooms with real-time direction shortcuts.',
    iconName: 'MapPin',
    badge: 'Geolocation',
    color: 'from-sky-500 to-blue-600'
  },
  {
    id: 'multi-language',
    title: 'Multi-Language Support',
    description: 'Breaking barriers with multi-lingual voice and text interactions in English, Spanish, Hindi, French, and Mandarin.',
    iconName: 'Globe',
    badge: 'Global',
    color: 'from-teal-500 to-emerald-600'
  },
  {
    id: '247-assistant',
    title: '24×7 AI Assistant',
    description: 'Zero wait time. Ask health questions anytime from any device and receive empathetic, verified guidance.',
    iconName: 'Clock',
    badge: 'Always Available',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'personalized-tips',
    title: 'Personalized Health Tips',
    description: 'Tailored recommendations based on age group, lifestyle factors, seasonal risks, and wellness targets.',
    iconName: 'Sparkles',
    badge: 'Smart Adapt',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'secure-private',
    title: 'Secure & Private',
    description: 'Enterprise-grade HIPAA-aligned encryption ensures your health inquiries remain confidential and anonymous.',
    iconName: 'Lock',
    badge: '100% Private',
    color: 'from-slate-600 to-slate-800'
  }
];
