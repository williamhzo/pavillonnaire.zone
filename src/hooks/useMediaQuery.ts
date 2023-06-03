'use client';

import { useState, useEffect } from 'react';

export default function useMediaQuery(query: string): boolean {
  const [isMatchingQuery, setIsMatchingQuery] = useState(false);

  function onMediaQueryChange(event: MediaQueryListEvent) {
    setIsMatchingQuery(event.matches);
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    if (mediaQuery.matches !== isMatchingQuery)
      setIsMatchingQuery(mediaQuery.matches);

    try {
      // Chrome & Firefox
      mediaQuery.addEventListener('change', onMediaQueryChange);

      return () => mediaQuery.removeEventListener('change', onMediaQueryChange);
    } catch {
      // Safari < 14, IE, Edge < 16
      mediaQuery.addListener(onMediaQueryChange);

      return () => mediaQuery.removeListener(onMediaQueryChange);
    }
  }, [isMatchingQuery, query]);

  return isMatchingQuery;
}
