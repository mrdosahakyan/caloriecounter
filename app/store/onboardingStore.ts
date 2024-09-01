import { create } from "zustand";
// import { persist } from "zustand/middleware";

export interface IHeightWeight {
  height: string;
  weight: string;
  isMetric: boolean;
}

export type TOnboardingData = {
  goal: string;
  gender: string;
  birthYear: string;
  heightWeight: IHeightWeight;
  activityLevel: string;
  experienceLevel: string;
};

interface OnboardingStore {
  onboardingData: TOnboardingData;
  setOnboardingData: (data: Partial<TOnboardingData>) => void;
  resetOnboardingData: () => void;
}

const initialState: TOnboardingData = {
  goal: "",
  gender: "",
  birthYear: "2002",
  heightWeight: {
    height: "169cm",
    weight: "53kg",
    isMetric: true,
  },
  activityLevel: "",
  experienceLevel: "",
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
