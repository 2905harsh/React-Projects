import React, { useEffect, useReducer } from 'react'
import Header from './Header'
import Center from './Center'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Question from './Question'
import NextButton from './NextButton'
import Progress from './Progress'
import FinishScreen from './FinishScreen'
import Timer from './Timer'
import Footer from './Footer'


const initialState = {
  questions:[],
  index:0,
  //'loading','error','ready','active','finished'
  status :"loading",
  answer : null,
  points : 0,
  secondsRemaining : null,

}
const SECS_PER_QUESTION = 30;

function reducer(state,action){
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions : action.payload,
        status :'ready',
      }
    
    case "dataFailed":
      return{
        ...state,
        status :"error",
      }
    
    case "start":
      return {
        ...state,
        status : "active",
        secondsRemaining : state.questions.length * SECS_PER_QUESTION , 
      }

    case "newAnswer":

      const question = state.questions.at(state.index);

      return{
        ...state,
        answer:action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points , 
      }

      case "nextQuestion":
        return {...state , index:state.index+1 , answer:null}

      case 'finish':
        return {...state , status:"finish"}
      
      case "restart":
        return {
          ...initialState , status:"ready" , questions:state.questions
        }
      case "tick":
        return{
          ...state , secondsRemaining:state.secondsRemaining-1 ,  status: state.secondsRemaining===0?'finish':state.status,
        }


      default:
      throw new Error('Action Unknown');
  }
}

const App = () => {
  const [state , dispatch] = useReducer(reducer,initialState);
  useEffect(()=>{
    fetch("http://localhost:9000/questions")
    .then((res)=>res.json())
    .then((data)=>dispatch({type : "dataReceived" , payload : data}))
    .catch((err)=> dispatch({type : "dataFailed"}))

  },[])
  const noOfQuestions = state.questions.length;
  let maxPossiblePoints = 0;
  for(var i = 0 ; i<noOfQuestions ; i++){
   maxPossiblePoints+=state.questions[i].points;
  }
  return (
    <div className='app'>
      <Header/>
      <Center>
          {state.status==='loading' && <Loader/>}
          {state.status==='error' && <Error/>}
          {state.status==='ready' && <StartScreen noOfQuestions={noOfQuestions} dispatch={dispatch}/>}

          {state.status==='active' && (
            <>
            <Progress noOfQuestions={noOfQuestions} index={state.index} points={state.points} maxPossiblePoints={maxPossiblePoints} answer={state.answer}/>
            <Question question ={state.questions[state.index]} dispatch={dispatch} answer ={state.answer}/>
            <Footer>
             <Timer dispatch={dispatch} secondsRemaining={state.secondsRemaining}/>
             <NextButton dispatch ={dispatch} answer = {state.answer} index={state.index} noOfQuestions={noOfQuestions} />
            </Footer>
            
            </>
        )} 

        {state.status === "finish" && <FinishScreen points={state.points} maxPossiblePoints={maxPossiblePoints} dispatch={dispatch}/>}
 
      </Center>


    </div>
  )
}

export default App
