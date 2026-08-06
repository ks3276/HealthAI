import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  X, 
  Stethoscope, 
  CheckCircle2, 
  Activity, 
  ChevronRight, 
  ChevronLeft,
  PhoneCall,
  RotateCcw
} from 'lucide-react';

interface SymptomCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SymptomCheckerModal: React.FC<SymptomCheckerModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTheme();
  const [step, setStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [duration, setDuration] = useState('1-3 days');
  const [severity, setSeverity] = useState('Moderate');
  const [ageGroup, setAgeGroup] = useState('Adult (18-64)');
  const [hasConditions, setHasConditions] = useState(false);

  if (!isOpen) return null;

  const symptomsList = [
    { id: 'fever', label: 'High Fever (>101°F)', icon: '🌡️' },
    { id: 'cough', label: 'Dry or Productive Cough', icon: '🗣️' },
    { id: 'headache', label: 'Severe Headache / Eye Pain', icon: '🤯' },
    { id: 'joint_pain', label: 'Joint / Muscle Aches', icon: '🦴' },
    { id: 'vomiting', label: 'Nausea or Vomiting', icon: '🤢' },
    { id: 'fatigue', label: 'Extreme Exhaustion', icon: '😴' },
    { id: 'breathlessness', label: 'Shortness of Breath', icon: '🫁' },
    { id: 'rash', label: 'Skin Rash or Spots', icon: '🩺' },
    { id: 'diarrhea', label: 'Watery Diarrhea', icon: '💧' },
    { id: 'chest_pain', label: 'Chest Tightness', icon: '💔' },
  ];

  const toggleSymptom = (id: string) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  const calculateRisk = () => {
    const isUrgent = selectedSymptoms.includes('breathlessness') || 
                     selectedSymptoms.includes('chest_pain') || 
                     (severity === 'Severe' && selectedSymptoms.length >= 3);

    if (isUrgent) {
      return {
        level: t('riskUrgent'),
        color: 'text-red-500 bg-red-500/10 border-red-500/30',
        badge: 'High Risk',
        guidance: 'Combination of symptoms indicates potential high-risk complications. Consult emergency services immediately.',
        callout: 'Call Emergency Services (911 / 112) or visit nearest hospital.'
      };
    }

    if (selectedSymptoms.length >= 3 || severity === 'Severe' || hasConditions) {
      return {
        level: t('riskModerate'),
        color: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
        badge: 'Moderate Risk',
        guidance: 'Multiple symptoms present. We recommend booking a consultation with a physician within 24-48 hours.',
        callout: 'Schedule a doctor appointment and monitor temperature.'
      };
    }

    return {
      level: t('riskLow'),
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
      badge: 'Low Risk',
      guidance: 'Symptoms appear mild. Practice hydration, rest, and monitor over the next 48 hours.',
      callout: 'Rest, hydrate, and re-assess in 24 hours.'
    };
  };

  const riskResult = calculateRisk();

  const resetAll = () => {
    setStep(1);
    setSelectedSymptoms([]);
    setDuration('1-3 days');
    setSeverity('Moderate');
    setAgeGroup('Adult (18-64)');
    setHasConditions(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-health-500 text-white">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('symptomModalTitle')}</h3>
              <p className="text-xs text-slate-500">Step {step} of 4 • Confidential & Educational</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* STEP 1: Select Symptoms */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">{t('symptomModalSubtitle')}</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {symptomsList.map((symptom) => {
                  const isSelected = selectedSymptoms.includes(symptom.id);
                  return (
                    <button
                      key={symptom.id}
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected 
                          ? 'bg-health-500/10 border-health-500 text-slate-900 dark:text-white font-semibold' 
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-2 text-sm">
                        <span>{symptom.icon}</span>
                        <span>{symptom.label}</span>
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-health-500" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Duration & Intensity */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Duration:</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Less than 24h', '1-3 days', 'More than 4 days'].map((dur) => (
                    <button
                      key={dur}
                      onClick={() => setDuration(dur)}
                      className={`p-2.5 rounded-xl border text-xs font-medium ${
                        duration === dur 
                          ? 'bg-health-500 text-white border-health-500 font-bold' 
                          : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Severity Level:</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Mild', 'Moderate', 'Severe'].map((sev) => (
                    <button
                      key={sev}
                      onClick={() => setSeverity(sev)}
                      className={`p-2.5 rounded-xl border text-xs font-medium ${
                        severity === sev 
                          ? 'bg-health-500 text-white border-health-500 font-bold' 
                          : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Profile & Health Factors */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Age Bracket:</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Child (0-12)', 'Teen (13-17)', 'Adult (18-64)', 'Senior (65+)'].map((age) => (
                    <button
                      key={age}
                      onClick={() => setAgeGroup(age)}
                      className={`p-2.5 rounded-xl border text-xs font-medium ${
                        ageGroup === age 
                          ? 'bg-health-500 text-white border-health-500 font-bold' 
                          : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Pre-existing Health Conditions?</div>
                  <div className="text-[11px] text-slate-500">Asthma, Diabetes, Heart condition, Hypertension</div>
                </div>
                <input
                  type="checkbox"
                  checked={hasConditions}
                  onChange={(e) => setHasConditions(e.target.checked)}
                  className="w-5 h-5 accent-health-500 rounded cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Risk Result */}
          {step === 4 && (
            <div className="space-y-6">
              <div className={`p-5 rounded-2xl border ${riskResult.color} space-y-3`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold tracking-widest">{riskResult.badge}</span>
                  <Activity className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-extrabold">{riskResult.level}</h4>
                <p className="text-xs leading-relaxed opacity-90">{riskResult.guidance}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 space-y-2 text-xs">
                <div className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-health-500" />
                  <span>Action Plan:</span>
                </div>
                <p>{riskResult.callout}</p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={resetAll}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-600"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('resetBtn')}</span>
            </button>
          )}

          {step < 4 ? (
            <button
              disabled={step === 1 && selectedSymptoms.length === 0}
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-health-500 hover:bg-health-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-health-500/20"
            >
              <span>{step === 3 ? t('evaluateBtn') : 'Continue'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:opacity-90"
            >
              {t('closeProfile')}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
