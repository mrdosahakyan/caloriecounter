import { create } from "zustand";
// import { persist } from "zustand/middleware";

export interface IHeightWeight {
  height: string;
  weight: string;
  isMetric: boolean;
}

export type TOnboardingData = {
  stripeCustomerId: string | null;
  subscriptionId: string | null;
  clientSecret: string;
  goal: string;
  gender: string;
  birthYear: string;
  heightWeight: IHeightWeight;
  activityLevel: string;
  experienceLevel: string;
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
  goal: "",
  gender: "",
  birthYear: "2002",
  heightWeight: {
    height: "169cm",
    weight: "53kg",
    isMetric: true,
  },
  activityLevel: "sedentary",
  experienceLevel: "beginner",
};

export const useOnboardingStore = create<OnboardingStore>()(
  // persist(
  (set) => ({
    onboardingData: initialState,
    setOnboardingData: (data: Partial<TOnboardingData>) =>
      set((state) => ({
        onboardingData: { ...state.onboardingData, ...data },
      })),
    resetOnboardingData: () => set({ onboardingData: initialState }),
  })
  // {
  //   // name: "onboarding-storage", // Name of the storage
  //   //   storage: createJSONStorage(() => sessionStorage as StateStorage), // Use session storage
  //   //   partialize: (state) => ({ onboardingData: state.onboardingData }), // Only store the necessary part of the state
  // }
);
// );
