"use client";

import { Spinner } from "@nextui-org/react";

const PageSpinner = () => {
  return (
    <div className="h-svh w-full flex flex-col justify-center items-center">
      <Spinner color="current" size="lg" className="mt-auto mb-auto" />
    </div>
  );
};

export default PageSpinner;
