import React, { useState, useRef } from 'react';
import { testList } from './testList';
import { Question } from './Question';

const colors = [
  "#F000FF", 
  "#FFA500", 
  "#FFFF00", 
  "#008000", 
  "#0000FF", 
  "#4B0082", 
  "#8B00FF", 
];

function App() {
  const scoreRef = useRef(0)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [randomBackGround, setRandomBackGround] = useState('')
  const [message, setMessage] = useState('')
  const failAudio = new Audio('/audios/fail.mp3')
  const successAudio = new Audio('/audios/success.mp3')

  const getRandomNumber = (max: number) => {
    return Math.floor(Math.random() * max)
  }

  const getRandomGradient = () => {
    
    const color1 = colors[getRandomNumber(colors.length)];
    const color2 = colors[getRandomNumber(colors.length)];
    const color3 = colors[getRandomNumber(colors.length)];
    const randomAngle = getRandomNumber(360);
  
    setRandomBackGround(`linear-gradient(${randomAngle}deg, ${color1}, ${color2}, ${color3})`)
  }

  const buttonClick = ({ ans, userAns }:{ans: string, userAns: string}) => {
  
    checkAnswer({ ans, userAns })
  
    if (currentQuestion >= 5) {
      if (scoreRef.current === 5) {
        successAudio.play()
        setMessage("You win the game because you answered them all correctly!")
      } else {
        setMessage("More harder! You can win the game by all correct!")
      }
      setTimeout(()=>{
        resetAll()
      }, 3000)
    } else {
      setTimeout(()=>{
        setRandomBackGround('')
        setMessage('')
        setCurrentQuestion(prev => prev += 1)
      }, 3000)
    }
  }

  const checkAnswer = ({ ans, userAns }:{ans: string, userAns: string}) =>{
    if (ans === userAns) {
      scoreRef.current += 1
      setMessage("You had one job!")
    } else {
      getRandomGradient()
      failAudio.play()
      setMessage(`Come on!! Even a potato could guess better. The answer is (${ans})`)
    }
  }

  const resetAll = () => {
    setCurrentQuestion(1)
    scoreRef.current = 0
    setRandomBackGround('')
    setMessage('')
  }

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      backgroundImage: randomBackGround
    }}>
      <div style={{fontSize: '24px', color: 'red', fontWeight: 'bold'}}>
        {message}
      </div>
      <div style={{display: 'flex', fontWeight: 'bold', fontSize: '30px', marginBottom: '20px'}}>
        <div>Your score:</div>
        <div>{scoreRef.current}/5</div>
      </div>
      {testList.map((data)=>(
        <div key={data.id}>
          {(currentQuestion === data.id) && (
            <Question 
              id={data.id}
              value={data.value}
              ans={data.ans}
              section={data.selection}
              buttonClick={buttonClick}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
