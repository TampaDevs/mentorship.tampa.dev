import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface generalForm {
  first: string;
  last: string;
  gender: 'MALE' | 'FEMALE' | 'NONBINARY' | 'TRANSGENDER' | 'OTHER';
  userType: string[];
  bio: string;
}

interface useOnboardingStore {
  generalForm: generalForm | null;
  updateGeneralForm: (values: generalForm) => void;
}

export const useOnboardingStore = create<useOnboardingStore>()(
  persist(
    (set) => ({
      generalForm: null,
      updateGeneralForm: (values: generalForm) => set((state) => ({ generalForm: values })),
    }),
    { name: 'onboardingForm' }
  )
);
