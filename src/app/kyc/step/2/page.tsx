
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppConfig } from '@/lib/store/config-context';

export default function Step2Details() {
  const router = useRouter();
  const { config } = useAppConfig();
  const [formData, setFormData] = useState({
    bvn: '',
    nin: '',
    fullname: '',
    dob: '',
    phone: '',
  });

  const [docType, setDocType] = useState<string | null>(null);

  useEffect(() => {
    const type = localStorage.getItem('kyc_document_type');
    setDocType(type);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    localStorage.setItem('kyc_user_details', JSON.stringify(formData));
    router.push('/kyc/step/3');
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-[var(--speedify-green)]">Enter Details</h1>
        <p className="text-muted-foreground">Please provide your {docType || 'Identity'} information.</p>
      </div>

      <div className="space-y-4">
        {config.enableBVNCheck && (
           <div className="space-y-2">
            <label className="text-sm font-medium">Bank Verification Number (BVN)</label>
            <Input 
              name="bvn" 
              placeholder="12345678901" 
              maxLength={11}
              value={formData.bvn}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input 
            name="fullname" 
            placeholder="Adewale Okafor" 
            value={formData.fullname}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Date of Birth</label>
          <Input 
            name="dob" 
            type="date"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        
         <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number</label>
          <Input 
            name="phone" 
            type="tel"
            placeholder="+234 800 000 0000"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={() => router.back()}>Back</Button>
        <Button onClick={handleContinue}>Continue</Button>
      </div>
    </div>
  );
}
