
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SelectionCard } from '../../components/SelectionCard';
import { CreditCard, FileText, UserSquare } from 'lucide-react';

export default function Step1Identity() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedType) {
      // In a real app, we'd save this selection to context/store
      localStorage.setItem('kyc_document_type', selectedType);
      router.push('/kyc/step/2');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--speedify-green)]">Verify your Identity</h1>
        <p className="text-muted-foreground">Select a document type to begin the verification process.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectionCard
          title="BVN"
          description="Bank Verification Number"
          icon={<CreditCard className="w-6 h-6" />}
          selected={selectedType === 'BVN'}
          onClick={() => setSelectedType('BVN')}
        />
        <SelectionCard
          title="NIN"
          description="National Identity Number"
          icon={<UserSquare className="w-6 h-6" />}
          selected={selectedType === 'NIN'}
          onClick={() => setSelectedType('NIN')}
        />
        <SelectionCard
          title="Passport"
          description="International Passport"
          icon={<FileText className="w-6 h-6" />}
          selected={selectedType === 'PASSPORT'}
          onClick={() => setSelectedType('PASSPORT')}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleContinue} 
          disabled={!selectedType}
          className="w-full md:w-auto"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
