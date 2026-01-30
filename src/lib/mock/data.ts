
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  bvn: string;
  nin: string;
  documentType: 'NIN_SLIP' | 'DRIVERS_LICENSE' | 'PASSPORT' | 'VOTERS_CARD';
  documentNumber: string;
  address: string;
  verificationStatus: 'VERIFIED' | 'PENDING' | 'FAILED';
  verificationDate: string;
}

export interface VerificationStats {
  totalVerifications: number;
  successRate: number;
  averageTime: string;
  fraudAttempts: number;
}

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'usr_123456789',
    fullName: 'Adewale Okafor',
    email: 'adewale.okafor@example.com',
    phoneNumber: '+234 801 234 5678',
    bvn: '22233344455',
    nin: '11122233344',
    documentType: 'PASSPORT',
    documentNumber: 'A12345678',
    address: '12 Alade Avenue, Ikeja, Lagos',
    verificationStatus: 'VERIFIED',
    verificationDate: '2023-10-25T10:30:00Z',
  },
  {
    id: 'usr_987654321',
    fullName: 'Chioma Adebayo',
    email: 'chioma.adebayo@example.com',
    phoneNumber: '+234 809 876 5432',
    bvn: '55566677788',
    nin: '99988877766',
    documentType: 'DRIVERS_LICENSE',
    documentNumber: 'B98765432',
    address: '5 Lekki Phase 1, Lagos',
    verificationStatus: 'PENDING',
    verificationDate: '2023-10-26T14:15:00Z',
  },
  {
    id: 'usr_456789123',
    fullName: 'Emeka Nwosu',
    email: 'emeka.nwosu@example.com',
    phoneNumber: '+234 705 432 1987',
    bvn: '88899900011',
    nin: '33344455566',
    documentType: 'NIN_SLIP',
    documentNumber: 'C11223344',
    address: '20 Wuse Zone 4, Abuja',
    verificationStatus: 'FAILED',
    verificationDate: '2023-10-24T09:45:00Z',
  }
];

export const MOCK_STATS: VerificationStats = {
  totalVerifications: 12450,
  successRate: 94.5,
  averageTime: '1.2s',
  fraudAttempts: 320,
};

export const MOCK_RECENT_ACTIVITY = [
  { id: 1, user: 'Adewale Okafor', action: 'Identity Verified', time: '2 mins ago', status: 'success' },
  { id: 2, user: 'Chioma Adebayo', action: 'Document Uploaded', time: '15 mins ago', status: 'pending' },
  { id: 3, user: 'Emeka Nwosu', action: 'Liveness Check Failed', time: '1 hour ago', status: 'failed' },
  { id: 4, user: 'Tunde Bakare', action: 'BVN Validated', time: '3 hours ago', status: 'success' },
  { id: 5, user: 'Ngozi Eze', action: 'Account Created', time: '5 hours ago', status: 'success' },
];
