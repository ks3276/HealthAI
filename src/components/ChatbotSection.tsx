import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Bot, 
  User, 
  RotateCcw, 
  Download, 
  CheckCircle2,
  Brain,
  HelpCircle,
  Copy,
  Check,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  sources?: string[];
  riskBadge?: 'Low' | 'Moderate' | 'Urgent';
}

interface ChatbotSectionProps {
  onOpenHistory?: () => void;
  initialQuery?: string;
}

export const ChatbotSection: React.FC<ChatbotSectionProps> = ({ onOpenHistory, initialQuery }) => {
  const { addChatHistory, user } = useAuth();
  const { t, speakText, isTtsEnabled, toggleTts, language } = useTheme();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'Hello! I am HealthAI, your 24/7 Public Health Assistant. Ask me about disease symptoms, preventive guidelines, vaccination schedules, or health tips.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['WHO Public Health Repository', 'CDC Prevention Guidelines']
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const processedQueryRef = useRef<string | null>(null);
  const isSendingRef = useRef(false);

  const sampleQuestions = [
    'What are dengue symptoms?',
    'How to prevent malaria?',
    'What vaccines are recommended?',
    'How can I reduce diabetes risk?',
    'What should I do if I have a fever?'
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialQuery && processedQueryRef.current !== initialQuery) {
      processedQueryRef.current = initialQuery;
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  const generateAIResponse = (userText: string) => {
    const textLower = userText.toLowerCase();

    if (language === 'te') {
      if (textLower.includes('dengue') || textLower.includes('డెంగ్యూ')) {
        return {
          text: `**డెంగ్యూ జ్వరం నివారణ మరియు లక్షణాల మార్గదర్శకం:**\n\n• **ముఖ్య లక్షణాలు:** తీవ్రమైన జ్వరం (104°F), తీవ్రమైన తలనొప్పి/కళ్ల నొప్పులు, కీళ్ల నొప్పులు మరియు దద్దుర్లు.\n• **వ్యాప్తి:** ఆడ ఎడిస్ దోమల ద్వారా వ్యాపిస్తుంది.\n• **నివారణ:** నిలిచి ఉన్న నీటిని తొలగించండి, కాళ్లు చేతులు పూర్తిగా కప్పే దుస్తులు ధరించండి.\n\n⚠️ *హెచ్చరిక:* తీవ్రమైన కడుపు నొప్పి లేదా వాంతులు ఉంటే వెంటనే ఆసుపత్రికి వెళ్ళండి.`,
          sources: ['WHO డెంగ్యూ సమాచారం 2026', 'CDC నివారణ మార్గదర్శకాలు'],
          riskBadge: 'Moderate' as const
        };
      }
      if (textLower.includes('malaria') || textLower.includes('మలేరియా')) {
        return {
          text: `**మలేరియా అవగాహన మరియు రక్షణ:**\n\n• **లక్షణాలు:** చలితో కూడిన జ్వరం, అధికంగా చెమటలు పట్టడం మరియు శరీర బలహీనత.\n• **నివారణ:** దోమతెరలను (ITNs) ఉపయోగించండి మరియు పరిసరాలను పరిశుభ్రంగా ఉంచుకోండి.\n• **చర్య:** పదే పదే జ్వరం వస్తుంటే వెంటనే రక్త పరీక్ష చేయించుకోండి.`,
          sources: ['ప్రపంచ మలేరియా నివేదిక', 'CDC మలేరియా నియంత్రణ'],
          riskBadge: 'Moderate' as const
        };
      }
      if (textLower.includes('fever') || textLower.includes('జ్వరం')) {
        return {
          text: `**జ్వరం సంరక్షణ ప్రోటోకాల్:**\n\n1. **ద్రవ పదార్థాలు:** మంచినీరు, ORS మరియు వేడి సూప్‌లు తీసుకోండి.\n2. **విశ్రాంతి:** చల్లని మరియు గాలి వెలుతురు ఉన్న గదిలో విశ్రాంతి తీసుకోండి.\n3. **పరిశీలన:** ప్రతి 4 గంటలకు ఒకసారి శరీర ఉష్ణోగ్రతను తనిఖీ చేయండి.\n\n⚠️ **అత్యవసర చికిత్స అవసరం:** 3 రోజుల కంటే ఎక్కువ జ్వరం ఉంటే లేదా శ్వాస తీసుకోవడంలో ఇబ్బంది ఉంటే వెంటనే డాక్టర్‌ని కలవండి.`,
          sources: ['CDC జ్వరం నివారణ మార్గదర్శకాలు'],
          riskBadge: 'Urgent' as const
        };
      }
      return {
        text: `మీ ప్రశ్న **"${userText}"** కి ధన్యవాదాలు.\n\nప్రజా ఆరోగ్య సమాచారం ప్రకారం, పరిశుభ్రత పాటించడం, పోషకాహారం తీసుకోవడం మరియు క్రమం తప్పకుండా నీరు తాగడం వల్ల రోగనిరోధక శక్తి పెరుగుతుంది.\n\nప్రత్యేక లక్షణాల తనిఖీ కోసం మా **లక్షణాల తనిఖీ** సాధనాన్ని ఉపయోగించండి లేదా అర్హత కలిగిన వైద్యుడిని సంప్రదించండి.`,
        sources: ['హెల్త్-AI ధృవీకరించబడిన వైద్య సమాచారం', 'WHO ప్రజా ఆరోగ్య లైబ్రరీ'],
        riskBadge: 'Low' as const
      };
    }

    // Dengue
    if (textLower.includes('dengue')) {
      return {
        text: `**Dengue Fever Prevention & Symptoms Guide:**\n\n• **Key Symptoms:** High Fever (104°F), Severe Headache/Eye Pain, Joint/Muscle Pain, and Rash.\n• **Transmission:** Transmitted by female Aedes mosquitoes.\n• **Prevention:** Eliminate standing water around containers, wear long sleeves, and apply DEET repellent.\n\n⚠️ *Red Flag:* Severe abdominal pain or persistent vomiting requires immediate hospital care.`,
        sources: ['WHO Dengue Fact Sheet 2026', 'CDC Vector Control Guidelines'],
        riskBadge: 'Moderate' as const
      };
    }

    // Malaria
    if (textLower.includes('malaria')) {
      return {
        text: `**Malaria Awareness & Protection:**\n\n• **Symptoms:** Cyclic high fever, intense chills, profuse sweating, and muscle weakness.\n• **Prevention:** Sleep under insecticide-treated bed nets (ITNs), use spatial repellents, and take prescribed antimalarial prophylaxis if traveling.\n• **Action:** Seek prompt blood smear testing if experiencing recurring fever cycles in endemic zones.`,
        sources: ['World Malaria Report', 'CDC Malaria Control'],
        riskBadge: 'Moderate' as const
      };
    }

    // Vaccines
    if (textLower.includes('vaccin') || textLower.includes('immuniz')) {
      return {
        text: `**Immunization & Vaccine Roadmap:**\n\n• **Infants & Children:** DTP, MMR, Polio, and Hepatitis B.\n• **Adults & Seniors:** Annual Seasonal Flu, Tdap booster every 10 years, and Pneumococcal vaccine.\n• **Safety:** Modern vaccines undergo rigorous clinical safety monitoring.`,
        sources: ['Global Immunization Schedule', 'WHO Vaccine Safetynet'],
        riskBadge: 'Low' as const
      };
    }

    // Diabetes
    if (textLower.includes('diabe') || textLower.includes('sugar')) {
      return {
        text: `**Diabetes Management & Lifestyle Prevention:**\n\n• **Diet:** Choose low-glycemic foods, whole grains, and leafy vegetables.\n• **Exercise:** Engage in at least 150 minutes of moderate aerobic activity per week.\n• **Monitoring:** Check HbA1c levels regularly if diagnosed or pre-diabetic.`,
        sources: ['International Diabetes Federation', 'CDC Diabetes Guidance'],
        riskBadge: 'Low' as const
      };
    }

    // Fever / High Temperature
    if (textLower.includes('fever') || textLower.includes('temp')) {
      return {
        text: `**Fever Care Protocol & Triage:**\n\n1. **Hydration:** Consume fluids, electrolyte solutions (ORS), and warm soups.\n2. **Rest:** Allow the body to rest in a cool, well-ventilated room.\n3. **Monitoring:** Track temperature every 4 hours.\n\n⚠️ **When to seek Emergency Care (Call 911/112):**\n- Fever exceeding 103°F (39.4°C) lasting over 3 days\n- Stiff neck, severe breathing difficulty, or altered mental state.`,
        sources: ['CDC Fever Triage Guide', 'NHS Medical Guidelines'],
        riskBadge: 'Urgent' as const
      };
    }

    // Default intelligent fall-back
    return {
      text: `Thank you for your inquiry about **"${userText}"**.\n\nBased on public health records, maintaining proper hygiene, eating balanced nutrients, staying hydrated, and keeping vaccinations current are vital for boosting immunity.\n\nFor specific symptom screening, please use our **Symptom Checker** tool or consult a licensed healthcare professional.`,
      sources: ['HealthAI Verified Medical Repository', 'WHO Public Health Library'],
      riskBadge: 'Low' as const
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isSendingRef.current) return;

    isSendingRef.current = true;

    const userMessage: Message = {
      id: `${Date.now()}-${Math.random()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const responseData = generateAIResponse(query);
      const aiMessage: Message = {
        id: `${Date.now() + 1}-${Math.random()}`,
        sender: 'ai',
        text: responseData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: responseData.sources,
        riskBadge: responseData.riskBadge
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      isSendingRef.current = false;

      // Save to Auth Chat History
      addChatHistory(query, responseData.text, responseData.riskBadge, responseData.sources);

      speakText(responseData.text);
    }, 1000);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input simulation: Listening for 3 seconds...');
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        handleSend('What are the symptoms of dengue fever?');
      }, 3000);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputQuery(transcript);
      handleSend(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-1',
        sender: 'ai',
        text: 'Chat history cleared. How can HealthAI assist your public health awareness today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const exportChat = () => {
    const chatText = messages.map(m => `[${m.timestamp}] ${m.sender.toUpperCase()}: ${m.text}`).join('\n\n');
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'HealthAI-Chat-Export.txt';
    a.click();
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  return (
    <section id="chatbot" className="py-20 bg-slate-100/80 dark:bg-slate-950 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-health-500/10 text-health-600 dark:text-health-400 text-xs font-extrabold uppercase tracking-wider">
            <Brain className="w-4 h-4 text-health-500" />
            <span>{t('heroTag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('chatbotTitle')}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            {t('chatbotSubtitle')}
          </p>
        </div>

        {/* Main Chat Console Window */}
        <div className="glass-card rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col h-[650px] bg-white dark:bg-slate-900">
          
          {/* Chat Console Top Bar */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-health-500 to-health-accent flex items-center justify-center text-white shadow-md">
                  <Bot className="w-6 h-6 animate-pulse" />
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm">{t('chatbotHeaderTitle')}</h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {t('chatbotHeaderStatus')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {user ? `Connected as ${user.name}` : 'WHO & CDC Verified Knowledge Base'}
                </p>
              </div>
            </div>

            {/* Top Toolbar Controls */}
            <div className="flex items-center gap-2">
              {onOpenHistory && (
                <button
                  onClick={onOpenHistory}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title={t('historyBtn')}
                >
                  <Clock className="w-4 h-4 text-health-500" />
                  <span className="hidden sm:inline">{t('historyBtn')}</span>
                </button>
              )}

              <button
                onClick={toggleTts}
                className={`p-2 rounded-xl text-xs transition-colors ${
                  isTtsEnabled ? 'bg-slate-800 text-cyan-400 font-bold' : 'bg-slate-800/50 text-slate-500'
                }`}
                title={isTtsEnabled ? 'Text-to-Speech Enabled' : 'Text-to-Speech Muted'}
              >
                {isTtsEnabled ? <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={clearChat}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                title={t('clearChat')}
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={exportChat}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                title={t('exportChat')}
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Messages Scroll Container */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/50">
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white ${
                  msg.sender === 'user' 
                    ? 'bg-slate-800 dark:bg-slate-700' 
                    : 'bg-gradient-to-tr from-health-500 to-health-accent'
                }`}>
                  {msg.sender === 'user' ? (
                    user ? <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-xl object-cover" /> : <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`rounded-2xl p-4 shadow-sm text-sm space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-health-500 text-white rounded-tr-none'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                }`}>
                  
                  {/* Text Content */}
                  <div className="whitespace-pre-line leading-relaxed">
                    {msg.text}
                  </div>

                  {/* Sources & Risk Badge if AI */}
                  {msg.sender === 'ai' && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                      
                      {msg.sources && (
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-health-accent" />
                          <span>Sources: {msg.sources.join(', ')}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyToClipboard(msg.id, msg.text)}
                          className="hover:text-health-500 transition-colors p-1"
                          title="Copy Message"
                        >
                          {copiedMessageId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <span className="text-[10px]">{msg.timestamp}</span>
                      </div>

                    </div>
                  )}

                  {msg.sender === 'user' && (
                    <div className="text-[10px] text-right opacity-80">{msg.timestamp}</div>
                  )}
                </div>

              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-health-500 to-health-accent text-white flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-health-500 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-health-500 animate-bounce delay-150"></span>
                  <span className="w-2 h-2 rounded-full bg-health-500 animate-bounce delay-300"></span>
                  <span className="ml-2 font-mono text-[11px]">HealthAI is searching clinical records...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Suggested Quick Question Chips */}
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 overflow-x-auto flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 whitespace-nowrap">
              <HelpCircle className="w-3 h-3 text-health-500" /> {t('samplePromptTitle')}
            </span>
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 hover:border-health-500 hover:text-health-600 transition-all whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Console */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              {/* Voice Button */}
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`p-3 rounded-2xl border transition-all ${
                  isListening 
                    ? 'bg-red-500 text-white border-red-500 animate-pulse' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                }`}
                title="Voice Input"
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-health-500" />}
              </button>

              {/* Input Text Box */}
              <input
                type="text"
                placeholder={t('chatPlaceholder')}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-health-500"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputQuery.trim() || isTyping}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-health-500 to-health-accent hover:from-health-600 hover:to-health-emerald text-white font-bold text-sm shadow-md shadow-health-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
              >
                <span>{t('send')}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-2 text-[10px] text-center text-slate-400">
              {t('disclaimer')}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
