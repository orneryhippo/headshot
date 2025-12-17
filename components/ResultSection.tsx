import React, { useState } from 'react';
import { Button } from './Button';
import { editHeadshot } from '../services/geminiService';

interface ResultSectionProps {
  originalImage: string;
  generatedImage: string;
  onReset: () => void;
  onUpdateImage: (newImage: string) => void;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ 
  originalImage, 
  generatedImage, 
  onReset,
  onUpdateImage
}) => {
  const [prompt, setPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `professional-headshot-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEdit = async () => {
    if (!prompt.trim()) return;
    
    setIsEditing(true);
    try {
      const newImage = await editHeadshot(generatedImage, prompt);
      onUpdateImage(newImage);
      setPrompt('');
    } catch (error) {
      alert("Failed to edit image. Please try again.");
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold text-slate-900">Your New Headshot</h2>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onReset}>Start Over</Button>
          <Button onClick={handleDownload}>
             <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download High Res
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-6">
           <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 relative group">
                <img src={generatedImage} alt="Generated Headshot" className="w-full h-full object-cover" />
                {isEditing && (
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white backdrop-blur-sm">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4"></div>
                    <p className="font-medium">Applying edits...</p>
                  </div>
                )}
              </div>
           </div>
           <div className="flex justify-center">
             <div className="bg-slate-100 rounded-lg p-2 inline-flex">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-3">Generated with Gemini 2.5</span>
             </div>
           </div>
        </div>

        {/* Controls */}
        <div className="space-y-8 lg:pt-10">
          <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              AI Magic Editor
            </h3>
            <p className="text-indigo-700/80 mb-6 text-sm">
              Not quite perfect? Ask Gemini to tweak it. Try commands like:
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
               {['Make the smile brighter', 'Change tie to red', 'Blur background more', 'Add a retro filter'].map(suggestion => (
                 <button 
                  key={suggestion} 
                  onClick={() => setPrompt(suggestion)}
                  className="bg-white/60 hover:bg-white text-indigo-800 text-xs px-3 py-1.5 rounded-full border border-indigo-200 transition-colors"
                >
                   {suggestion}
                 </button>
               ))}
            </div>

            <div className="flex gap-2">
              <input 
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your edit..."
                className="flex-1 px-4 py-3 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
              />
              <Button onClick={handleEdit} disabled={!prompt || isEditing} className="bg-indigo-600 hover:bg-indigo-700 text-white !px-6">
                {isEditing ? 'Editing...' : 'Apply'}
              </Button>
            </div>
          </div>

          <div>
             <h4 className="font-bold text-slate-900 mb-4">Original</h4>
             <div className="w-32 aspect-square rounded-xl overflow-hidden border-2 border-slate-100 relative">
               <img src={originalImage} alt="Original" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
