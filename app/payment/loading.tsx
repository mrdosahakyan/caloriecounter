import { Spinner } from "@nextui-org/react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="full-height w-full flex flex-col justify-center items-center">
      <Spinner size="lg" className="mt-auto mb-auto" />
    </div>
  );
}
