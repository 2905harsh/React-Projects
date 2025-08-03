import React from 'react'
import Options from './Options'

const Question = ({question,dispatch,answer}) => {
  return (
    <Options question={question} dispatch={dispatch} answer={answer}/>
  )
}

export default Question