
import { MOCK_USERS, MOCK_STATS, MOCK_RECENT_ACTIVITY } from './mock/data';

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchUsers = async () => {
  await delay(800);
  return MOCK_USERS;
};

export const fetchStats = async () => {
  await delay(500);
  return MOCK_STATS;
};

export const fetchActivity = async () => {
  await delay(600);
  return MOCK_RECENT_ACTIVITY;
};

export const verifyUser = async (userId: string, data: any) => {
  await delay(1500);
  // Simple logic to simulate verification success/failure
  if (data.bvn === '00000000000') {
      return { success: false, message: 'Invalid BVN' };
  }
  return { success: true, message: 'Verification Successful' };
};
