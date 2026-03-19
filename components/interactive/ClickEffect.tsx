"use client";

import { useEffect } from "react";

export function ClickEffect() {
  useEffect(() => {
    const handleMouseDown = () => {
      document.body.classList.add("clicking");
    };
    
    const handleMouseUp = () => {
      document.body.classList.remove("clicking");
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return null;
}
