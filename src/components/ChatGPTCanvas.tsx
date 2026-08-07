import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Mic, 
  ArrowUp,
  Brain,
  Zap,
  Sparkles,
  Thermometer,
  Wind,
  ShieldAlert,
  Droplets,
  Image as ImageIcon,
  FileText,
  Paperclip,
  Clipboard,
  X
} from 'lucide-react';

interface ChatGPTCanvasProps {
  onSendQuery: (query: string, imageUrl?: string) => void;
  onOpenSymptomChecker: () => void;
}

export const ChatGPTCanvas: React.FC<ChatGPTCanvasProps> = ({
  onSendQuery,
  onOpenSymptomChecker,
}) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showInsertMenu, setShowInsertMenu] = useState(false);
  const [insertedAttachment, setInsertedAttachment] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanText = query.trim();
    const finalQuery = cleanText || (insertedAttachment ? `[Attachment: ${insertedAttachment}] Please analyze this health condition image.` : '');

    if (!finalQuery && !imagePreviewUrl) return;

    onSendQuery(finalQuery, imagePreviewUrl || undefined);
    setQuery('');
    setInsertedAttachment(null);
    setImagePreviewUrl(null);
    setShowInsertMenu(false);
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      onSendQuery('What are the symptoms and prevention tips for dengue fever?');
    }, 2500);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'doc') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'image') {
        const reader = new FileReader();
        reader.onload = (ev) => setImagePreviewUrl(ev.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        setImagePreviewUrl(null);
      }
      setInsertedAttachment(`${type === 'image' ? 'Image' : 'Doc'} (${file.name})`);
      setShowInsertMenu(false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setImagePreviewUrl(event.target?.result as string);
          };
          reader.readAsDataURL(file);
          setInsertedAttachment(`Pasted Image (${file.name || 'clipboard.png'})`);
          break;
        }
      }
    }
  };

  const handlePasteFromClipboardMenu = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.read) {
        const items = await navigator.clipboard.read();
        for (const item of items) {
          const imageType = item.types.find(t => t.startsWith('image/'));
          if (imageType) {
            const blob = await item.getType(imageType);
            const reader = new FileReader();
            reader.onload = (event) => {
              setImagePreviewUrl(event.target?.result as string);
            };
            reader.readAsDataURL(blob);
            setInsertedAttachment(`Pasted Image (clipboard.png)`);
            setShowInsertMenu(false);
            return;
          }
        }
      }
      fileInputRef.current?.click();
    } catch {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 py-8 max-w-4xl mx-auto w-full animate-in fade-in duration-300">
      
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileSelect(e, 'image')}
      />
      <input
        type="file"
        ref={docInputRef}
        accept=".pdf,.doc,.docx,.txt,image/*"
        className="hidden"
        onChange={(e) => handleFileSelect(e, 'doc')}
      />

      {/* Centered Heading */}
      <div className="text-center space-y-3 mb-8 flex flex-col items-center">
        {/* Badge Pill */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-health-500/10 dark:bg-health-500/20 text-health-600 dark:text-health-400 text-[11px] font-extrabold uppercase tracking-wider mb-1 border border-health-500/20 shadow-sm">
          <Brain className="w-3.5 h-3.5" />
          <span>24/7 AI HEALTH PROBLEM SOLUTIONS PLATFORM</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          24×7 HealthAI Assistant
        </h1>

        {/* Subtitle */}
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
          Describe any health problem or paste an image to get immediate, verified step-by-step solutions.
        </p>
      </div>

      {/* Attachment Tag Pill if File/Image Inserted */}
      {insertedAttachment && (
        <div className="w-full max-w-2xl mb-2 flex items-center gap-2">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-health-500/15 border border-health-500/30 text-health-600 dark:text-health-400 text-xs font-bold shadow-sm">
            {imagePreviewUrl ? (
              <img 
                src={imagePreviewUrl} 
                alt="Pasted Preview" 
                className="w-8 h-8 rounded-lg object-cover border border-health-500/40 shadow-xs" 
              />
            ) : (
              <Paperclip className="w-3.5 h-3.5 text-health-500" />
            )}
            <span>Inserted: {insertedAttachment}</span>
            <button 
              type="button" 
              onClick={() => {
                setInsertedAttachment(null);
                setImagePreviewUrl(null);
              }}
              className="p-0.5 hover:bg-health-500/20 rounded-md ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Search/Prompt Box (Matching ChatGPT floating capsule bar) */}
      <form 
        onSubmit={handleSubmit}
        className="relative w-full max-w-2xl bg-white dark:bg-[#212121] rounded-3xl p-3 border border-slate-200/80 dark:border-[#2f2f2f] shadow-xl focus-within:ring-2 focus-within:ring-health-500/40 transition-all flex items-center gap-2 mb-6"
      >
        {/* Insert Option Menu Container */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowInsertMenu(!showInsertMenu)}
            title="Insert Options (Paste Image, Upload Photo, Document)"
            className={`p-2.5 rounded-full transition-all flex-shrink-0 ${
              showInsertMenu 
                ? 'bg-health-500 text-white rotate-45 shadow-md' 
                : 'hover:bg-slate-100 dark:hover:bg-[#2f2f2f] text-slate-500 dark:text-slate-400'
            }`}
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Insert Options Popup Menu */}
          {showInsertMenu && (
            <div className="absolute bottom-14 left-0 w-64 bg-white dark:bg-[#1f1f1f] rounded-2xl p-2 shadow-2xl border border-slate-200 dark:border-[#2f2f2f] z-50 animate-in slide-in-from-bottom-3 duration-200 space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                Insert Options
              </div>

              {/* 1. Paste Image from Clipboard */}
              <button
                type="button"
                onClick={handlePasteFromClipboardMenu}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2a2a2a] transition-all"
              >
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Clipboard className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-bold">Paste Image from Clipboard</div>
                  <div className="text-[10px] text-slate-400">Paste copied image (Ctrl+V)</div>
                </div>
              </button>

              {/* 2. Insert Image File */}
              <button
                type="button"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2a2a2a] transition-all"
              >
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-500">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-bold">Insert Image / Photo</div>
                  <div className="text-[10px] text-slate-400">Skin rash, wound, or medicine</div>
                </div>
              </button>

              {/* 3. Insert Medical Document */}
              <button
                type="button"
                onClick={() => {
                  docInputRef.current?.click();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2a2a2a] transition-all"
              >
                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-bold">Insert Document / Report</div>
                  <div className="text-[10px] text-slate-400">Lab report or prescription PDF</div>
                </div>
              </button>

              {/* 4. Insert Symptom Triage */}
              <button
                type="button"
                onClick={() => {
                  setShowInsertMenu(false);
                  onOpenSymptomChecker();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2a2a2a] transition-all"
              >
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-bold">Insert Symptom Triage</div>
                  <div className="text-[10px] text-slate-400">Interactive symptom screener</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Prompt Input Field with Paste Event Handler */}
        <input
          type="text"
          value={query}
          onPaste={handlePaste}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your health problem or paste image (Ctrl+V)..."
          className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm font-medium px-2"
        />

        {/* Voice Input Mic Button */}
        <button
          type="button"
          onClick={handleVoiceInput}
          title={isListening ? "Listening..." : "Voice Input"}
          className={`p-2.5 rounded-full transition-colors flex-shrink-0 ${
            isListening 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'hover:bg-slate-100 dark:hover:bg-[#2f2f2f] text-slate-500 dark:text-slate-400'
          }`}
        >
          <Mic className="w-5 h-5" />
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!query.trim() && !insertedAttachment}
          className={`p-2.5 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
            (query.trim() || insertedAttachment)
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
              : 'bg-black text-white dark:bg-white dark:text-black opacity-90 hover:opacity-100'
          }`}
        >
          {(query.trim() || insertedAttachment) ? (
            <ArrowUp className="w-5 h-5" />
          ) : (
            <div className="w-5 h-5 flex items-center justify-center gap-0.5">
              <span className="w-1 h-3 bg-current rounded-full animate-bounce"></span>
              <span className="w-1 h-4 bg-current rounded-full animate-bounce delay-100"></span>
              <span className="w-1 h-2 bg-current rounded-full animate-bounce delay-200"></span>
            </div>
          )}
        </button>
      </form>

      {/* #1 PRIMARY FEATURE: Health Problem Solutions Action Cards */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-black uppercase tracking-wider text-health-600 dark:text-health-400 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>#1 MAIN: Immediate Action First Aid Protocols</span>
          </span>
          <span className="text-[11px] font-bold text-slate-400">First 60-Second Steps</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => onSendQuery('How to stop bleeding immediately from cut wound')}
            className="p-3.5 rounded-2xl bg-white dark:bg-[#212121] border border-red-500/30 hover:border-red-500/60 text-left transition-all group shadow-sm flex items-start gap-3"
          >
            <div className="p-2 rounded-xl bg-red-500/10 text-red-500 flex-shrink-0 group-hover:scale-110 transition-transform">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-red-500 transition-colors">
                🩸 How to Stop Bleeding Immediately
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                Direct firm pressure, elevation & emergency triage
              </p>
            </div>
          </button>
          <button
            onClick={() => onSendQuery('i am getting ichting AT under arrms what we have to do')}
            className="p-3.5 rounded-2xl bg-white dark:bg-[#212121] border border-slate-200/80 dark:border-[#2f2f2f] hover:border-health-500/50 text-left transition-all group shadow-sm flex items-start gap-3"
          >
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 flex-shrink-0 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-health-500 transition-colors">
                Underarm & Skin Itching Solution
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                Step-by-step hygiene, soothing & pre-doctor process
              </p>
            </div>
          </button>

          <button
            onClick={() => onSendQuery('What is the step by step process to follow for fever before meeting doctor')}
            className="p-3.5 rounded-2xl bg-white dark:bg-[#212121] border border-slate-200/80 dark:border-[#2f2f2f] hover:border-health-500/50 text-left transition-all group shadow-sm flex items-start gap-3"
          >
            <div className="p-2 rounded-xl bg-red-500/10 text-red-500 flex-shrink-0 group-hover:scale-110 transition-transform">
              <Thermometer className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-health-500 transition-colors">
                Fever & High Temp Care Plan
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                Temperature tiers, cooling & safe Paracetamol steps
              </p>
            </div>
          </button>

          <button
            onClick={() => onSendQuery('What is the step by step process for severe cough, cold and sore throat')}
            className="p-3.5 rounded-2xl bg-white dark:bg-[#212121] border border-slate-200/80 dark:border-[#2f2f2f] hover:border-health-500/50 text-left transition-all group shadow-sm flex items-start gap-3"
          >
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 flex-shrink-0 group-hover:scale-110 transition-transform">
              <Wind className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-health-500 transition-colors">
                Cough, Cold & Throat Solution
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                Steam inhalation, gargles & respiratory triage
              </p>
            </div>
          </button>

          <button
            onClick={() => onSendQuery('What is the step by step process for stomach pain and acid reflux')}
            className="p-3.5 rounded-2xl bg-white dark:bg-[#212121] border border-slate-200/80 dark:border-[#2f2f2f] hover:border-health-500/50 text-left transition-all group shadow-sm flex items-start gap-3"
          >
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-health-500 transition-colors">
                Stomach & Digestive Care Plan
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                ORS electrolyte sips, BRAT diet & cramping relief
              </p>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
};
