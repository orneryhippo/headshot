import React from 'react';
import { HEADSHOT_STYLES } from '../constants';
import { HeadshotStyle } from '../types';
import { Button } from './Button';

interface StyleSectionProps {
  onSelect: (style: HeadshotStyle) => void;
  onBack: () => void;
}

export const StyleSection: React.FC<StyleSectionProps> = ({ onSelect, onBack }) => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-900 flex items-center gap-1">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Upload
        </button>
        <h2 className="text-2xl font-bold text-slate-900">Choose your Style</h2>
        <div className="w-24"></div> {/* Spacer for centering */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {HEADSHOT_STYLES.map((style) => (
          <div 
            key={style.id}
            onClick={() => onSelect(style)}
            className="bg-white rounded-2xl p-6 border-2 border-slate-100 hover:border-indigo-600 hover:shadow-xl cursor-pointer transition-all hover:-translate-y-1 flex flex-col gap-4 group"
          >
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              {style.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{style.name}</h3>
              <p className="text-sm text-slate-500 mt-2">{style.description}</p>
            </div>
            <div className="mt-auto pt-4 border-t border-slate-100">
              <span className="text-indigo-600 font-semibold text-sm flex items-center gap-1">
                Select Style
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
