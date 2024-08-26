"use client";

import { useState } from "react";
import ChoosePlan from "./ui/steps/ChoosePlan";
import ChoosePaymentMethodStep from "./ui/steps/ChoosePaymentMethodStep";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Header from "./ui/components/Header";
import Footer from "./ui/components/Footer";
import WelcomeStep from "./ui/steps/WelcomeStep";

const stripeSecretKey =
  process.env.STRIPE_SECRET_KEY ||
  "sk_test_51PqI3mId23AXDIWwsBfXIomhxvFM3el4YogZnzTM9BRvmFIKpxfZKWW6XIvF7RTdyWSIdM12UVyqX2VjhImy1atd00cUJqtHmQ";
const stripePublicKey =
  process.env.STRIPE_PUBLIC_KEY ||
  "pk_test_51PqI3mId23AXDIWwujdYBjtlJWwt58tkToDnhirQEjHZwmkehtnb1vBut5Mp0SakDsc3rSQJxe9JJKfcxfrP6ZYV00PX7TTSGO";

const stripePromise = loadStripe(stripePublicKey);

// export default function Home() {
//   const [customerId, setCustomerId] = useState<string | null>(null);
//   const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
//   const [clientSecret, setClientSecret] = useState("");

//   const getContent = () => {
//     if (!subscriptionId && !customerId) {
//       return (
//         <ChoosePlan
//           setCustomerId={setCustomerId}
//           setSubscriptionId={setSubscriptionId}
//           setClientSecret={setClientSecret}
//         />
//       );
//     }

//     if (clientSecret && subscriptionId && customerId) {
//       return (
//         <Elements stripe={stripePromise} options={{ clientSecret }}>
//           <ChoosePaymentMethodStep
//             customerId={customerId}
//             clientSecret={clientSecret}
//           />
//         </Elements>
//       );
//     }
//   };

//   return <main className=" ">{getContent()}</main>;
// }

export default function Home() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleContinue = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const getCurrentStep = () => {
    if (step === 1) return <WelcomeStep onConitnue={handleContinue} />;
    // if (step === 2)
    //   return (
    //     <ChoosePlanStep setPlanData={setPlanData} onContinue={handleContinue} />
    //   );
    // if (step === 3)
    //   return (
    //     <ChoosePaymentMethodStep
    //       setPaymentData={setPaymentData}
    //       onContinue={handleContinue}
    //     />
    //   );
  };
  const hideHeader = step === 1;
  return (
    <main className="bg-bgBodyPrimary flex flex-col min-h-screen">
      <header className="bg-bgBodyPrimary flex justify-between items-center px-6 py-2 fixed top-0 w-full z-10">
        <Header
          currentStep={step}
          onBack={handleBack}
          totalSteps={totalSteps}
          hideHeader={hideHeader}
        />
      </header>
      <div className="flex-grow overflow-y-auto mt-[64px] mb-[64px]">
        {getCurrentStep()}
      </div>
    </main>
  );
}
