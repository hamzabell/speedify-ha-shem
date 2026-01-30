'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Camera, Upload, X, ChevronRight, FileText } from 'lucide-react';
import { useAppConfig } from '@/lib/store/config-context';
import { cn } from '@/lib/utils';

export default function Step3Document() {
  const router = useRouter();
  const { config } = useAppConfig();
  const [image, setImage] = useState<string | null>(null);
  // Default to first enabled document
  const enabledDocs = (config.documents || []).filter(d => d.enabled);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
     if (enabledDocs.length > 0 && !selectedDocId) {
         setSelectedDocId(enabledDocs[0].id);
     }
  }, [enabledDocs, selectedDocId]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleContinue = () => {
    if (config.requireLiveness) {
      router.push('/kyc/step/4');
    } else {
      router.push('/kyc/step/5'); // Skip Liveness if disabled
    }
  };

  const selectedDoc = enabledDocs.find(d => d.id === selectedDocId);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-[var(--speedify-green)]">Capture Document</h1>
        <p className="text-muted-foreground">Select a document type and take a clear photo.</p>
      </div>

      {/* Document Selection Tabs */}
      {enabledDocs.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center mb-6">
            {enabledDocs.map(doc => (
                <button
                    key={doc.id}
                    onClick={() => { setSelectedDocId(doc.id); clearImage(); }}
                    className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                        selectedDocId === doc.id
                            ? "bg-[var(--speedify-green)] text-white border-[var(--speedify-green)] shadow-sm"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    )}
                >
                    {doc.name}
                </button>
            ))}
        </div>
      )}

      {selectedDoc ? (
          <div className="flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
            <h3 className="font-semibold text-gray-800">{selectedDoc.name}</h3>
            {image ? (
            <div className="relative w-full max-w-sm aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-[var(--speedify-green)]">
                <img src={image} alt="Document Preview" className="w-full h-full object-cover" />
                <button 
                onClick={clearImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                <X className="w-4 h-4" />
                </button>
            </div>
            ) : (
            <div 
                className="w-full max-w-sm aspect-video bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors group"
                onClick={() => fileInputRef.current?.click()}
            >
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm font-medium text-gray-500">Tap to Capture {selectedDoc.name}</p>
                <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileUpload}
                />
            </div>
            )}

            <div className="text-xs text-center text-gray-400 max-w-xs">
            Ensure all corners are visible and text is readable. Avoid glare and shadows.
            </div>
        </div>
      ) : (
          <div className="text-center text-gray-500 py-10">
              No documents enabled. Please check configuration.
          </div>
      )}

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={() => router.back()}>Back</Button>
        <Button onClick={handleContinue} disabled={!image} className="bg-[var(--speedify-green)]">
          {config.requireLiveness ? 'Continue to Liveness' : 'Submit'}
        </Button>
      </div>
    </div>
  );
}
