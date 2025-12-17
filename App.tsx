import React, { useState } from 'react';
import { AppState, HeadshotStyle } from './types';
import { UploadSection } from './components/UploadSection';
import { StyleSection } from './components/StyleSection';
import { ResultSection } from './components/ResultSection';
import { generateProfessionalHeadshot } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('upload');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('');

  const handleImageSelected = (base64: string) => {
    setOriginalImage(base64);
    setAppState('style-selection');
  };

  const handleStyleSelect = async (style: HeadshotStyle) => {
    if (!originalImage) return;

    setAppState('generating');
    setLoadingMessage(`Generating your ${style.name} headshot...`);

    try {
      const result = await generateProfessionalHeadshot(originalImage, style.promptModifier);
      setGeneratedImage(result);
      setAppState('result');
    } catch (error) {
      console.error(error);
      alert('Failed to generate image. Please ensure your API Key is valid and try again.');
      setAppState('style-selection');
    }
  };

  const handleUpdateImage = (newImage: string) => {
    setGeneratedImage(newImage);
  };

  const resetApp = () => {
    setAppState('upload');
    setOriginalImage(null);
    setGeneratedImage(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={resetApp}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="font-bold text-xl tracking-tight">AI Headshot<span className="text-indigo-600">Pro</span></h1>
          </div>
          <div className="text-sm font-medium text-slate-500">
            Powered by Gemini 2.5 Flash Image
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center">
        
        {appState === 'upload' && (
          <UploadSection onImageSelected={handleImageSelected} />
        )}

        {appState === 'style-selection' && (
          <StyleSection 
            onSelect={handleStyleSelect} 
            onBack={() => setAppState('upload')} 
          />
        )}

        {appState === 'generating' && (
          <div className="text-center space-y-8 animate-fade-in">
             <div className="relative w-32 h-32 mx-auto">
               <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center text-4xl animate-pulse">
                 ✨
               </div>
             </div>
             <div>
               <h2 className="text-2xl font-bold text-slate-900 mb-2">Creating Magic</h2>
               <p className="text-slate-500">{loadingMessage}</p>
             </div>
          </div>
        )}

        {appState === 'result' && originalImage && generatedImage && (
          <ResultSection 
            originalImage={originalImage} 
            generatedImage={generatedImage} 
            onReset={resetApp}
            onUpdateImage={handleUpdateImage}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} AI Headshot Pro. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
