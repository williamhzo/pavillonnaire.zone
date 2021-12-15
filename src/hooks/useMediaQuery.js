import { useState, useEffect } from "react";

/**
 *  Hook for using media queries for conditional rendering.
 */
export default function useMediaQuery(query) {
  const [isMatchingQuery, setIsMatchingQuery] = useState(false);

  function onMediaQueryChange(event) {
    setIsMatchingQuery(event.matches);
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    if (mediaQuery.matches !== isMatchingQuery)
      setIsMatchingQuery(mediaQuery.matches);

    try {
      // Chrome & Firefox
      mediaQuery.addEventListener("change", onMediaQueryChange);

      return () => mediaQuery.removeEventListener("change", onMediaQueryChange);
    } catch {
      // Safari < 14, IE, Edge < 16
      mediaQuery.addListener(onMediaQueryChange);

      return () => mediaQuery.removeListener(onMediaQueryChange);
    }
  }, []);

  return isMatchingQuery;
}
