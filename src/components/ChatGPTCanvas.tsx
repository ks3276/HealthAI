import React, { useState } from 'react';
import { 
  Plus, 
  Mic, 
  ArrowUp
} from 'lucide-react';

interface ChatGPTCanvasProps {
  onSendQuery: (query: string) => void;
  onOpenSymptomChecker: () => void;
}

export const ChatGPTCanvas: React.FC<ChatGPTCanvasProps> = ({
  onSendQuery,
  onOpenSymptomChecker,
}) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSendQuery(query.trim());
    setQuery('');
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      onSendQuery('What are the symptoms and prevention tips for dengue fever?');
    }, 2500);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 py-8 max-w-4xl mx-auto w-full animate-in fade-in duration-300">
      
      {/* Centered Heading */}
      <div className="text-center space-y-3 mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Where should we begin?
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Ask any health question, disease symptoms, preventive guidelines, or public health information below.
        </p>
      </div>

      {/* Main Search/Prompt Box (Matching ChatGPT floating capsule bar) */}
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white dark:bg-slate-850 rounded-3xl p-3 border border-slate-200/80 dark:border-slate-750 shadow-xl focus-within:ring-2 focus-within:ring-health-500/40 transition-all flex items-center gap-2 mb-6"
      >
        {/* Plus / Attachment Button */}
        <button
          type="button"
          onClick={onOpenSymptomChecker}
          title="Symptom Checker & Triage"
          className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors flex-shrink-0"
        >
          <Plus className="w-5 h-5" />
        </button>

        {/* Prompt Input Field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Message HealthAI..."
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
              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
          }`}
        >
          <Mic className="w-5 h-5" />
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!query.trim()}
          className={`p-2.5 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
            query.trim()
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
              : 'bg-black text-white dark:bg-white dark:text-black opacity-90 hover:opacity-100'
          }`}
        >
          {query.trim() ? (
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

    </div>
  );
};
