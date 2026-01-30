
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Step5Result() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');

  useEffect(() => {
    // Simulate server processing verification
    const timer = setTimeout(() => {
      // 80% change of success for demo
      const isSuccess = Math.random() > 0.2;
      setStatus(isSuccess ? 'success' : 'failed');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDone = () => {
    router.push('/'); // Go back to home/dashboard
  };

  const handleRetry = () => {
    router.push('/kyc/step/1');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      {status === 'loading' && (
        <div className="space-y-4">
          <Loader2 className="w-16 h-16 text-[var(--speedify-green)] animate-spin mx-auto" />
          <h2 className="text-xl font-semibold">Verifying Information...</h2>
          <p className="text-muted-foreground">We are checking your details against government databases.</p>
        </div>
      )}

      {status === 'success' && (
        <Card className="w-full max-w-md border-none shadow-none">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-[var(--speedify-green)]">Verification Successful</CardTitle>
            <CardDescription>Your identity has been verified successfully.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="font-medium text-green-600">Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Transaction ID</span>
                <span className="font-medium">TRX-{Math.floor(Math.random() * 1000000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
            <Button onClick={handleDone} className="w-full">Return to Dashboard</Button>
          </CardContent>
        </Card>
      )}

      {status === 'failed' && (
        <Card className="w-full max-w-md border-none shadow-none">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-600">Verification Failed</CardTitle>
            <CardDescription>We could not verify your identity details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="bg-red-50 p-4 rounded-lg text-sm text-left">
              <p className="text-red-700">
                Possible reasons:
                <ul className="list-disc pl-4 mt-2 space-y-1">
                  <li>Document details do not match centralized database.</li>
                  <li>Liveness check failed or timed out.</li>
                  <li>Poor image quality on document scan.</li>
                </ul>
              </p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={handleDone} className="w-full">Cancel</Button>
              <Button onClick={handleRetry} className="w-full">Retry</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
