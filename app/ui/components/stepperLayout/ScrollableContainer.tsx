import { FC, ReactNode } from "react";

const ScrollableContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="flex-1 overflow-y-auto py-2">{children}</div>;
};

export default ScrollableContainer;
