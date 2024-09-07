import { useEffect, useRef } from "react";

const useDidMount = (callback: () => void) => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      callback();
      hasRun.current = true;
    }
  }, []);
};

export default useDidMount;
