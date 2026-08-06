import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Plus, 
  Image as ImageIcon, 
  BookOpen, 
  Zap, 
  Folder, 
  HelpCircle, 
  Search, 
  PanelLeftClose, 
  PanelLeft, 
  LogOut, 
  ChevronUp,
  Activity,
  Layers,
  Trash2,
  Lock
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenSymptomChecker: () => void;
  onOpenAuth: () => void;
  onOpenHistory: () => void;
  onNewChat: () => void;
  onSelectHistoryQuery: (query: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenSymptomChecker,
  onOpenAuth,
  onOpenHistory,
  onNewChat,
  onSelectHistoryQuery,
  isCollapsed,
  onToggleCollapse,
}) => {
  const { user, logout, chatHistory, deleteHistoryItem } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const defaultRecents = [
    'HealthAI Medication Safety',
    'AI Public Health Website',
    'Image Ideas for Health Tech',
    'AI Public Health Chatbot',
    'Dengue & Malaria Prevention',
    'Rural Health & Telemedicine App'
  ];

  const recentsToDisplay = chatHistory.length > 0
    ? chatHistory
    : defaultRecents.map((q, idx) => ({ id: `default-${idx}`, userQuery: q }));

  const getUserInitials = (name: string) => {
    if (!name) return 'AI';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleDeleteRecent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      alert('Only registered logged-in accounts can delete saved chat and image records!');
      return;
    }
    deleteHistoryItem(id);
  };

  return (
    <aside 
      className={`fixed top-0 left-0 bottom-0 z-40 bg-slate-100/90 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top Header: Logo & Collapse Toggle */}
      <div className="p-3.5 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50">
        {!isCollapsed && (
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onSelectTab('home')}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-health-500 to-health-accent text-white flex items-center justify-center shadow-md">
              <Activity className="w-4 h-4 animate-pulse" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              Health<span className="gradient-text">AI</span>
            </span>
          </div>
        )}

        <div className="flex items-center gap-1 mx-auto sm:mx-0">
          {!isCollapsed && (
            <button
              onClick={onOpenHistory}
              title="Search Chat History"
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onToggleCollapse}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors"
          >
            {isCollapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={onNewChat}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-900 dark:text-white font-semibold text-xs shadow-sm hover:bg-slate-50 dark:hover:bg-slate-750 transition-all ${
            isCollapsed ? 'justify-center px-0' : 'justify-start'
          }`}
        >
          <Plus className="w-4 h-4 text-health-500 flex-shrink-0" />
          {!isCollapsed && <span>New chat</span>}
        </button>
      </div>

      {/* Navigation Tools Items (Exact Requested Order) */}
      <div className="px-2 py-1 space-y-1">
        
        {/* 1. Images Page */}
        <button
          onClick={() => onSelectTab('images')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'images'
              ? 'bg-slate-200/80 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
          } ${isCollapsed ? 'justify-center px-0' : ''}`}
        >
          <ImageIcon className="w-4 h-4 text-purple-500 flex-shrink-0" />
          {!isCollapsed && <span>Images</span>}
        </button>

        {/* 2. Features Page */}
        <button
          onClick={() => onSelectTab('features')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'features'
              ? 'bg-slate-200/80 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
          } ${isCollapsed ? 'justify-center px-0' : ''}`}
        >
          <Layers className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          {!isCollapsed && <span>Features</span>}
        </button>

        {/* 3. Health Guides Page (Upper Position of Symptom Triage) */}
        <button
          onClick={() => onSelectTab('tips')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'tips'
              ? 'bg-slate-200/80 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
          } ${isCollapsed ? 'justify-center px-0' : ''}`}
        >
          <Folder className="w-4 h-4 text-indigo-500 flex-shrink-0" />
          {!isCollapsed && <span>Health Guides</span>}
        </button>

        {/* 4. Symptom Triage Tool */}
        <button
          onClick={onOpenSymptomChecker}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white transition-all ${
            isCollapsed ? 'justify-center px-0' : ''
          }`}
        >
          <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
          {!isCollapsed && <span>Symptom Triage</span>}
        </button>

        {/* 5. Diseases Page (In between Symptom Triage & Mostly Asked Questions) */}
        <button
          onClick={() => onSelectTab('diseases')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'diseases'
              ? 'bg-slate-200/80 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
          } ${isCollapsed ? 'justify-center px-0' : ''}`}
        >
          <BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0" />
          {!isCollapsed && <span>Diseases</span>}
        </button>

        {/* 6. Mostly Asked Questions Page */}
        <button
          onClick={() => onSelectTab('faq')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'faq'
              ? 'bg-slate-200/80 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
          } ${isCollapsed ? 'justify-center px-0' : ''}`}
        >
          <HelpCircle className="w-4 h-4 text-cyan-500 flex-shrink-0" />
          {!isCollapsed && <span>Mostly Asked Questions</span>}
        </button>
      </div>

      {/* Recents Section */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 border-t border-slate-200/60 dark:border-slate-800/60 mt-2">
          <div className="px-2 py-1 flex items-center justify-between text-[11px] font-extrabold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
            <span>Recents</span>
            <button onClick={onOpenHistory} className="hover:text-health-500 transition-colors">View All</button>
          </div>

          <div className="space-y-0.5">
            {recentsToDisplay.slice(0, 9).map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                onClick={() => onSelectHistoryQuery(item.userQuery)}
                className="w-full group/item flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <span className="truncate flex-1">{item.userQuery}</span>
                {user ? (
                  <button
                    onClick={(e) => handleDeleteRecent(item.id, e)}
                    className="p-1 opacity-0 group-hover/item:opacity-100 hover:text-red-500 transition-opacity"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-red-500" />
                  </button>
                ) : (
                  <Lock title="Guest Temporary Session (Erased on tab close)" className="w-3 h-3 text-slate-400 opacity-40" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer User Profile (Only rendered if user is logged in) */}
      {user && (
        <div className="p-3 border-t border-slate-200/80 dark:border-slate-800 relative mt-auto">
          {!isCollapsed ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="w-full flex items-center justify-between p-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all text-left shadow-sm"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-health-500 to-health-accent text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {getUserInitials(user.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate block">
                      {user.email}
                    </span>
                  </div>
                </div>
                <ChevronUp className={`w-4 h-4 text-slate-400 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown Menu */}
              {showUserDropdown && (
                <div className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 space-y-1 animate-in zoom-in-95 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</div>
                    <div className="text-[10px] text-slate-400">{user.email}</div>
                    <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full bg-health-500/10 text-health-600 dark:text-health-400 text-[10px] font-bold">
                      Free Account
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onOpenHistory();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Chat History</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div 
                onClick={onOpenAuth}
                title={user.name}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-health-500 to-health-accent text-white flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                {getUserInitials(user.name)}
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
