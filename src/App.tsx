import React, { useState, useRef } from 'react';
import { testList } from './testList';
import { Question } from './Question';

function App() {
  const scoreRef = useRef(0)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const failAudio = new Audio('/audios/fail.mp3')
  const successAudio = new Audio('/audios/success.mp3')

  const buttonClick = ({ ans, userAns }:{ans: string, userAns: string}) => {
    checkAns({ ans, userAns })
  
    if (currentQuestion >= 5) {
      if (scoreRef.current === 5) {
        successAudio.play()
        alert("You win the game because you answered them all correctly!")
      } else {
        alert("More harder! You can win the game by all correct!")
      }
      setCurrentQuestion(1)
      scoreRef.current = 0
    } else {
      setCurrentQuestion(prev => prev += 1)
    }
  }

  const checkAns = ({ ans, userAns }:{ans: string, userAns: string}) =>{
    if (ans === userAns) {
      scoreRef.current += 1
      alert("You had one job!")
    } else {
      failAudio.play()
      alert(`Come on!! Even a potato could guess better. The answer is ${ans}`)
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh'}}>
      <div style={{display: 'flex', fontWeight: 'bold', fontSize: '30px', marginBottom: '20px'}}>
        <div>Your score:</div>
        <div>{scoreRef.current}/5</div>
      </div>
      {testList.map((data)=>(
        <>
          {(currentQuestion === data.id) && (
            <Question 
              key={data.id} 
              id={data.id}
              value={data.value}
              ans={data.ans}
              section={data.selection}
              buttonClick={buttonClick}
            />
          )}
        </>
      ))}
    </div>
  );
}

export default App;
