import React from 'react'

const Progress = ({noOfQuestions,index,points,maxPossiblePoints,answer}) => {
  return (
    <header className='progress'>
      <progress max={noOfQuestions} value={index +Number(answer !==null)}/>
       <p>
         Question <strong>{index+1}</strong>/{noOfQuestions}
       </p>
       <p>{points}/{maxPossiblePoints}</p>
    </header>
  )
}

export default Progress
