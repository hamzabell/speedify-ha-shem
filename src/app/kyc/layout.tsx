
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useAppConfig } from '@/lib/store/config-context';

export default function KYCLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { config } = useAppConfig();
  const currentStepIndex = config.workflowSteps.findIndex((step) => pathname?.includes(`/kyc/step/${step.id}`));
  
  // Use config steps instead of hardcoded steps for the progress bar
  const activeSteps = config.workflowSteps.filter(s => s.enabled);
  
  // Fallback to default green if config not loaded yet
  const themeColor = config.primaryColor || '#0A3928';

  return (
    <div className="min-h-screen bg-[var(--speedify-bg)] flex flex-col items-center py-10" style={{ '--current-theme': themeColor } as React.CSSProperties}>
      <div className="w-full max-w-2xl px-4">
        {/* Branding Header */}
        <div className="mb-8 flex justify-center">
            {config.logoUrl ? (
                <img src={config.logoUrl} alt="Company Logo" className="h-12 object-contain" />
            ) : (
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: themeColor }}>
                        S
                    </div>
                    <span className="font-bold text-xl" style={{ color: themeColor }}>Speedify</span>
                </div>
            )}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10" />
            
            {activeSteps.map((step, index) => {
              // We need to map the step's "real" index in the filtered list
              // This is a simplification. For robust progress, we'd match IDs.
              // Let's assume sequential matching for this demo context.
              const stepIdInt = parseInt(step.id);
              // Find the current active step ID from pathname
              const currentStepIdMatch = pathname?.match(/\/step\/(\d+)/);
              const currentStepId = currentStepIdMatch ? parseInt(currentStepIdMatch[1]) : 1;
              
              const completed = stepIdInt < currentStepId;
              const active = stepIdInt === currentStepId;

              return (
                <div key={step.id} className="flex flex-col items-center bg-[var(--speedify-bg)] px-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors",
                    )}
                    style={{
                        backgroundColor: completed ? themeColor : active ? 'white' : 'white',
                        borderColor: completed || active ? themeColor : '#d1d5db',
                        color: completed ? 'white' : active ? themeColor : '#9ca3af'
                    }}
                  >
                    {completed ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className="text-xs mt-2 font-medium" style={{ color: active || completed ? themeColor : '#9ca3af' }}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
