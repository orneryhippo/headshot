import React, { useRef } from 'react';
import { fileToBase64 } from '../services/utils';
import { Button } from './Button';

interface UploadSectionProps {
  onImageSelected: (base64: string) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onImageSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const base64 = await fileToBase64(file);
        onImageSelected(base64);
      } catch (err) {
        console.error("Error reading file", err);
        alert("Failed to read file. Please try again.");
      }
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      try {
        const base64 = await fileToBase64(file);
        onImageSelected(base64);
      } catch (err) {
        console.error("Error reading file", err);
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto text-center space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">Upload your Selfie</h2>
        <p className="text-slate-500">For best results, use a photo with good lighting where your face is clearly visible.</p>
      </div>

      <div 
        className="border-3 border-dashed border-slate-300 rounded-3xl p-12 bg-white hover:bg-slate-50 hover:border-indigo-400 transition-all cursor-pointer group"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-slate-700">Click to upload or drag and drop</p>
            <p className="text-sm text-slate-400">SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
      </div>

      <div className="flex gap-4 justify-center">
        <div className="flex -space-x-2">
           {[1,2,3].map(i => (
             <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://picsum.photos/100/100?random=${i}`} alt="user" />
           ))}
        </div>
        <p className="self-center text-sm text-slate-500">Join 10,000+ users transforming their profiles today</p>
      </div>
    </div>
  );
};
