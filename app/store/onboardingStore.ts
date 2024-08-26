import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";

export type TOnboardingData = {
  stripeCustomerId: string | null;
  subscriptionId: string | null;
  clientSecret: string;
  // Add other fields as needed
};

interface OnboardingStore {
  onboardingData: TOnboardingData;
  setOnboardingData: (data: Partial<TOnboardingData>) => void;
  resetOnboardingData: () => void;
}

const initialState: TOnboardingData = {
  stripeCustomerId: null,
  subscriptionId: null,
  clientSecret: "",
  // Initialize other fields
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      onboardingData: initialState,
      setOnboardingData: (data: Partial<TOnboardingData>) =>
        set((state) => ({
          onboardingData: { ...state.onboardingData, ...data },
        })),
      resetOnboardingData: () => set({ onboardingData: initialState }),
    }),
    {
      name: "onboarding-storage", // Name of the storage
      //   storage: createJSONStorage(() => sessionStorage as StateStorage), // Use session storage
      //   partialize: (state) => ({ onboardingData: state.onboardingData }), // Only store the necessary part of the state
    }
  )
);
