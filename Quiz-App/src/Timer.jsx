import React, { useEffect } from 'react'

const Timer = ({dispatch , secondsRemaining}) => {
  const minutes = Math.floor(secondsRemaining/60);
  const seconds = secondsRemaining%60;
  useEffect(()=>{
    const id = setInterval(()=>{
         dispatch({type :"tick"})
    },1000);

    // clean Up Function 
    return ()=> clearInterval(id);

  },[dispatch])
  return (
    <div className='timer'>
      <strong>Remaining Time </strong>
      {minutes<10 && "0"}
      {minutes}
      :
      {seconds<10 && "0"}
      {seconds}
    </div>
  )
}

export default Timer