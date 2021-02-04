import React, { useEffect, useState } from 'react';
import './App.css';
import { getQuizDetails } from './services/quiz_services'
import { QuestionType,  } from './Types/quiz_types'
import QustionCard from './components/QuestionCard'

function App() {

  let [quiz, setquiz] = useState<QuestionType[]>([])
  let [currentStep, setCurrentStep] = useState(0)
  let [score, setScore] = useState(0)
  let [showResult, setShowResult] = useState(false)

  useEffect(() => {

    async function fetchData() {

      const questions: QuestionType[] = await getQuizDetails(5, 'easy');
      console.log(questions)
      setquiz(questions)
    }
    fetchData();

  }, [])

  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();

    const currentQuestion: QuestionType = quiz[currentStep]

    console.log("correct ans: " + currentQuestion.correct_answer + "--user Selection :" + userAns)


    if (userAns === currentQuestion.correct_answer) {

      setScore(++score)
    }

    if (currentStep !== quiz.length - 1)
      setCurrentStep(++currentStep)
    else {
      // alert(" YOUR FINAL SCORE IS : " + score + "OUT OF : " + quiz.length)
      setShowResult(true)
    }
  }

  if (!quiz.length)
    return <h3>Looding ..</h3>
  if (showResult) {
    return (
      <div className={"question_Container result-container"}>
        <h1>Result</h1>
        <p>YOUR FINAL SCORE IS
           <b>  {score}</b> OUT OF  <b>{quiz.length}</b>
        </p>
      </div>
    )
  }
  return (
    <div className="App">

      <h1>Quiz App</h1>
      <QustionCard

        options={quiz[currentStep].option}
        question={quiz[currentStep].question}
        callback={handleSubmit}

      />
    </div>
  );
}

export default App;
