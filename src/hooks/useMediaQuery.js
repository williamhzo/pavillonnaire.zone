import { useEffect, useState } from 'react'

export default function useMediaQuery(query) {
  const [isMatchingQuery, setIsMatchingQuery] = useState(false)

  function onMediaQueryChange(event) {
    setIsMatchingQuery(event.matches)
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    if (mediaQuery.matches !== isMatchingQuery)
      setIsMatchingQuery(mediaQuery.matches)

    mediaQuery.addEventListener('change', onMediaQueryChange)

    return () => mediaQuery.removeEventListener('change', onMediaQueryChange)
  }, [])

  return isMatchingQuery
}
