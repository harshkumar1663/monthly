// Animation utilities
export const getFloatAnimation = (delay: number = 0) => ({
  float: {
    duration: 3,
    delay: delay,
    repeat: Infinity,
    repeatType: "reverse" as const,
  },
});

export const getSparkleAnimation = (delay: number = 0) => ({
  sparkle: {
    duration: 1.5,
    delay: delay,
    repeat: Infinity,
    repeatType: "loop" as const,
  },
});

// Heart particle generation
export const generateHearts = (count: number = 5) => {
  const hearts = [];
  for (let i = 0; i < count; i++) {
    hearts.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 2 + 2,
    });
  }
  return hearts;
};

// Validation
export const validatePassword = (input: string, correct: string): boolean => {
  return input.toLowerCase() === correct.toLowerCase();
};

// Scroll to element
export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

// Local storage helpers
export const saveAppState = (state: any) => {
  try {
    localStorage.setItem("pixelAppState", JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save state:", error);
  }
};

export const loadAppState = () => {
  try {
    const state = localStorage.getItem("pixelAppState");
    return state ? JSON.parse(state) : null;
  } catch (error) {
    console.error("Failed to load state:", error);
    return null;
  }
};

export const clearAppState = () => {
  try {
    localStorage.removeItem("pixelAppState");
  } catch (error) {
    console.error("Failed to clear state:", error);
  }
};
