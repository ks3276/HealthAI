import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  PhoneCall, 
  Globe 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { t } = useTheme();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-health-500/10 text-health-600 dark:text-health-400 text-xs font-bold uppercase tracking-wider">
            <span>{t('contactTag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('contactTitle')}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            {t('contactSubtitle')}
          </p>
        </div>

        {/* 24/7 Emergency Hotline Banner */}
        <div className="mb-12 p-4 rounded-3xl bg-gradient-to-r from-rose-500/10 via-red-500/10 to-amber-500/10 border border-rose-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-red-500 text-white shadow-lg animate-pulse">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-red-600 dark:text-red-400 uppercase tracking-wider">
                Emergency Red-Flag Health Line (24/7)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                For acute respiratory distress or severe trauma, contact national emergency dispatchers immediately.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:911"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/30 whitespace-nowrap"
            >
              Call Emergency 911
            </a>
            <a
              href="tel:112"
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 whitespace-nowrap"
            >
              Call Global 112
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xl">
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{t('contactTitle')}</h3>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">Message Delivered!</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Thank you for reaching out to HealthAI. Our public health support team will review your inquiry within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t('nameField')} *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="John Doe"
                        className="w-full mt-1.5 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t('emailField')} *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full mt-1.5 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t('messageField')} *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="..."
                      className="w-full mt-1.5 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-health-500 to-health-accent hover:from-health-600 hover:to-health-emerald text-white font-extrabold text-sm shadow-lg shadow-health-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t('sendMessage')}</span>
                  </button>

                </form>
              )}

            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 space-y-4">
              <h4 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                Global Public Health Headquarters
              </h4>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-health-500/10 text-health-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{t('contactEmailUsLabel')}:</span>
                    <span>support@healthai.org</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{t('contactPhoneLabel')}:</span>
                    <span>+1 (800) 555-HEALTH (4325)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{t('contactAddressLabel')}:</span>
                    <span>HealthAI Tower, 500 Medical Innovation Way, Boston, MA 02115, USA</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
