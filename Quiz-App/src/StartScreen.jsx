import React from 'react'
const StartScreen = ({noOfQuestions,dispatch}) => {
  return (
    <div className="start">
      <h2>Welcome to React Quiz</h2>
      <h3>{noOfQuestions} Questions to test your React Mastery.</h3>
      <button className='btn btn-ui' onClick={()=>dispatch({type:"start"})}>Let's Start the Quiz if you are Ready.</button>
    </div>
  )
}
export default StartScreen
