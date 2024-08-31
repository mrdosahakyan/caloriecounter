const UnvisiblePaymentInfo = () => {
  const supportEmail = process.env.SUPPORT_EMAIL || "support@example.com";
  const moneyBackPolicyLink = process.env.MONEY_BACK_POLICY_LINK || "#";

  return (
    <>
      <div className="font-roboto text-[11px] font-normal leading-[16.5px] tracking-[0.0044em] text-justify bg-[#FFF5E5] py-2">
        Your plan will be available immediately after registration. Today you
        will be charged 6,99$ for 7-days trial, then 29,99$ after trial for your
        1-month plan. You can cancel anytime before then and will not be charged
        the next payment. No hidden payments. AI Tracker will automatically
        charge your card every billing period so you don&apos;t lose access to
        your account. No refunds or credits except if you don&apos;t get any
        results and follow our{" "}
        <a href={moneyBackPolicyLink} className=" underline">
          money-back policy
        </a>
        . To cancel, simply let us know:{" "}
        <a href="mailto:support@example.com" className=" underline">
          {supportEmail}
        </a>
        .
      </div>
    </>
  );
};

export default UnvisiblePaymentInfo;
