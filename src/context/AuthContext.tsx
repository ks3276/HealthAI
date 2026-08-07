import React, { createContext, useContext, useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export interface User {
  id: string;
  name: string; // `${surname} ${firstName} ${lastName}`
  surname?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dob?: string;
  email: string;
  avatar: string;
  provider: 'email' | 'google';
}

export interface RegisteredAccount {
  surname?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dob?: string;
  name: string;
  email: string;
  password: string;
}

export interface ChatHistoryItem {
  id: string;
  timestamp: string;
  date: string;
  userQuery: string;
  aiResponse: string;
  riskBadge?: 'Low' | 'Moderate' | 'Urgent';
  sources?: string[];
  imageUrl?: string;
}

export type AuthResult = 'SUCCESS' | 'WRONG_EMAIL' | 'WRONG_PASSWORD' | 'WRONG_CREDENTIALS';

export interface RegistrationDetails {
  surname: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  username: string; // email
  password: string;
}

export interface NotificationToast {
  id: string;
  message: string;
  type: 'error' | 'success' | 'info';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string) => void;
  loginWithGoogleUser: (googleUser: { name: string; email: string; avatar?: string; googleId?: string }) => void;
  signup: (details: RegistrationDetails) => void;
  verifyAndLogin: (email: string, password: string) => AuthResult;
  logout: () => void;
  chatHistory: ChatHistoryItem[];
  addChatHistory: (query: string, response: string, riskBadge?: 'Low' | 'Moderate' | 'Urgent', sources?: string[], imageUrl?: string) => void;
  clearChatHistory: () => void;
  deleteHistoryItem: (id: string) => void;
  notifications: NotificationToast[];
  showNotification: (message: string, type?: 'error' | 'success' | 'info') => void;
  clearNotification: (id?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_ACCOUNTS: RegisteredAccount[] = [
  { surname: 'Kilaru', firstName: 'Sriram', lastName: 'Kumar', name: 'Kilaru Sriram Kumar', email: 'sriram@gmail.com', password: 'password123' },
  { surname: 'Demo', firstName: 'John', lastName: 'Doe', name: 'Demo John Doe', email: 'user@example.com', password: 'password123' },
  { surname: 'Health', firstName: 'Public', lastName: 'Member', name: 'Health Public Member', email: 'member@healthai.org', password: 'healthpass' }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('healthai_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [registeredAccounts, setRegisteredAccounts] = useState<RegisteredAccount[]>(() => {
    const saved = localStorage.getItem('healthai_registered_accounts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_ACCOUNTS;
      }
    }
    localStorage.setItem('healthai_registered_accounts', JSON.stringify(DEFAULT_ACCOUNTS));
    return DEFAULT_ACCOUNTS;
  });

  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);

  // Load chat history:
  // - Registered users: Persistent localStorage
  // - Guest users: Temporary sessionStorage (erased when website tab closes)
  useEffect(() => {
    if (user) {
      const historyKey = `healthai_chathistory_${user.email}`;
      const savedHistory = localStorage.getItem(historyKey);
      if (savedHistory) {
        try {
          setChatHistory(JSON.parse(savedHistory));
        } catch (e) {
          setChatHistory([]);
        }
      } else {
        setChatHistory([]);
      }
    } else {
      // Guest Mode: sessionStorage only!
      const savedSessionHistory = sessionStorage.getItem('healthai_chathistory_session');
      if (savedSessionHistory) {
        try {
          setChatHistory(JSON.parse(savedSessionHistory));
        } catch (e) {
          setChatHistory([]);
        }
      } else {
        setChatHistory([]);
      }
    }
  }, [user]);

  // Persist user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('healthai_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('healthai_user');
    }
  }, [user]);

  const saveAccountsToStorage = (accounts: RegisteredAccount[]) => {
    localStorage.setItem('healthai_registered_accounts', JSON.stringify(accounts));
  };

  const saveHistoryToStorage = (history: ChatHistoryItem[]) => {
    if (user) {
      // Registered User -> Persistent localStorage
      const key = `healthai_chathistory_${user.email}`;
      localStorage.setItem(key, JSON.stringify(history));
    } else {
      // Unregistered Guest -> Temporary sessionStorage (erased upon tab close!)
      sessionStorage.setItem('healthai_chathistory_session', JSON.stringify(history));
    }
  };

  const verifyAndLogin = (emailInput: string, passwordInput: string): AuthResult => {
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    if (!cleanEmail && !cleanPass) {
      return 'WRONG_CREDENTIALS';
    }

    const emailFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);
    if (!emailFormatValid && !cleanPass) {
      return 'WRONG_CREDENTIALS';
    }

    const account = registeredAccounts.find(acc => acc.email.toLowerCase() === cleanEmail);

    if (!account) {
      return 'WRONG_EMAIL';
    }

    if (account.password !== cleanPass) {
      return 'WRONG_PASSWORD';
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: account.name,
      surname: account.surname,
      firstName: account.firstName,
      lastName: account.lastName,
      gender: account.gender,
      dob: account.dob,
      email: account.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(account.email)}`,
      provider: 'email'
    };
    setUser(newUser);
    return 'SUCCESS';
  };

  const login = (email: string, name?: string) => {
    const userName = name || email.split('@')[0];
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userName.charAt(0).toUpperCase() + userName.slice(1),
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      provider: 'email'
    };
    setUser(newUser);
  };

  const signup = (details: RegistrationDetails) => {
    const formattedName = `${details.surname.trim()} ${details.firstName.trim()} ${details.lastName.trim()}`.trim();
    const cleanEmail = details.username.trim();

    const newAcc: RegisteredAccount = {
      surname: details.surname,
      firstName: details.firstName,
      lastName: details.lastName,
      gender: details.gender,
      dob: details.dob,
      name: formattedName,
      email: cleanEmail,
      password: details.password
    };

    const updatedAccounts = [...registeredAccounts.filter(a => a.email.toLowerCase() !== cleanEmail.toLowerCase()), newAcc];
    setRegisteredAccounts(updatedAccounts);
    saveAccountsToStorage(updatedAccounts);

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: formattedName,
      surname: details.surname,
      firstName: details.firstName,
      lastName: details.lastName,
      gender: details.gender,
      dob: details.dob,
      email: cleanEmail,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(cleanEmail)}`,
      provider: 'email'
    };
    setUser(newUser);
  };

  const loginWithGoogleUser = (googleUser: { name: string; email: string; avatar?: string; googleId?: string }) => {
    const newUser: User = {
      id: googleUser.googleId || `google-${Date.now()}`,
      name: googleUser.name,
      email: googleUser.email,
      avatar: googleUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(googleUser.email)}`,
      provider: 'google'
    };

    const exists = registeredAccounts.some(a => a.email.toLowerCase() === googleUser.email.toLowerCase());
    if (!exists) {
      const updatedAccounts = [...registeredAccounts, { name: googleUser.name, email: googleUser.email, password: 'google_oauth_user' }];
      setRegisteredAccounts(updatedAccounts);
      saveAccountsToStorage(updatedAccounts);
    }

    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const addChatHistory = (
    query: string, 
    response: string, 
    riskBadge?: 'Low' | 'Moderate' | 'Urgent', 
    sources?: string[],
    imageUrl?: string
  ) => {
    const now = new Date();
    const newItem: ChatHistoryItem = {
      id: `history-${Date.now()}`,
      timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: now.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      userQuery: query,
      aiResponse: response,
      riskBadge,
      sources,
      imageUrl
    };

    setChatHistory(prev => {
      const updated = [newItem, ...prev];
      saveHistoryToStorage(updated);
      return updated;
    });
  };

  const clearChatHistory = () => {
    setChatHistory([]);
    if (user) {
      const key = `healthai_chathistory_${user.email}`;
      localStorage.removeItem(key);
    } else {
      sessionStorage.removeItem('healthai_chathistory_session');
    }
  };

  const deleteHistoryItem = (id: string) => {
    setChatHistory(prev => {
      const updated = prev.filter(item => item.id !== id);
      saveHistoryToStorage(updated);
      return updated;
    });
  };

  const [notifications, setNotifications] = useState<NotificationToast[]>([]);

  const showNotification = (message: string, type: 'error' | 'success' | 'info' = 'error') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: NotificationToast = { id, message, type };
    setNotifications(prev => [...prev, newToast]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const clearNotification = (id?: string) => {
    if (id) {
      setNotifications(prev => prev.filter(t => t.id !== id));
    } else {
      setNotifications([]);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      loginWithGoogleUser,
      signup,
      verifyAndLogin,
      logout,
      chatHistory,
      addChatHistory,
      clearChatHistory,
      deleteHistoryItem,
      notifications,
      showNotification,
      clearNotification
    }}>
      {children}

      {/* Right Side Down (Bottom-Right) Toast Notifications Stack */}
      {notifications.length > 0 && (
        <div className="fixed bottom-6 right-6 z-[300] max-w-sm w-full flex flex-col gap-2.5 pointer-events-none">
          {notifications.map((notif) => (
            <div 
              key={notif.id}
              className="pointer-events-auto bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-red-500/50 flex items-start justify-between gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl flex-shrink-0 mt-0.5 ${
                  notif.type === 'error' ? 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-sm' :
                  notif.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm' :
                  'bg-blue-500/20 text-blue-400 border border-blue-500/40 shadow-sm'
                }`}>
                  {notif.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                  {notif.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {notif.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-red-400 mb-0.5">
                    {notif.type === 'error' ? 'Authentication Alert' : notif.type === 'success' ? 'Success' : 'Notification'}
                  </h4>
                  <p className="text-sm font-bold text-white leading-snug">
                    {notif.message}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => clearNotification(notif.id)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
