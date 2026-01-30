
'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_STATS, MOCK_RECENT_ACTIVITY, VerificationStats } from '@/lib/mock/data';
import { Activity, Users, ShieldAlert, Timer } from 'lucide-react';
import { fetchStats, fetchActivity } from '@/lib/api';

export default function DashboardOverview() {
  const [stats, setStats] = useState<VerificationStats | null>(null);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [statsData, activityData] = await Promise.all([fetchStats(), fetchActivity()]);
      setStats(statsData);
      setActivity(activityData);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--speedify-green)]">Overview</h1>
        <p className="text-muted-foreground">Welcome back to your Speedify Admin Console.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Verifications" 
          value={stats?.totalVerifications.toLocaleString() || '0'} 
          icon={<Users className="w-4 h-4 text-blue-500" />} 
          trend="+12% from last week"
        />
        <StatsCard 
          title="Success Rate" 
          value={`${stats?.successRate}%`} 
          icon={<Activity className="w-4 h-4 text-green-500" />} 
          trend="+2.1% improvement"
        />
        <StatsCard 
          title="Avg. Response Time" 
          value={stats?.averageTime || '0s'} 
          icon={<Timer className="w-4 h-4 text-orange-500" />} 
          trend="Stable"
        />
        <StatsCard 
          title="Fraud Attempts Blocked" 
          value={stats?.fraudAttempts.toString() || '0'} 
          icon={<ShieldAlert className="w-4 h-4 text-red-500" />} 
          trend="3 detected today"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Verifications</CardTitle>
            <CardDescription>Latest identity verification attempts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activity.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                     <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                        {item.user.charAt(0)}
                     </div>
                     <div>
                       <p className="font-medium">{item.user}</p>
                       <p className="text-sm text-muted-foreground">{item.action}</p>
                     </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={item.status === 'success' ? 'default' : item.status === 'failed' ? 'destructive' : 'secondary'}>
                      {item.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <CardTitle>Platform Health</CardTitle>
             <CardDescription>System Status</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                <StatusItem label="NIBSS Gateway" status="Operational" color="bg-green-500" />
                <StatusItem label="NIMC Gateway" status="Operational" color="bg-green-500" />
                <StatusItem label="Facial Recognition" status="Operational" color="bg-green-500" />
                <StatusItem label="Document OCR" status="Degraded" color="bg-yellow-500" />
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{trend}</p>
      </CardContent>
    </Card>
  );
}

function StatusItem({ label, status, color }: { label: string, status: string, color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-sm text-muted-foreground">{status}</span>
      </div>
    </div>
  );
}
