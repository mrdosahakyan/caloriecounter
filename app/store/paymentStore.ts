import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type TPaymentData = {
  stripeCustomerId: string | null;
  subscriptionId: string | null;
  clientSecret: string;
};

interface PaymentStore {
  paymentData: TPaymentData;
  setPaymentData: (data: Partial<TPaymentData>) => void;
  resetPaymentData: () => void;
}

const initialPaymentState: TPaymentData = {
  stripeCustomerId: null,
  subscriptionId: null,
  clientSecret: "",
};

export const usePaymentStore = create<PaymentStore>()(
  //   persist(
  (set) => ({
    paymentData: initialPaymentState,
    setPaymentData: (data: Partial<TPaymentData>) =>
      set((state) => ({
        paymentData: { ...state.paymentData, ...data },
      })),
    resetPaymentData: () => set({ paymentData: initialPaymentState }),
  })
  // {
  //   name: "payment-storage", // Name of the storage
  //   storage: createJSONStorage(() => sessionStorage), // Use session storage for payment data
  //   partialize: (state) => ({ paymentData: state.paymentData }), // Only store the payment data part of the state
  // }
  //   )
);
