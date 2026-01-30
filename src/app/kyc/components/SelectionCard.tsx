
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { User, CreditCard, FileText } from 'lucide-react';

interface SelectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

export function SelectionCard({ title, description, icon, selected, onClick }: SelectionCardProps) {
  return (
    <Card 
      onClick={onClick}
      className={cn(
        "cursor-pointer transition-all hover:shadow-md border-2",
        selected ? "border-[var(--speedify-green)] bg-[var(--speedify-green)]/5" : "border-transparent hover:border-gray-200"
      )}
    >
      <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center mb-4",
          selected ? "bg-[var(--speedify-green)] text-white" : "bg-gray-100 text-gray-500"
        )}>
          {icon}
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
