/**
 * filename: useIsMobile.js
 *
 * description: Custom React hook that returns true when the viewport width is below
 * the given breakpoint (default 640px). Uses matchMedia for efficient resize listening
 * so components can branch their styles for mobile vs desktop.
 */
 
import { useState, useEffect } from "react";
 
export function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < breakpoint
  );
 
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
 
  return isMobile;
}