import { useState } from "react"

export type userAgent = "APP" | 'WEB'

function useUserAgent ():userAgent {
  const [state] = useState(window.navigator.userAgent);
  return state === 'SOCIALDOG_APP' ? 'APP':'WEB'
}

export default useUserAgent