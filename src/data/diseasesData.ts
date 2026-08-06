export interface Disease {
  id: string;
  name: string;
  category: 'Infectious' | 'Chronic' | 'Respiratory' | 'Waterborne';
  tagline: string;
  severity: 'High' | 'Moderate' | 'Manageable';
  transmission: string;
  symptoms: string[];
  causes: string[];
  prevention: string[];
  riskFactors: string[];
  emergencyWarning: string;
  icdCode: string;
  bgGradient: string;
  iconName: string;
}

export const DISEASES_DATA: Disease[] = [
  {
    id: 'dengue',
    name: 'Dengue Fever',
    category: 'Infectious',
    tagline: 'Mosquito-borne viral infection causing high fever and joint pain',
    severity: 'High',
    transmission: 'Transmitted by female Aedes mosquitoes (Aedes aegypti)',
    symptoms: ['High Fever (104°F/40°C)', 'Severe Headache & Eye Pain', 'Joint & Muscle Aches', 'Skin Rash', 'Mild Bleeding (Nose/Gums)'],
    causes: ['Dengue Virus (DEN-1, DEN-2, DEN-3, DEN-4)'],
    prevention: ['Eliminate stagnant water around home', 'Use mosquito repellent with DEET', 'Wear long-sleeved clothing', 'Use window mosquito nets'],
    riskFactors: ['Tropical climate residency', 'Prior dengue infection', 'Weakened immunity'],
    emergencyWarning: 'Severe abdominal pain, persistent vomiting, or mucosal bleeding requires immediate ER care.',
    icdCode: 'A90',
    bgGradient: 'from-amber-500/20 to-red-500/20',
    iconName: 'Bug'
  },
  {
    id: 'malaria',
    name: 'Malaria',
    category: 'Infectious',
    tagline: 'Parasitic infection transmitted through infected mosquito bites',
    severity: 'High',
    transmission: 'Bite of infected female Anopheles mosquitoes',
    symptoms: ['Chills & Shivering', 'High Fever Cycles', 'Profuse Sweating', 'Nausea & Vomiting', 'Fatigue & Muscle Pain'],
    causes: ['Plasmodium parasite (P. falciparum, P. vivax)'],
    prevention: ['Sleep under insecticide-treated bed nets', 'Take prophylactic antimalarial medication', 'Spray indoor insecticides'],
    riskFactors: ['Travel to endemic areas', 'Young children & pregnant women', 'Lack of mosquito net protection'],
    emergencyWarning: 'High fever accompanied by confusion, jaundice, or breathing difficulty demands immediate hospitalization.',
    icdCode: 'B54',
    bgGradient: 'from-emerald-500/20 to-teal-500/20',
    iconName: 'ShieldAlert'
  },
  {
    id: 'covid19',
    name: 'COVID-19',
    category: 'Respiratory',
    tagline: 'Contagious respiratory illness caused by SARS-CoV-2 coronavirus',
    severity: 'High',
    transmission: 'Airborne droplets from coughing, sneezing, or talking',
    symptoms: ['Dry Cough & Fever', 'Loss of Taste or Smell', 'Shortness of Breath', 'Fatigue & Body Aches', 'Sore Throat'],
    causes: ['SARS-CoV-2 Virus and its subvariants'],
    prevention: ['Get vaccinated & updated boosters', 'Wear masks in crowded indoor spaces', 'Maintain physical distance', 'Wash hands frequently'],
    riskFactors: ['Advanced age (65+)', 'Pre-existing cardiovascular or lung conditions', 'Immunocompromised status'],
    emergencyWarning: 'Trouble breathing, persistent chest pain, or bluish lips require emergency medical transport.',
    icdCode: 'U07.1',
    bgGradient: 'from-blue-500/20 to-cyan-500/20',
    iconName: 'Activity'
  },
  {
    id: 'diabetes',
    name: 'Type 2 Diabetes',
    category: 'Chronic',
    tagline: 'Metabolic disorder characterized by high blood glucose levels',
    severity: 'Manageable',
    transmission: 'Non-communicable (Genetic & Lifestyle driven)',
    symptoms: ['Increased Thirst & Frequent Urination', 'Unexplained Weight Loss', 'Blurry Vision', 'Slow-healing Wounds', 'Chronic Fatigue'],
    causes: ['Insulin resistance', 'Pancreatic beta-cell dysfunction', 'Obesity and physical inactivity'],
    prevention: ['Adopt a balanced low-glycemic diet', 'Engage in 150 mins of regular exercise weekly', 'Maintain healthy body weight', 'Routine HbA1c screening'],
    riskFactors: ['Family history of diabetes', 'Sedentary lifestyle', 'Overweight/Obesity', 'Age over 45'],
    emergencyWarning: 'Extremely high blood sugar with confusion, fruity breath odor, or extreme drowsiness indicates Diabetic Ketoacidosis.',
    icdCode: 'E11',
    bgGradient: 'from-purple-500/20 to-indigo-500/20',
    iconName: 'HeartPulse'
  },
  {
    id: 'hypertension',
    name: 'Hypertension',
    category: 'Chronic',
    tagline: 'Long-term high blood pressure known as the silent killer',
    severity: 'Manageable',
    transmission: 'Non-communicable (Cardiovascular factor)',
    symptoms: ['Often asymptomatic ("Silent")', 'Morning Headaches', 'Dizziness', 'Chest Pain', 'Shortness of Breath'],
    causes: ['Arterial stiffness', 'High sodium intake', 'Chronic stress', 'Kidney disorders'],
    prevention: ['Reduce dietary sodium intake (<2g/day)', 'Exercise regularly', 'Limit alcohol and quit smoking', 'Manage stress through mindfulness'],
    riskFactors: ['High salt diet', 'Lack of exercise', 'Chronic stress', 'High cholesterol'],
    emergencyWarning: 'Blood pressure over 180/120 mmHg with severe headache or vision changes is a Hypertensive Crisis.',
    icdCode: 'I10',
    bgGradient: 'from-red-500/20 to-pink-500/20',
    iconName: 'Heart'
  },
  {
    id: 'tuberculosis',
    name: 'Tuberculosis (TB)',
    category: 'Respiratory',
    tagline: 'Potentially serious infectious bacterial disease affecting lungs',
    severity: 'High',
    transmission: 'Airborne microscopic droplets when infected person coughs',
    symptoms: ['Persistent Cough (> 3 weeks)', 'Coughing up Blood or Sputum', 'Night Sweats & Fever', 'Unexplained Weight Loss', 'Chest Pain'],
    causes: ['Mycobacterium tuberculosis bacteria'],
    prevention: ['BCG Vaccination in infants', 'Good indoor ventilation', 'Covering mouth when coughing', 'Completing full antibiotic course'],
    riskFactors: ['Close contact with active TB cases', 'Malnutrition', 'HIV infection', 'Smoking'],
    emergencyWarning: 'Coughing up significant blood or acute respiratory distress requires urgent hospital evaluation.',
    icdCode: 'A15',
    bgGradient: 'from-orange-500/20 to-amber-500/20',
    iconName: 'Lungs'
  },
  {
    id: 'asthma',
    name: 'Asthma',
    category: 'Respiratory',
    tagline: 'Chronic condition where airways narrow, swell, and produce extra mucus',
    severity: 'Manageable',
    transmission: 'Non-communicable (Genetic & Environmental triggers)',
    symptoms: ['Wheezing sound during exhalation', 'Shortness of Breath', 'Chest Tightness', 'Coughing attacks (especially at night)'],
    causes: ['Airway hyper-responsiveness to allergens, dust, cold air, or physical exertion'],
    prevention: ['Identify and avoid asthma triggers', 'Use prescribed controller inhalers daily', 'Monitor peak airflow', 'Annual flu vaccination'],
    riskFactors: ['Family history of allergies/asthma', 'Exposure to secondhand smoke', 'Air pollution'],
    emergencyWarning: 'Inability to speak full sentences or inhaler providing no relief indicates a life-threatening asthma attack.',
    icdCode: 'J45',
    bgGradient: 'from-teal-500/20 to-cyan-500/20',
    iconName: 'Wind'
  },
  {
    id: 'influenza',
    name: 'Influenza (Seasonal Flu)',
    category: 'Respiratory',
    tagline: 'Contagious viral infection targeting nose, throat, and lungs',
    severity: 'Moderate',
    transmission: 'Respiratory droplets and contaminated surfaces',
    symptoms: ['Sudden High Fever', 'Severe Body Aches', 'Dry Cough', 'Sore Throat', 'Nasal Congestion'],
    causes: ['Influenza A and Influenza B viruses'],
    prevention: ['Annual seasonal flu shot', 'Frequent hand hygiene', 'Avoid touching eyes/nose/mouth', 'Stay home when sick'],
    riskFactors: ['Young children & elderly', 'Healthcare workers', 'Chronic lung or heart disease'],
    emergencyWarning: 'Difficulty breathing or sudden confusion in vulnerable individuals requires prompt physician consultation.',
    icdCode: 'J11',
    bgGradient: 'from-sky-500/20 to-blue-500/20',
    iconName: 'Thermometer'
  },
  {
    id: 'cholera',
    name: 'Cholera',
    category: 'Waterborne',
    tagline: 'Acute diarrheal infection caused by ingestion of contaminated water',
    severity: 'High',
    transmission: 'Consuming water or food contaminated with Vibrio cholerae',
    symptoms: ['Profuse Watery Diarrhea ("Rice-water stools")', 'Severe Vomiting', 'Rapid Dehydration', 'Muscle Cramps', 'Sunken Eyes'],
    causes: ['Vibrio cholerae bacterium strain'],
    prevention: ['Drink boiled or chemically treated safe water', 'Wash hands with soap before meals', 'Eat thoroughly cooked food', 'Proper sanitation & sewage disposal'],
    riskFactors: ['Poor sanitation infrastructure', 'Disaster zones', 'Untreated water consumption'],
    emergencyWarning: 'Severe dehydration can cause circulatory shock and death within hours without Oral Rehydration Solution (ORS) & IV fluids.',
    icdCode: 'A00',
    bgGradient: 'from-cyan-500/20 to-emerald-500/20',
    iconName: 'Droplets'
  },
  {
    id: 'typhoid',
    name: 'Typhoid Fever',
    category: 'Waterborne',
    tagline: 'Bacterial infection causing prolonged high fever and gastrointestinal issues',
    severity: 'High',
    transmission: 'Contaminated food, milk, or drinking water',
    symptoms: ['Step-ladder High Fever (up to 104°F)', 'Rose-colored Spot Rash', 'Abdominal Pain & Constipation/Diarrhea', 'Severe Weakness', 'Loss of Appetite'],
    causes: ['Salmonella enterica serotype Typhi'],
    prevention: ['Get vaccinated against Typhoid', 'Avoid raw or street food in high-risk zones', 'Practice strict hand hygiene', 'Drink bottled or boiled water'],
    riskFactors: ['Travel to endemic regions', 'Drinking unpurified water', 'Poor food handling sanitation'],
    emergencyWarning: 'High fever lasting over 3 days or intestinal pain requires immediate antibiotic therapy under medical supervision.',
    icdCode: 'A01.0',
    bgGradient: 'from-yellow-500/20 to-amber-500/20',
    iconName: 'AlertTriangle'
  }
];
