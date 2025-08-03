import React from 'react'

const FinishScreen = ({points,maxPossiblePoints,dispatch}) => {
  const percentage = (points/maxPossiblePoints)*100;
  return (
    <>
    <p className='result'>
        You Scored <strong>{points}</strong> out of {maxPossiblePoints} 
        ({Math.ceil(percentage)}%)
    </p>
    <button className='btn btn-ui' onClick={()=>{
      dispatch({type :'restart'})

     }}>
      Restart Quiz
     </button>
    </>
      
      

  )
}

export default FinishScreen