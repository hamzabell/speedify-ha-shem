
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SpeedifyLogo } from '@/components/ui/logo';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[var(--speedify-bg)]">
      <Link href="/" className="mb-8 flex items-center space-x-2">
         <SpeedifyLogo className="w-10 h-10" />
         <span className="font-bold text-2xl text-[var(--speedify-green)]">Speedify</span>
      </Link>

      <Card className="w-full max-w-md rounded-3xl shadow-xl border-gray-100">
        <CardHeader className="space-y-1 pb-8">
          <CardTitle className="text-3xl font-bold text-center text-[var(--speedify-green)]">Welcome Back</CardTitle>
          <CardDescription className="text-center text-gray-500">
            Sign in to your dashboard to manage verifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700 pl-1">Email Address</label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Ex. admin@speedify.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-gray-700 pl-1">Password</label>
                <Link href="#" className="text-sm text-[var(--speedify-green)] font-medium hover:underline">
                  Forgot?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
            <Button type="submit" className="w-full h-12 text-base font-semibold shadow-lg shadow-speedify-green/20" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-6">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="#" className="text-[var(--speedify-green)] font-medium hover:underline">
              Contact Sales
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
