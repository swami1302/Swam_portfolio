"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { MotionConfig } from "framer-motion";

type MotionContextType = {
  isMotionEnabled: boolean;
  toggleMotion: () => void;
};

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [isMotionEnabled, setIsMotionEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("motion-enabled");
    if (saved !== null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsMotionEnabled(saved === "true");
    }
  }, []);

  const toggleMotion = () => {
    setIsMotionEnabled((prev) => {
      const newValue = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("motion-enabled", String(newValue));
      }
      return newValue;
    });
  };

  const contextValue = useMemo(() => ({
    isMotionEnabled,
    toggleMotion
  }), [isMotionEnabled]);

  return (
    <MotionContext.Provider value={contextValue}>
      <MotionConfig reducedMotion={isMotionEnabled ? "never" : "always"}>
        <div className={isMotionEnabled ? "motion-safe" : "motion-reduce"}>
          {children}
        </div>
      </MotionConfig>
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (context === undefined) {
    throw new Error("useMotion must be used within a MotionProvider");
  }
  return context;
}
