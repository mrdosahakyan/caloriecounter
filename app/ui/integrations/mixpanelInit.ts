import mixpanel from "mixpanel-browser";
import { v4 as uuidv4 } from "uuid";

const mixpanelToken = process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN || "";

const getUserId = (): string | null => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    try {
      let userId = localStorage.getItem("userId");
      if (!userId) {
        const newUserId = uuidv4();
        localStorage.setItem("userId", newUserId);
      }
      return userId;
    } catch (err) {
      console.error("Error accessing localStorage:", err);
      return null;
    }
  }
  return null;
};

export const initializeMixpanel = (): void => {
  if (!mixpanelToken) {
    console.warn("Mixpanel token is missing");
    return;
  }

  mixpanel.init(mixpanelToken, {
    debug: true,
    track_pageview: false,
    persistence: "localStorage",
  });

  if (typeof window !== "undefined") {
    const userId = getUserId();
    if (userId) {
      mixpanel.identify(userId);
    } else {
      console.warn("User ID not available to initialize Mixpanel");
    }
  }
};
