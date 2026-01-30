
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppConfig } from '@/lib/store/config-context';


// Simple Toggle Component since we didn't build one yet
function Toggle({ label, description, checked, onChange }: { label: string, description: string, checked: boolean, onChange: (checked: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-0">
      <div className="space-y-0.5">
        <label className="text-base font-medium text-gray-900">{label}</label>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        type="button"
        className={`${
          checked ? 'bg-[var(--speedify-green)]' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--speedify-green)] focus:ring-offset-2`}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
      >
        <span
          aria-hidden="true"
          className={`${
            checked ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </button>
    </div>
  );
}

export default function DashboardConfig() {
  const { config, updateConfig } = useAppConfig();

  // Local state to handle changes before saving? Or live updates?
  // For admin dashboard, live updates via context are fine for this demo, 
  // but let's make it feel like a form.
  
  // Actually, ConfigContext updates localStorage immediately, so verify changes in real-time.

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--speedify-green)]">Configuration</h1>
        <p className="text-muted-foreground">Manage your dynamic KYC requirements and Verification workflows.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Verification Rules</CardTitle>
            <CardDescription>
               Define what checks are required for your users. These changes update the KYC Wizard immediately.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Toggle 
              label="Require BVN Verification" 
              description="Users must provide a valid Bank Verification Number."
              checked={config.enableBVNCheck}
              onChange={(val) => updateConfig({ enableBVNCheck: val })}
            />
            <Toggle 
              label="Require Liveness Check" 
              description="Perform active facial liveness detection to prevent spoofing."
              checked={config.requireLiveness}
              onChange={(val) => updateConfig({ requireLiveness: val })}
            />
            {/* Future configs could go here */}
            <Toggle 
              label="Strict Address Matching" 
              description="Reject if address confidence score is below 80% (Mock)."
              checked={false} 
              onChange={() => {}} 
            />
             <Toggle 
              label="Allow International Passports" 
              description="Enable Passport as a valid ID document."
              checked={true} 
              onChange={() => {}} 
            />
          </CardContent>
          <CardFooter className="bg-gray-50 border-t p-4 flex justify-between items-center">
             <span className="text-xs text-muted-foreground">Changes are auto-saved.</span>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme & Branding</CardTitle>
            <CardDescription>Customize the look and feel of the verification widget.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
               <label className="text-sm font-medium">Primary Color</label>
               <div className="flex items-center space-x-2">
                 <div className="w-8 h-8 rounded-full bg-[var(--speedify-green)] border cursor-pointer ring-2 ring-offset-2 ring-[var(--speedify-green)]"></div>
                 <div className="w-8 h-8 rounded-full bg-blue-600 border cursor-pointer opacity-50"></div>
                 <div className="w-8 h-8 rounded-full bg-purple-600 border cursor-pointer opacity-50"></div>
                 <span className="text-xs text-gray-500 ml-2">(Locked in Demo)</span>
               </div>
             </div>
             
             <Toggle 
              label="Dark Mode Support" 
              description="Enable dark mode for the widget based on user system preference."
              checked={config.enableDarkTheme}
              onChange={(val) => updateConfig({ enableDarkTheme: val })}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
