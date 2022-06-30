import { useEffect, useState } from "react";


function useScroll () {
  const [state, setState] = useState<'UP'|'DOWN'|null>();



  useEffect(()=>{
    let prevPos = 0;

    const checkScrollDirection = ()=>{
      const nowPos = window.pageYOffset;
      if(prevPos > nowPos){
        setState('DOWN')
      }else if(prevPos < nowPos){
        setState('UP')
      }
      prevPos = nowPos
    }
    window.addEventListener('scroll', checkScrollDirection)
    return ()=>{window.removeEventListener('scroll', checkScrollDirection)}
  },[])

  return state;
}

export default useScroll;