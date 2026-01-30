'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
export interface WorkflowStep {
  id: string;
  type: string;
  title: string;
  enabled: boolean;
}

export interface ChatConfig {
  botName: string;
  welcomeMessage: string;
  primaryColor?: string;
  whatsappNumber?: string;
  telegramUsername?: string;
  enabledChannels: {
    whatsapp: boolean;
    telegram: boolean;
    native: boolean;
  };
}

export interface DocumentConfig {
  id: string;
  name: string;
  type: 'standard' | 'custom';
  enabled: boolean;
  samples?: string[]; // Array of base64 strings for AI reference
}

export interface AppConfig {
  requireLiveness: boolean;
  enableBVNCheck: boolean;
  enableDarkTheme: boolean;
  workflowSteps: WorkflowStep[];
  documents: DocumentConfig[]; // New field
  logoUrl?: string; // e.g. data:image/png;base64,...
  primaryColor?: string; // hex code
  chat: ChatConfig;
}

const DEFAULT_STEPS: WorkflowStep[] = [
  { id: '1', type: 'identity', title: 'Identity Selection', enabled: true },
  { id: '2', type: 'details', title: 'User Details', enabled: true },
  { id: '3', type: 'document', title: 'Document Capture', enabled: true },
  { id: '4', type: 'liveness', title: 'Liveness Check', enabled: true },
  { id: '5', type: 'result', title: 'Verification Result', enabled: true },
];

// Default config
const defaultConfig: AppConfig = {
  requireLiveness: true,
  enableBVNCheck: true,
  enableDarkTheme: false,
  workflowSteps: DEFAULT_STEPS,
  documents: [
      { id: 'bvn', name: 'Bank Verification Number (BVN)', type: 'standard', enabled: true },
      { id: 'nin_slip', name: 'NIN Slip', type: 'standard', enabled: true },
      { id: 'intl_passport', name: 'International Passport', type: 'standard', enabled: true },
      { id: 'drivers_license', name: 'Driver\'s License', type: 'standard', enabled: false }, 
  ],
  primaryColor: '#0A3928',
  chat: {
    botName: 'Speedify Bot',
    welcomeMessage: 'Hi there! I can help you verify your identity securely.',
    enabledChannels: {
      whatsapp: true,
      telegram: false,
      native: true
    }
  }
};

const ConfigContext = createContext<{
  config: AppConfig;
  updateConfig: (newConfig: Partial<AppConfig>) => void;
  resetConfig: () => void;
}>({
  config: defaultConfig,
  updateConfig: () => {},
  resetConfig: () => {},
});

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<AppConfig>(defaultConfig);

  useEffect(() => {
    // Load from localStorage on mount
    const savedConfig = localStorage.getItem('appConfig');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        // Merge with default to ensure new fields (like workflowSteps) exist if localstorage is old
        setConfig({ ...defaultConfig, ...parsed });
      } catch (e) {
        console.error("Failed to parse config from localStorage", e);
      }
    }
  }, []);

  const updateConfig = (newConfig: Partial<AppConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      localStorage.setItem('appConfig', JSON.stringify(updated));
      return updated;
    });
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
    localStorage.removeItem('appConfig');
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useAppConfig = () => useContext(ConfigContext);

