import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';
import { ChatGPTHeader } from './components/ChatGPTHeader';
import { ChatGPTCanvas } from './components/ChatGPTCanvas';
import { Features } from './components/Features';
import { ImagesSection } from './components/ImagesSection';
import { HowItWorks } from './components/HowItWorks';
import { DiseasesSection } from './components/DiseasesSection';
import { ChatbotSection } from './components/ChatbotSection';
import { HealthTipsSection } from './components/HealthTipsSection';
import { StatisticsSection } from './components/StatisticsSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SymptomCheckerModal } from './components/SymptomCheckerModal';
import { AuthModal } from './components/AuthModal';
import { ChatHistoryModal } from './components/ChatHistoryModal';

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('chatbot');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const [isSymptomCheckerOpen, setIsSymptomCheckerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedHistoryQuery, setSelectedHistoryQuery] = useState<string | undefined>();

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReloadQueryInChat = (query: string) => {
    setSelectedHistoryQuery(query);
    setActiveTab('chatbot');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewChat = () => {
    setSelectedHistoryQuery(undefined);
    setActiveTab('chatbot');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans flex">
      
      {/* ChatGPT-style Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenSymptomChecker={() => setIsSymptomCheckerOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onNewChat={handleNewChat}
        onSelectHistoryQuery={handleReloadQueryInChat}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Workspace Right Canvas Area */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        {/* Top Header Bar */}
        <ChatGPTHeader
          onOpenSymptomChecker={() => setIsSymptomCheckerOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenHistory={() => setIsHistoryOpen(true)}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        {/* Main Content View per Tab */}
        <main className="flex-1 flex flex-col min-w-0">
          <div key={activeTab} className="animate-in fade-in duration-200 flex-1 flex flex-col">
            
            {activeTab === 'chatbot' && (
              <div className="flex-1 flex flex-col justify-between">
                {!selectedHistoryQuery ? (
                  <ChatGPTCanvas
                    onSendQuery={handleReloadQueryInChat}
                    onOpenSymptomChecker={() => setIsSymptomCheckerOpen(true)}
                  />
                ) : (
                  <ChatbotSection
                    onOpenHistory={() => setIsHistoryOpen(true)}
                    initialQuery={selectedHistoryQuery}
                  />
                )}
              </div>
            )}

            {activeTab === 'images' && (
              <div>
                <ImagesSection />
              </div>
            )}

            {activeTab === 'home' && (
              <div>
                <ChatGPTCanvas
                  onSendQuery={handleReloadQueryInChat}
                  onOpenSymptomChecker={() => setIsSymptomCheckerOpen(true)}
                />
                <HowItWorks />
                <StatisticsSection />
                <WhyChooseUsSection />
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <Features onOpenSymptomChecker={() => setIsSymptomCheckerOpen(true)} />
                <WhyChooseUsSection />
              </div>
            )}

            {activeTab === 'diseases' && (
              <div>
                <DiseasesSection />
              </div>
            )}

            {activeTab === 'tips' && (
              <div>
                <HealthTipsSection />
              </div>
            )}

            {activeTab === 'faq' && (
              <div>
                <FAQSection />
              </div>
            )}

            {activeTab === 'contact' && (
              <div>
                <ContactSection />
              </div>
            )}

          </div>
        </main>

        {/* Footer (Hidden on New Chat / Chatbot tab) */}
        {activeTab !== 'chatbot' && (
          <Footer onSelectTab={handleSelectTab} />
        )}

      </div>

      {/* Interactive Modals */}
      <SymptomCheckerModal
        isOpen={isSymptomCheckerOpen}
        onClose={() => setIsSymptomCheckerOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <ChatHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectQuery={handleReloadQueryInChat}
      />

    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
