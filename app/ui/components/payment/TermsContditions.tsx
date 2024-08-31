const TermsConditions = () => {
    const termsOfServiceLink = process.env.TERMS_OF_SERVICE_LINK || "#";
    const privacyPolicyLink = process.env.PRIVACY_POLICY_LINK || "#";
  
    return (
      <>
        <div className="font-roboto text-[11px] font-normal leading-[16.5px] tracking-[0.0044em] text-center bg-[#FFF5E5] mt-1 mb-2">
          By proceeding, you acknowledge and agree to our{" "}
          <a href={termsOfServiceLink} className="underline">
            Terms of Service
          </a>{" "}
          &{" "}
          <a href={privacyPolicyLink} className="underline">
            Privacy Policy
          </a>
          .
        </div>
     
      </>
    );
  };
  
  export default TermsConditions;
  