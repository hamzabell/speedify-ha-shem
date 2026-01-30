
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Settings, Code, LogOut } from 'lucide-react';
import { SpeedifyLogo } from '@/components/ui/logo';

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Workflow Builder', href: '/dashboard/builder', icon: Settings },
  { name: 'Configuration', href: '/dashboard/config', icon: Settings },
  { name: 'Developers', href: '/dashboard/developers', icon: Code },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--speedify-bg)] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r fixed h-full hidden md:flex flex-col">
        <div className="p-6 flex items-center space-x-2 border-b">
          <SpeedifyLogo className="w-8 h-8" />
          <span className="font-bold text-lg text-[var(--speedify-green)]">Speedify</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-full text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-[var(--speedify-green)] text-white shadow-md shadow-green-900/10" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <Link href="/" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
