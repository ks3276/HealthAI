import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { X, Mail, Lock, Sparkles, CheckCircle, ArrowRight, ArrowLeft, Calendar, UserCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { verifyAndLogin, signup, showNotification } = useAuth();
  const { t } = useTheme();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  // Sign In State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Multi-Step Register State
  const [regStep, setRegStep] = useState<1 | 2 | 3>(1);
  const [surname, setSurname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const validateEmailFormat = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr.trim());
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    // Rule 1: Both email and password empty / invalid
    if (!cleanEmail && !cleanPassword) {
      showNotification('Your credentials are wrong', 'error');
      setPassword('');
      return;
    }

    // Rule 2: Email format invalid or missing
    if (!cleanEmail || !validateEmailFormat(cleanEmail)) {
      showNotification('ur email is wrong', 'error');
      setPassword('');
      return;
    }

    // Rule 3: Verify email & registered password against accounts store
    const result = verifyAndLogin(cleanEmail, cleanPassword);

    if (result === 'WRONG_CREDENTIALS') {
      showNotification('Your credentials are wrong', 'error');
      setPassword('');
      return;
    }

    if (result === 'WRONG_EMAIL') {
      showNotification('ur email is wrong', 'error');
      setPassword('');
      return;
    }

    if (result === 'WRONG_PASSWORD') {
      showNotification('your password is wrong', 'error');
      setPassword(''); // Kick out password input
      return;
    }

    if (result === 'SUCCESS') {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccessMessage('Successfully logged in!');
        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 1000);
      }, 500);
    }
  };

  // Step 1 -> Step 2 validation
  const handleNextStep1 = () => {
    setErrorMessage('');
    if (!surname.trim() || !firstName.trim() || !lastName.trim()) {
      setErrorMessage('Please enter your Surname, First Name, and Last Name');
      return;
    }
    setRegStep(2);
  };

  // Step 2 -> Step 3 validation
  const handleNextStep2 = () => {
    setErrorMessage('');
    if (!dob) {
      setErrorMessage('Please select your Date of Birth');
      return;
    }
    setRegStep(3);
  };

  // Final Step 3 Registration submission
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regEmail || !validateEmailFormat(regEmail)) {
      setErrorMessage('ur email is wrong');
      return;
    }

    if (!regPassword || regPassword.length < 4) {
      setErrorMessage('Password must be at least 4 characters long');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match! Please re-enter your password correctly.');
      setRegConfirmPassword('');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      signup({
        surname: surname.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        gender,
        dob,
        username: regEmail.trim(),
        password: regPassword.trim()
      });

      const formattedName = `${surname.trim()} ${firstName.trim()} ${lastName.trim()}`;
      setIsSubmitting(false);
      setSuccessMessage(`Account created successfully for ${formattedName}!`);
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 1200);
    }, 600);
  };

  const resetModalState = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setRegStep(1);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration banner */}
        <div className="h-3 bg-gradient-to-r from-health-500 via-health-accent to-health-teal" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Modal Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-health-500/10 text-health-600 dark:text-health-400 mb-1">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {mode === 'register' ? 'Create New Account' : t('authTitle')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {mode === 'register' ? `Step ${regStep} of 3 • Member Account Registration` : t('authSubtitle')}
            </p>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="p-4 mb-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2 text-sm font-bold animate-in zoom-in-95">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}



          {!successMessage && (
            <>
              {/* Tab Selector */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mb-6">
                <button
                  onClick={() => {
                    resetModalState();
                    setMode('login');
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    mode === 'login'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t('loginTab')}
                </button>
                <button
                  onClick={() => {
                    resetModalState();
                    setMode('register');
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    mode === 'register'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t('registerTab')}
                </button>
              </div>

              {/* Mode 1: Sign In */}
              {mode === 'login' ? (
                <>
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="user@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errorMessage) setErrorMessage('');
                          }}
                          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {t('passwordLabel')} *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (errorMessage) setErrorMessage('');
                          }}
                          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-health-500 to-health-accent hover:from-health-600 hover:to-health-emerald text-white font-extrabold text-sm shadow-lg shadow-health-500/25 transition-all transform active:scale-95 disabled:opacity-50 mt-2"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                      ) : (
                        t('loginTab')
                      )}
                    </button>
                  </form>
                </>
              ) : (
                /* Mode 2: Multi-Step Registration Wizard */
                <div className="space-y-4 animate-in fade-in">
                  
                  {/* Step Progress Bar */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`flex-1 h-1.5 rounded-full transition-all ${regStep >= 1 ? 'bg-health-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                    <div className={`flex-1 h-1.5 rounded-full transition-all ${regStep >= 2 ? 'bg-health-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                    <div className={`flex-1 h-1.5 rounded-full transition-all ${regStep >= 3 ? 'bg-health-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                  </div>

                  {/* STEP 1: Personal Names */}
                  {regStep === 1 && (
                    <div className="space-y-3 animate-in fade-in">
                      <h4 className="text-xs font-extrabold uppercase text-health-600 dark:text-health-400 tracking-wider">
                        Personal Name Details
                      </h4>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Surname *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Kilaru"
                          value={surname}
                          onChange={(e) => {
                            setSurname(e.target.value);
                            if (errorMessage) setErrorMessage('');
                          }}
                          className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sriram"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            if (errorMessage) setErrorMessage('');
                          }}
                          className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Kumar"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                            if (errorMessage) setErrorMessage('');
                          }}
                          className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleNextStep1}
                        className="w-full py-3.5 rounded-2xl bg-health-500 hover:bg-health-600 text-white font-extrabold text-sm shadow-md shadow-health-500/20 flex items-center justify-center gap-2 transition-all mt-4"
                      >
                        <span>Next Step</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* STEP 2: Demographics */}
                  {regStep === 2 && (
                    <div className="space-y-4 animate-in fade-in">
                      <h4 className="text-xs font-extrabold uppercase text-health-600 dark:text-health-400 tracking-wider">
                        Demographic Details
                      </h4>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Gender *
                        </label>
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Non-Binary">Non-Binary</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Date of Birth (DOB) *
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                          <input
                            type="date"
                            required
                            value={dob}
                            onChange={(e) => {
                              setDob(e.target.value);
                              if (errorMessage) setErrorMessage('');
                            }}
                            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setRegStep(1)}
                          className="flex-1 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-1"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStep2}
                          className="flex-[2] py-3 rounded-2xl bg-health-500 hover:bg-health-600 text-white font-extrabold text-xs shadow-md shadow-health-500/20 flex items-center justify-center gap-1.5"
                        >
                          <span>Next Step</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Account Credentials */}
                  {regStep === 3 && (
                    <form onSubmit={handleRegisterSubmit} className="space-y-4 animate-in fade-in">
                      <h4 className="text-xs font-extrabold uppercase text-health-600 dark:text-health-400 tracking-wider">
                        Create Username & Password
                      </h4>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Create Username / Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            required
                            placeholder="sriram@gmail.com"
                            value={regEmail}
                            onChange={(e) => {
                              setRegEmail(e.target.value);
                              if (errorMessage) setErrorMessage('');
                            }}
                            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Create Password *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                          <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={regPassword}
                            onChange={(e) => {
                              setRegPassword(e.target.value);
                              if (errorMessage) setErrorMessage('');
                            }}
                            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Re-enter Your Password *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                          <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={regConfirmPassword}
                            onChange={(e) => {
                              setRegConfirmPassword(e.target.value);
                              if (errorMessage) setErrorMessage('');
                            }}
                            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setRegStep(2)}
                          className="flex-1 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-1"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-[2] py-3.5 rounded-2xl bg-gradient-to-r from-health-500 to-health-accent hover:from-health-600 hover:to-health-emerald text-white font-extrabold text-xs shadow-lg shadow-health-500/25 flex items-center justify-center gap-1.5 transition-all transform active:scale-95 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                          ) : (
                            <>
                              <UserCheck className="w-4 h-4" />
                              <span>Create Account</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}

                </div>
              )}

              {/* Bottom toggle link */}
              <div className="text-center mt-6">
                <button
                  onClick={() => {
                    resetModalState();
                    setMode(mode === 'login' ? 'register' : 'login');
                  }}
                  className="text-xs font-semibold text-health-600 dark:text-health-400 hover:underline"
                >
                  {mode === 'login' ? t('noAccount') : t('alreadyAccount')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
