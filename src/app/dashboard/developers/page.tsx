
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, Eye, EyeOff, RefreshCw } from 'lucide-react';

export default function DashboardDevelopers() {
  const [showKey, setShowKey] = useState(false);
  const [apiKey, setApiKey] = useState('sk_live_mock_key_XXXXXXXXXXXXXXXXXXXXXXXX');

  const regenerateKey = () => {
    const newKey = 'sk_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--speedify-green)]">Developers</h1>
        <p className="text-muted-foreground">API Credentials and Webhook configurations.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Use these keys to authenticate your requests to the Speedify API.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Public Key</label>
            <div className="flex space-x-2">
              <Input value="pk_live_mock_key_YYYYYYYYYYYYYYYYYYYYYYYY" readOnly className="bg-gray-50 font-mono text-sm" />
              <Button variant="outline" size="icon">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Secret Key</label>
            <div className="flex space-x-2">
              <div className="relative w-full">
                <Input 
                  value={apiKey} 
                  type={showKey ? "text" : "password"} 
                  readOnly 
                  className="bg-gray-50 font-mono text-sm pr-10" 
                />
                <button 
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Button variant="outline" size="icon">
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={regenerateKey} title="Regenerate Key">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-red-500 mt-1">
              Do not share your secret key with anyone.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Webhooks</CardTitle>
          <CardDescription>Receive real-time updates about verification status changes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
             <label className="text-sm font-medium">Webhook URL</label>
             <div className="flex space-x-2">
               <Input placeholder="https://your-domain.com/webhooks/speedify" />
               <Button>Save</Button>
             </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md text-sm">
             <h4 className="font-medium mb-2">Recent Deliveries</h4>
             <p className="text-muted-foreground text-xs">No webhooks delivered in the last 24 hours.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
