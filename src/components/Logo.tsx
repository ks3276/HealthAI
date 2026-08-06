import React from 'react';
import { HeartPulse, Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTag?: boolean;
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTag = false,
  className = '',
  variant = 'auto'
}) => {
  const iconContainerSizes = {
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-10 h-10 rounded-2xl',
    lg: 'w-12 h-12 rounded-2xl',
  };

  const mainIconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const sparkleIconSizes = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const textColor = variant === 'light' 
    ? 'text-white' 
    : variant === 'dark' 
    ? 'text-slate-900' 
    : 'text-slate-900 dark:text-white';

  return (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      {/* Icon Badge */}
      <div className={`relative flex items-center justify-center ${iconContainerSizes[size]} bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25 group-hover:scale-105 group-hover:shadow-emerald-500/40 transition-all duration-300`}>
        <HeartPulse className={`${mainIconSizes[size]} animate-pulse`} />
        <Sparkles className={`${sparkleIconSizes[size]} absolute -top-1 -right-1 text-amber-300 animate-spin`} style={{ animationDuration: '5s' }} />
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900 shadow-sm"></span>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className={`font-extrabold ${textSizes[size]} tracking-tight ${textColor} flex items-center gap-1.5`}>
          <span>Health</span>
          <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
            AI
          </span>
          {showTag && (
            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-400/20 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
              Public Health
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
