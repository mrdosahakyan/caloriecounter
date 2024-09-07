import mixpanel from "mixpanel-browser";

const mixpanelToken = process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN || "";

export const generateFakeUserId = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const getUserId = (): string | null => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    // Only run if window and localStorage are available
    try {
      let userId = localStorage.getItem("mixpanelUserId");
      if (!userId) {
        userId = generateFakeUserId();
        localStorage.setItem("mixpanelUserId", userId); // Store in localStorage
      }
      return userId; // Return the user ID
    } catch (err) {
      console.error("Error accessing localStorage:", err);
      return null; // Return null if any error occurs
    }
  }
  return null; // Return null if localStorage is not available (e.g., server-side)
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
    const userId = getUserId(); // Get the user ID safely
    if (userId) {
      mixpanel.identify(userId);
      console.log(`Mixpanel initialized with user ID: ${userId}`);
    } else {
      console.warn("User ID not available (possibly server-side render)");
    }
  }
};
