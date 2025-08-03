import React from 'react'

const NextButton = ({dispatch,answer,index,noOfQuestions}) => {
  if(answer === null) return null;
  if(index<noOfQuestions-1){
    return (
     <button className='btn btn-ui' onClick={()=>{
      dispatch({type :'nextQuestion'})
     }}>
      Next Button
     </button>
  )
  }
  if(index===noOfQuestions-1){
    return (
     <button className='btn btn-ui' onClick={()=>{
      dispatch({type :'finish'})
     }}>
      Finish
     </button>
  )
  }

}

export default NextButton