import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = uuidv4();
      localStorage.setItem("userId", newUserId);
      setUserId(newUserId);
    }
  }, []);

  return userId;
};

export default useUserId;
