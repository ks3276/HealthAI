import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  X, 
  Trash2, 
  Clock, 
  MessageSquare, 
  Search, 
  ArrowRight, 
  User, 
  Bot,
  Lock,
  CheckCircle2
} from 'lucide-react';

interface ChatHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuery?: (query: string) => void;
}

export const ChatHistoryModal: React.FC<ChatHistoryModalProps> = ({ 
  isOpen, 
  onClose,
  onSelectQuery 
}) => {
  const { chatHistory, clearChatHistory, deleteHistoryItem, user } = useAuth();
  const { t } = useTheme();
  const [searchFilter, setSearchFilter] = useState('');

  if (!isOpen) return null;

  const filteredHistory = chatHistory.filter(item => 
    item.userQuery.toLowerCase().includes(searchFilter.toLowerCase()) ||
    item.aiResponse.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const getRiskBadgeStyle = (risk?: string) => {
    switch (risk) {
      case 'Urgent':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
      case 'Moderate':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      default:
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    }
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      alert('Only registered logged-in accounts can delete saved chat and image records!');
      return;
    }
    deleteHistoryItem(id);
  };

  const handleClearAll = () => {
    if (!user) {
      alert('Only registered logged-in accounts can delete saved chat and image records!');
      return;
    }
    if (window.confirm('Are you sure you want to clear all history?')) {
      clearChatHistory();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-health-500 to-health-accent flex items-center justify-center text-white shadow-md">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg flex items-center gap-2">
                {t('historyTitle')}
              </h3>
              <p className="text-xs text-slate-400">
                {user ? `Registered Account: ${user.name} (${user.email})` : `Guest Mode (Temporary Session)`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Account Storage Policy Banner */}
        <div className={`px-6 py-2.5 text-xs font-semibold flex items-center gap-2 ${
          user 
            ? 'bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
            : 'bg-amber-500/10 border-b border-amber-500/20 text-amber-600 dark:text-amber-400'
        }`}>
          {user ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Registered Account: History is saved permanently and can be deleted individually.</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>Unregistered Guest: Chats & images are saved temporarily until you close this website tab. Register an account to save & manage deletions.</span>
            </>
          )}
        </div>

        {/* Filter and Clear Toolbar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter past queries..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
            />
          </div>

          {chatHistory.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t('clearHistoryBtn')}</span>
            </button>
          )}
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="inline-flex p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                <MessageSquare className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {t('noHistory')}
              </p>
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-health-500/50 transition-all space-y-3 group"
              >
                {/* Top Info Bar */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-health-500" />
                    {item.date} • {item.timestamp}
                  </span>

                  <div className="flex items-center gap-2">
                    {item.riskBadge && (
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase border ${getRiskBadgeStyle(item.riskBadge)}`}>
                        {item.riskBadge}
                      </span>
                    )}

                    <button
                      onClick={(e) => handleDeleteItem(item.id, e)}
                      className="p-1 rounded text-slate-400 hover:text-red-500 transition-colors"
                      title="Delete item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* User Query */}
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.userQuery}
                  </div>
                </div>

                {/* AI Snippet Response */}
                <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  <div className="p-1.5 rounded-lg bg-health-500 text-white mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line flex-1 space-y-1.5">
                    <div className="line-clamp-3">{item.aiResponse}</div>
                    <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                      Note: This is only for your awareness purpose not for medication purpose. Please consult a certified doctor to get treatment.
                    </div>
                  </div>
                </div>

                {/* Reload Button */}
                {onSelectQuery && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        onSelectQuery(item.userQuery);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-health-500/10 hover:bg-health-500/20 text-health-600 dark:text-health-400 text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <span>{t('reloadQuery')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
