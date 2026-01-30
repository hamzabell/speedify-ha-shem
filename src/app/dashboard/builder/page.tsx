'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppConfig, WorkflowStep, DocumentConfig } from '@/lib/store/config-context';
import { Plus, Trash2, ArrowUp, ArrowDown, Play, Upload, MessageSquare, Palette, FileText, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WorkflowBuilder() {
  const { config, updateConfig } = useAppConfig();
  
  // Local state ONLY for text inputs to prevent re-renders while typing
  const [botName, setBotName] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [telegramUsername, setTelegramUsername] = useState('');

  // Sync text inputs from config when config updates (external change)
  // We use detailed dependencies to avoid resetting if other parts of config change
  useEffect(() => {
    if (config?.chat) {
      if (config.chat.botName) setBotName(config.chat.botName);
      if (config.chat.welcomeMessage) setWelcomeMessage(config.chat.welcomeMessage);
      if (config.chat.whatsappNumber) setWhatsappNumber(config.chat.whatsappNumber);
      if (config.chat.telegramUsername) setTelegramUsername(config.chat.telegramUsername);
    }
  }, [
    config?.chat?.botName, 
    config?.chat?.welcomeMessage, 
    config?.chat?.whatsappNumber, 
    config?.chat?.telegramUsername
  ]);

  /* State for preview selection */
  const [previewMode, setPreviewMode] = useState<'wizard' | 'chat'>('wizard');

  // Derived state from config
  const steps = config?.workflowSteps || [];
  const primaryColor = config?.primaryColor || '#0A3928';
  const logoPreview = config?.logoUrl || null;
  const enabledChannels = config?.chat?.enabledChannels || { whatsapp: true, telegram: false, native: true };

  const toggleStep = (id: string) => {
    const newSteps = steps.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s);
    updateConfig({ workflowSteps: newSteps });
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...steps];
    if (direction === 'up' && index > 0) {
      [newSteps[index], newSteps[index - 1]] = [newSteps[index - 1], newSteps[index]];
    } else if (direction === 'down' && index < newSteps.length - 1) {
      [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
    }
    updateConfig({ workflowSteps: newSteps });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        updateConfig({ logoUrl: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    updateConfig({ primaryColor: color });
  };

  const handleSampleUpload = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // We need to convert multiple files to base64
      const newSamples: string[] = [];
      const promises = Array.from(files).map(file => {
          return new Promise<void>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                  newSamples.push(reader.result as string);
                  resolve();
              };
              reader.readAsDataURL(file);
          });
      });

      Promise.all(promises).then(() => {
          const currentDocs = config?.documents || [];
          const updatedDocs = currentDocs.map(doc => {
              if (doc.id === docId) {
                  const existingSamples = doc.samples || [];
                  // Limit to 3 samples total
                  const combined = [...existingSamples, ...newSamples].slice(0, 3);
                  return { ...doc, samples: combined };
              }
              return doc;
          });
          updateConfig({ documents: updatedDocs });
      });
    }
  };

  const removeSample = (docId: string, indexToRemove: number) => {
      const currentDocs = config?.documents || [];
      const updatedDocs = currentDocs.map(doc => {
          if (doc.id === docId && doc.samples) {
              const newSamples = doc.samples.filter((_, idx) => idx !== indexToRemove);
              return { ...doc, samples: newSamples };
          }
          return doc;
      });
      updateConfig({ documents: updatedDocs });
  };

  const handleChatUpdate = () => {
      // Use current local state values
      updateConfig({
          chat: { 
            botName, 
            welcomeMessage, 
            whatsappNumber,
            telegramUsername,
            enabledChannels // preserve existing channels
          }
      });
  }

  const handleChannelToggle = (channel: 'whatsapp' | 'telegram' | 'native', checked: boolean) => {
      const newChannels = { ...enabledChannels, [channel]: checked };
      // Update config immediately for checkboxes
      // We also need to include the other chat fields to avoid overwriting them with undefined if we only passed chat: { enabledChannels }
      // Wait, updateConfig does shallow merge of config. 
      // But chat is a nested object. value { ...prev, ...newConfig }.
      // If we pass chat: { enabledChannels: ... }, we overwrite the numeric/text fields in chat if we are not careful?
      // Let's look at config-context. It does { ...prev, ...newConfig }.
      // If newConfig.chat is provided, it REPLACES prev.chat.
      // So we MUST provide full chat object or handle deep merge in store.
      // Current store: const updated = { ...prev, ...newConfig };
      // It does NOT do deep merge. It replaces 'chat' key entirely.
      // SO WE MUST SPREAD EXISTING CHAT CONFIG.
      
      const currentChat = config?.chat || { 
          botName: 'Speedify Bot', 
          welcomeMessage: '', 
          enabledChannels: { whatsapp: true, telegram: false, native: true } 
      };

      updateConfig({
          chat: { 
            ...currentChat,
            enabledChannels: newChannels
          }
      });
  };

  // Helper to safely save text input changes
  const saveTextInput = (field: string, value: string) => {
       const currentChat = config?.chat || { 
          botName: 'Speedify Bot', 
          welcomeMessage: '', 
          enabledChannels: { whatsapp: true, telegram: false, native: true } 
      };
      updateConfig({
          chat: {
              ...currentChat,
              [field]: value
          }
      });
  };

  const handlePreview = () => {
    const url = previewMode === 'wizard' 
      ? '/kyc/step/1?preview=true'
      : '/chat-demo?preview=true';
      
    window.open(url, '_blank', 'width=480,height=800,scrollbars=yes,status=no,location=no');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--speedify-green)]">Workflow Builder</h1>
          <p className="text-muted-foreground">Design your KYC verification flow and branding.</p>
        </div>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
            <Button 
                variant={previewMode === 'wizard' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setPreviewMode('wizard')}
                className={`rounded-full ${previewMode === 'wizard' ? 'bg-[var(--speedify-green)]' : 'text-gray-500 hover:text-gray-700'}`}
            >
                Web Wizard
            </Button>
            <Button 
                variant={previewMode === 'chat' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setPreviewMode('chat')}
                className={`rounded-full ${previewMode === 'chat' ? 'bg-[var(--speedify-green)]' : 'text-gray-500 hover:text-gray-700'}`}
            >
                Chat Assistant
            </Button>
             <Button onClick={handlePreview} className="bg-[var(--speedify-green)] rounded-full px-6 ml-2">
                <Play className="w-4 h-4 mr-2" />
                Preview
            </Button>
        </div>
      </div>

      <Tabs defaultValue="workflow" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="workflow">Workflow Steps</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="chat">Chat Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="workflow" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Steps List */}
            <div className="lg:col-span-2 space-y-4">
            <Card className="rounded-xl border-gray-200 shadow-sm">
                <CardHeader>
                <CardTitle>Verification Steps</CardTitle>
                <CardDescription>Reorder and enable/disable steps to customize the user journey.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                {steps.map((step, index) => (
                    <div 
                    key={step.id} 
                    className={`flex items-center justify-between p-3 border rounded-xl transition-all ${step.enabled ? 'bg-white border-gray-200' : 'bg-gray-50 opacity-60 border-dashed border-gray-300'}`}
                    >
                    <div className="flex items-center space-x-3">
                        <div className="flex flex-col space-y-1">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 rounded-full hover:bg-gray-100" 
                            disabled={index === 0}
                            onClick={() => moveStep(index, 'up')}
                        >
                            <ArrowUp className="w-3 h-3" />
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 rounded-full hover:bg-gray-100"
                            disabled={index === steps.length - 1}
                            onClick={() => moveStep(index, 'down')}
                        >
                            <ArrowDown className="w-3 h-3" />
                        </Button>
                        </div>
                        <div>
                        <span className="font-medium block text-gray-900">{step.title}</span>
                        <Badge variant="secondary" className="text-xs font-normal text-gray-500 capitalize rounded-full mt-1">
                            {step.type}
                        </Badge>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <button
                        onClick={() => toggleStep(step.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--speedify-green)] focus:ring-offset-2 ${step.enabled ? 'bg-[var(--speedify-green)]' : 'bg-gray-200'}`}
                        >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${step.enabled ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                        </button>
                    </div>
                    </div>
                ))}
                </CardContent>
            </Card>
            </div>
            {/* Quick Config Sidebar */}
            <div className="space-y-6">
                 <Card className="rounded-xl border-gray-200">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-gray-500">Go to the <b>Documents</b> tab to configure allowed document types.</p>
                        <Button variant="outline" className="w-full" onClick={() => (document.querySelector('[value="documents"]') as HTMLElement)?.click()}>
                            Configure Documents
                        </Button>
                    </CardContent>
                 </Card>
            </div>
        </TabsContent>

        <TabsContent value="documents">
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Allowed Documents</h3>
                        <p className="text-sm text-gray-500">Enable the documents you want users to upload.</p>
                    </div>
                    {/* Optional: Global stats or actions could go here */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {/* Render All Documents */}
                    {(config?.documents || []).map((doc) => (
                        <div 
                            key={doc.id} 
                            className={`group relative flex flex-col p-4 rounded-xl border transition-all duration-200 ${
                                doc.enabled 
                                    ? 'bg-white border-gray-200 shadow-sm hover:shadow-md' 
                                    : 'bg-gray-50 border-gray-200 opacity-75'
                            }`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                        doc.type === 'custom' 
                                            ? 'bg-[var(--speedify-green)]/10 text-[var(--speedify-green)]' 
                                            : 'bg-blue-50 text-blue-600'
                                    }`}>
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 line-clamp-1" title={doc.name}>{doc.name}</h4>
                                        <Badge 
                                            variant="secondary" 
                                            className={`text-[10px] px-1.5 h-5 font-normal ${
                                                doc.type === 'custom' 
                                                    ? 'bg-[var(--speedify-green)]/10 text-[var(--speedify-green)] hover:bg-[var(--speedify-green)]/20' 
                                                    : 'bg-gray-100 text-gray-500'
                                            }`}
                                        >
                                            {doc.type === 'custom' ? 'Custom' : 'Standard'}
                                        </Badge>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        const newDocs = (config?.documents || []).map(d => d.id === doc.id ? { ...d, enabled: !d.enabled } : d);
                                        updateConfig({ documents: newDocs });
                                    }}
                                    className={`relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--speedify-green)] focus:ring-offset-2 ${doc.enabled ? 'bg-[var(--speedify-green)]' : 'bg-gray-200'}`}
                                >
                                    <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${doc.enabled ? 'translate-x-5' : 'translate-x-1'}`} />
                                </button>
                            </div>

                            {/* Custom Document Extras */}
                            {doc.type === 'custom' && (
                                <div className={`mt-auto pt-3 border-t border-gray-100 space-y-3 transition-opacity ${doc.enabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                                    
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-gray-500">AI Samples ({doc.samples?.length || 0}/3)</span>
                                        <div className="flex gap-1">
                                             <label className={`cursor-pointer inline-flex items-center justify-center w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors ${(doc.samples?.length || 0) >= 3 ? 'opacity-50 pointer-events-none' : ''}`} title="Upload Sample">
                                                <Upload className="w-3 h-3" />
                                                <input 
                                                    type="file" 
                                                    accept="image/*" 
                                                    multiple 
                                                    className="hidden" 
                                                    onChange={(e) => handleSampleUpload(doc.id, e)}
                                                    disabled={(doc.samples?.length || 0) >= 3}
                                                />
                                            </label>
                                            <button 
                                                className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                                                onClick={() => {
                                                    const newDocs = (config?.documents || []).filter(d => d.id !== doc.id);
                                                    updateConfig({ documents: newDocs });
                                                }}
                                                title="Delete Document"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Mini Sample Gallery */}
                                    <div className="flex gap-2 h-12">
                                        {(doc.samples || []).map((sample, idx) => (
                                            <div key={idx} className="relative w-12 h-12 flex-shrink-0 group rounded-md overflow-hidden border border-gray-200">
                                                <img src={sample} className="w-full h-full object-cover" alt="Sample" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button 
                                                        onClick={() => removeSample(doc.id, idx)}
                                                        className="text-white hover:text-red-200"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {(!doc.samples || doc.samples.length === 0) && (
                                            <div className="flex-1 flex items-center justify-center border border-dashed border-gray-200 rounded-md bg-gray-50 text-[10px] text-gray-400">
                                                No samples
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                             {/* Spacer for Standard Docs to align heights if needed, or just let them be shorter */}
                             {doc.type === 'standard' && (
                                <div className="mt-auto pt-2">
                                    <p className="text-[10px] text-gray-400">Standard verified document type.</p>
                                </div>
                             )}
                        </div>
                    ))}

                    {/* Add New Card */}
                    <div className="group flex flex-col p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-[var(--speedify-green)] hover:bg-[var(--speedify-green)]/5 transition-all duration-200 min-h-[160px] justify-center items-center cursor-text">
                         <div className="w-full max-w-[200px] text-center space-y-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-white flex items-center justify-center mx-auto transition-colors">
                                <Plus className="w-5 h-5 text-gray-400 group-hover:text-[var(--speedify-green)]" />
                            </div>
                            <h4 className="font-medium text-gray-600 group-hover:text-[var(--speedify-green)]">Add Custom Document</h4>
                            <div className="relative">
                                <Input 
                                    id="new-doc-grid-input"
                                    placeholder="e.g. Utility Bill" 
                                    className="text-center h-9 text-sm bg-transparent border-gray-300 focus:border-[var(--speedify-green)] focus:ring-0"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const input = e.currentTarget;
                                            const name = input.value.trim();
                                            if (name) {
                                                const id = name.toLowerCase().replace(/\s+/g, '_');
                                                const newDoc: DocumentConfig = { id, name, type: 'custom', enabled: true };
                                                updateConfig({ documents: [...(config?.documents || []), newDoc] });
                                                input.value = '';
                                            }
                                        }
                                    }}
                                />
                                <Button 
                                    size="sm"
                                    className="absolute right-1 top-1 h-7 w-7 p-0 rounded-full"
                                    onClick={() => {
                                        const input = document.getElementById('new-doc-grid-input') as HTMLInputElement;
                                        const name = input.value.trim();
                                        if (name) {
                                            const id = name.toLowerCase().replace(/\s+/g, '_');
                                            const newDoc: DocumentConfig = { id, name, type: 'custom', enabled: true };
                                            updateConfig({ documents: [...(config?.documents || []), newDoc] });
                                            input.value = '';
                                        }
                                    }}
                                >
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                         </div>
                    </div>
                </div>
             </div>
        </TabsContent>

        <TabsContent value="branding">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {/* Logo Section */}
                 <div className="space-y-4">
                     <div>
                         <h3 className="text-lg font-semibold text-gray-900">Brand Assets</h3>
                         <p className="text-sm text-gray-500">Upload your logo to personalize the experience.</p>
                     </div>
                     <Card className="rounded-xl border-gray-200 h-full">
                         <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[250px] space-y-6">
                            <div 
                                className={`w-full flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all relative overflow-hidden group ${logoPreview ? 'border-[var(--speedify-green)] bg-[var(--speedify-green)]/5' : 'border-gray-200 hover:border-[var(--speedify-green)] hover:bg-gray-50'}`}
                            >
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                                    onChange={handleLogoUpload}
                                />
                                {logoPreview ? (
                                    <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
                                        <div className="w-32 h-32 relative mb-4">
                                            <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-contain" />
                                        </div>
                                        <p className="text-xs text-[var(--speedify-green)] font-medium">Click to change</p>
                                    </div>
                                ) : (
                                    <div className="text-center p-6">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Upload className="w-8 h-8 text-gray-400 group-hover:text-[var(--speedify-green)]" />
                                        </div>
                                        <h4 className="font-medium text-gray-900">Upload Logo</h4>
                                        <p className="text-xs text-gray-500 mt-1">SVG or Transparent PNG<br/>recommended (max 2MB)</p>
                                    </div>
                                )}
                            </div>
                            
                            {logoPreview && (
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => { updateConfig({ logoUrl: undefined }); }} 
                                    className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" /> Remove Logo
                                </Button>
                            )}
                         </CardContent>
                     </Card>
                 </div>

                 {/* Color Section */}
                 <div className="space-y-4">
                     <div>
                         <h3 className="text-lg font-semibold text-gray-900">Color Palette</h3>
                         <p className="text-sm text-gray-500">Define your primary brand color.</p>
                     </div>
                     <Card className="rounded-xl border-gray-200 h-full">
                         <CardContent className="p-6 space-y-8">
                             <div>
                                 <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">Current Color</label>
                                 <div className="flex items-center gap-4">
                                     <div className="w-20 h-20 rounded-2xl shadow-sm ring-1 ring-gray-100 relative overflow-hidden group">
                                         <div className="absolute inset-0" style={{ backgroundColor: primaryColor }} />
                                         <input 
                                            type="color" 
                                            value={primaryColor} 
                                            onChange={handleColorChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                            <Palette className="w-6 h-6 text-white drop-shadow-md" />
                                        </div>
                                     </div>
                                     <div className="flex-1">
                                         <Input 
                                            value={primaryColor} 
                                            onChange={handleColorChange} 
                                            className="font-mono uppercase text-lg h-12"
                                         />
                                     </div>
                                 </div>
                             </div>

                             <div>
                                 <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">Quick Presets</label>
                                 <div className="grid grid-cols-4 gap-3">
                                     {[
                                         { name: 'Forest', color: '#0A3928' },
                                         { name: 'Royal', color: '#2563EB' },
                                         { name: 'Purple', color: '#7C3AED' },
                                         { name: 'Midnight', color: '#111827' },
                                         { name: 'Berry', color: '#DB2777' },
                                         { name: 'Orange', color: '#EA580C' },
                                         { name: 'Teal', color: '#0D9488' },
                                         { name: 'Crimson', color: '#DC2626' }
                                     ].map((preset) => (
                                         <button
                                            key={preset.color}
                                            onClick={() => updateConfig({ primaryColor: preset.color })}
                                            className="group flex flex-col items-center gap-2"
                                         >
                                             <div 
                                                className={`w-full aspect-square rounded-lg shadow-sm ring-1 ring-gray-200 transition-transform active:scale-95 ${primaryColor === preset.color ? 'ring-2 ring-[var(--speedify-green)] scale-105' : 'hover:scale-105'}`}
                                                style={{ backgroundColor: preset.color }}
                                             />
                                             <span className="text-[10px] font-medium text-gray-600">{preset.name}</span>
                                         </button>
                                     ))}
                                 </div>
                             </div>
                         </CardContent>
                     </Card>
                 </div>
             </div>
        </TabsContent>

        <TabsContent value="chat">
             <div className="space-y-8">
                {/* General Settings Section */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
                        <p className="text-sm text-gray-500">Customize the persona of your verification assistant.</p>
                    </div>
                    <Card className="rounded-xl border-gray-200">
                        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Bot Name</label>
                                <Input 
                                    value={botName}
                                    onChange={(e) => setBotName(e.target.value)}
                                    // Removed onBlur save here to avoid conflict with specific save
                                    onBlur={() => handleChatUpdate()}
                                    className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                />
                                <p className="text-[10px] text-gray-400">The name displayed to users in the chat header.</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Welcome Message</label>
                                <Input 
                                    value={welcomeMessage}
                                    onChange={(e) => setWelcomeMessage(e.target.value)}
                                    onBlur={() => handleChatUpdate()}
                                    className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                />
                                <p className="text-[10px] text-gray-400">First message sent to initiate the flow.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Channels Section */}
                <div className="space-y-4">
                     <div>
                        <h3 className="text-lg font-semibold text-gray-900">Channel Integration</h3>
                        <p className="text-sm text-gray-500">Select where users can interact with the assistant.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* WhatsApp Card */}
                        <div className={`relative flex flex-col p-6 rounded-xl border transition-all duration-200 ${enabledChannels.whatsapp ? 'bg-green-50/50 border-green-200 shadow-sm' : 'bg-white border-gray-200'}`}>
                             <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-green-100 rounded-lg text-green-600">
                                    <MessageSquare className="w-6 h-6" /> {/* Using MessageSquare as generic, can swap if we have specific */}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`text-xs font-medium ${enabledChannels.whatsapp ? 'text-green-700' : 'text-gray-400'}`}>{enabledChannels.whatsapp ? 'Active' : 'Inactive'}</span>
                                    <button
                                        onClick={() => handleChannelToggle('whatsapp', !enabledChannels.whatsapp)}
                                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${enabledChannels.whatsapp ? 'bg-green-500' : 'bg-gray-200'}`}
                                    >
                                        <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${enabledChannels.whatsapp ? 'translate-x-5' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                             </div>
                             <h4 className="font-semibold text-gray-900 mb-1">WhatsApp Business</h4>
                             <p className="text-xs text-gray-500 mb-6">Connect via official WhatsApp API.</p>
                             
                             {enabledChannels.whatsapp && (
                                <div className="mt-auto pt-4 border-t border-green-200/50 animate-in fade-in slide-in-from-top-2">
                                     <label className="text-xs font-medium text-green-800 mb-1.5 block">WhatsApp Number</label>
                                     <Input
                                        placeholder="e.g. +1234567890"
                                        value={whatsappNumber}
                                        onChange={(e) => setWhatsappNumber(e.target.value)}
                                        onBlur={() => handleChatUpdate()}
                                        className="bg-white border-green-200 focus:border-green-500 h-9 text-sm"
                                     />
                                </div>
                             )}
                        </div>

                        {/* Telegram Card */}
                        <div className={`relative flex flex-col p-6 rounded-xl border transition-all duration-200 ${enabledChannels.telegram ? 'bg-blue-50/50 border-blue-200 shadow-sm' : 'bg-white border-gray-200'}`}>
                             <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                                    <MessageSquare className="w-6 h-6 rotate-[-10deg]" /> 
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`text-xs font-medium ${enabledChannels.telegram ? 'text-blue-700' : 'text-gray-400'}`}>{enabledChannels.telegram ? 'Active' : 'Inactive'}</span>
                                    <button
                                        onClick={() => handleChannelToggle('telegram', !enabledChannels.telegram)}
                                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${enabledChannels.telegram ? 'bg-blue-500' : 'bg-gray-200'}`}
                                    >
                                        <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${enabledChannels.telegram ? 'translate-x-5' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                             </div>
                             <h4 className="font-semibold text-gray-900 mb-1">Telegram Bot</h4>
                             <p className="text-xs text-gray-500 mb-6">Interact via Telegram Bot API.</p>
                             
                             {enabledChannels.telegram && (
                                <div className="mt-auto pt-4 border-t border-blue-200/50 animate-in fade-in slide-in-from-top-2">
                                     <label className="text-xs font-medium text-blue-800 mb-1.5 block">Bot Username</label>
                                     <Input
                                        placeholder="@SpeedifyBot"
                                        value={telegramUsername}
                                        onChange={(e) => setTelegramUsername(e.target.value)}
                                        onBlur={() => handleChatUpdate()}
                                        className="bg-white border-blue-200 focus:border-blue-500 h-9 text-sm"
                                     />
                                </div>
                             )}
                        </div>

                        {/* Native Card */}
                        <div className={`relative flex flex-col p-6 rounded-xl border transition-all duration-200 ${enabledChannels.native ? 'bg-[var(--speedify-green)]/5 border-[var(--speedify-green)]/30 shadow-sm' : 'bg-white border-gray-200'}`}>
                             <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-[var(--speedify-green)]/10 rounded-lg text-[var(--speedify-green)]">
                                    <MessageSquare className="w-6 h-6" /> 
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`text-xs font-medium ${enabledChannels.native ? 'text-green-700' : 'text-gray-400'}`}>{enabledChannels.native ? 'Active' : 'Inactive'}</span>
                                    <button
                                        onClick={() => handleChannelToggle('native', !enabledChannels.native)}
                                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--speedify-green)] focus:ring-offset-2 ${enabledChannels.native ? 'bg-[var(--speedify-green)]' : 'bg-gray-200'}`}
                                    >
                                        <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${enabledChannels.native ? 'translate-x-5' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                             </div>
                             <h4 className="font-semibold text-gray-900 mb-1">In-App Chat</h4>
                             <p className="text-xs text-gray-500 mb-6">Standard web-based chat interface.</p>
                             
                             {enabledChannels.native && (
                                <div className="mt-auto pt-4 border-t border-[var(--speedify-green)]/20 animate-in fade-in slide-in-from-top-2">
                                     <p className="text-[10px] text-gray-500 italic">This is the default web wizard experience. It is recommended to keep this enabled.</p>
                                </div>
                             )}
                        </div>

                    </div>
                </div>
             </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
