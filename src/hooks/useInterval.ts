import { useEffect, useRef } from 'react'

type Delay = number | null

export function useInterval (callback: () => void, delay: Delay) {
  const savedCallback = useRef<typeof callback>(() => {})

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // setup interval
  useEffect(() => {
    const tick = () => {
      if (typeof savedCallback?.current !== 'undefined') {
        savedCallback?.current()
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
