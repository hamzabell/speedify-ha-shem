
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppConfig } from '@/lib/store/config-context';
import { CheckCircle2, User } from 'lucide-react';

export default function Step4Liveness() {
  const router = useRouter();
  const { config } = useAppConfig();
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate liveness detection process
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => router.push('/kyc/step/5'), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-[var(--speedify-green)]">Liveness Check</h1>
        <p className="text-muted-foreground">Keep your face still while we verify you are real.</p>
      </div>

      <div className="relative w-64 h-64 rounded-full border-4 border-gray-200 overflow-hidden flex items-center justify-center bg-gray-50">
        <User className="w-32 h-32 text-gray-300" />
        
        {/* Scanning Overlay */}
        <div className="absolute inset-0 border-4 border-[var(--speedify-green)] rounded-full animate-spin-slow" 
             style={{ 
               clipPath: `inset(0 0 ${100 - progress}% 0)`,
               transition: 'clip-path 0.3s ease-in-out'
             }} 
        />
        
        {/* Center Progress Text */}
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-[var(--speedify-green)]">{progress}%</span>
        </div>
      </div>

      <div className="w-full max-w-sm">
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--speedify-green)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">
           Verifying facial biometrics...
        </p>
      </div>
    </div>
  );
}
