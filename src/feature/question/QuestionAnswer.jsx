import React from 'react'

function QuestionAnswer({handleAnswer}) {
  return (
    <div>
      QuestionAnswer
      <select onChange={(e)=>{handleAnswer(e.target.value)}}>
        <option disabled selected>Please select</option>
        <option value={0}>1</option>
        <option value={1}>2</option>
        <option value={2}>3</option>
        <option value={3}>4</option>
      </select>
    </div>
  )
}

export default QuestionAnswer