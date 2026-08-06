export interface HealthTip {
  id: string;
  category: string;
  title: string;
  shortDesc: string;
  fullGuide: string[];
  keyTakeaway: string;
  iconName: string;
  gradient: string;
}

export const HEALTH_TIPS_DATA: HealthTip[] = [
  {
    id: 'healthy-diet',
    category: 'Nutrition',
    title: 'Healthy Diet & Nutrition',
    shortDesc: 'Fuel your immune system with whole foods, leafy greens, and balanced macro-nutrients.',
    fullGuide: [
      'Prioritize colorful vegetables and antioxidant-rich fruits daily.',
      'Reduce processed sugars and high-sodium refined foods.',
      'Incorporate lean proteins, legumes, and healthy omega-3 fatty acids.',
      'Stay hydrated by drinking at least 2.5 to 3 liters of fresh water daily.'
    ],
    keyTakeaway: '80% of long-term metabolic health is shaped by consistent whole-food nutrition.',
    iconName: 'Apple',
    gradient: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    id: 'exercise',
    category: 'Fitness',
    title: 'Physical Activity & Exercise',
    shortDesc: '150 minutes of moderate aerobic exercise weekly dramatically cuts heart disease risk.',
    fullGuide: [
      'Aim for 30 minutes of moderate brisk walking or cycling 5 days a week.',
      'Include resistance training twice weekly to preserve bone density and muscle mass.',
      'Break up prolonged sedentary periods every hour with short stretch breaks.',
      'Warm up properly before physical workouts to prevent joint strain.'
    ],
    keyTakeaway: 'Regular movement lowers blood pressure and boosts endorphins naturally.',
    iconName: 'Activity',
    gradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 'mental-health',
    category: 'Wellness',
    title: 'Mental Health & Mindfulness',
    shortDesc: 'Protect your cognitive wellbeing with stress management and mindful meditation.',
    fullGuide: [
      'Practice deep abdominal breathing for 5 minutes during high-stress moments.',
      'Maintain strong social bonds with supportive family and friends.',
      'Set healthy boundaries regarding work and digital device usage.',
      'Seek professional counseling early if experiencing persistent anxiety or low mood.'
    ],
    keyTakeaway: 'Mental wellbeing is integral to physical immunity and cellular health.',
    iconName: 'Smile',
    gradient: 'from-purple-500/20 to-indigo-500/20'
  },
  {
    id: 'sleep',
    category: 'Rest',
    title: 'Restorative Sleep Hygiene',
    shortDesc: '7 to 9 hours of quality uninterrupted sleep repairs tissues and consolidates memory.',
    fullGuide: [
      'Keep a consistent sleep-wake schedule, even on weekends.',
      'Avoid blue light screens (phones/tablets) at least 60 minutes before bedtime.',
      'Ensure your bedroom is dark, quiet, and cool (around 18-20°C / 65-68°F).',
      'Limit caffeine and heavy meals late in the evening.'
    ],
    keyTakeaway: 'Deep sleep releases essential growth hormones and clears brain waste toxins.',
    iconName: 'Moon',
    gradient: 'from-indigo-500/20 to-sky-500/20'
  },
  {
    id: 'hygiene',
    category: 'Sanitation',
    title: 'Personal Hygiene Practices',
    shortDesc: 'Effective hand hygiene stops up to 80% of common infectious disease transmissions.',
    fullGuide: [
      'Wash hands thoroughly with soap for 20 seconds before eating and after using facilities.',
      'Cover your mouth with tissue or inner elbow when coughing or sneezing.',
      'Disinfect high-touch surfaces like phones, door handles, and keyboards regularly.',
      'Maintain proper dental hygiene with twice-daily brushing and daily flossing.'
    ],
    keyTakeaway: 'Clean hands save lives and prevent the spread of seasonal viruses.',
    iconName: 'Sparkles',
    gradient: 'from-teal-500/20 to-emerald-500/20'
  },
  {
    id: 'safe-water',
    category: 'Sanitation',
    title: 'Safe Drinking Water & Sanitation',
    shortDesc: 'Prevent waterborne pathogens like Cholera and Typhoid through water purification.',
    fullGuide: [
      'Boil drinking water for at least 1 full minute or use certified WHO filtration systems.',
      'Store purified water in clean, covered containers with a narrow neck.',
      'Avoid ice cubes when traveling in areas with uncertain municipal water quality.',
      'Test well water annually for heavy metals and microbial contaminants.'
    ],
    keyTakeaway: 'Pure water is the single greatest defense against gastrointestinal infections.',
    iconName: 'Droplets',
    gradient: 'from-cyan-500/20 to-blue-500/20'
  },
  {
    id: 'vaccination',
    category: 'Immunization',
    title: 'Lifelong Vaccination Safety',
    shortDesc: 'Keep your immunization record up to date to safeguard your community.',
    fullGuide: [
      'Follow national childhood immunization schedules for Measles, Polio, and DTP.',
      'Get annual influenza vaccines and recommended adult boosters (Tetanus/Pneumococcal).',
      'Consult travel health clinics for yellow fever or typhoid vaccines before overseas trips.',
      'Encourage high community vaccination rates to maintain herd immunity.'
    ],
    keyTakeaway: 'Vaccines prevent 3.5 to 5 million deaths every year globally.',
    iconName: 'Syringe',
    gradient: 'from-amber-500/20 to-orange-500/20'
  },
  {
    id: 'womens-health',
    category: 'Specialized',
    title: "Women's Health & Wellness",
    shortDesc: 'Comprehensive care covering hormonal balance, reproductive health, and bone density.',
    fullGuide: [
      'Schedule annual gynecological checkups and Pap smears/HPV screenings.',
      'Ensure adequate Calcium (1000-1200 mg) and Vitamin D for bone preservation.',
      'Practice regular self-breast exams and mammograms after age 40.',
      'Maintain prenatal care and folic acid supplementation during pregnancy planning.'
    ],
    keyTakeaway: 'Early screening and hormonal wellness empower long-term female health.',
    iconName: 'Heart',
    gradient: 'from-pink-500/20 to-rose-500/20'
  },
  {
    id: 'child-health',
    category: 'Specialized',
    title: 'Child Healthcare & Growth',
    shortDesc: 'Promote optimal physical and cognitive development during early childhood years.',
    fullGuide: [
      'Ensure exclusive breastfeeding for the first 6 months of life where possible.',
      'Monitor developmental milestones in motor skills, speech, and social behavior.',
      'Encourage outdoor active play over passive screen time.',
      'Child-proof home environments against accidental poisoning and falls.'
    ],
    keyTakeaway: 'Early nutrition and nurturing create the foundation for lifelong potential.',
    iconName: 'Baby',
    gradient: 'from-yellow-500/20 to-amber-500/20'
  },
  {
    id: 'senior-care',
    category: 'Specialized',
    title: 'Senior Citizen Active Aging',
    shortDesc: 'Preserve mobility, cognitive clarity, and independence in golden years.',
    fullGuide: [
      'Conduct regular vision, hearing, and blood pressure evaluations.',
      'Engage in balance exercises (like Tai Chi or walking) to prevent falls.',
      'Keep mind active through reading, puzzles, and social community engagement.',
      'Review medications with a physician annually to prevent adverse drug interactions.'
    ],
    keyTakeaway: 'Active physical and mental engagement ensures vibrant, fulfilling longevity.',
    iconName: 'UserCheck',
    gradient: 'from-slate-500/20 to-blue-500/20'
  }
];
