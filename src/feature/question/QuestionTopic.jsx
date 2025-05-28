import React from 'react'

function QuestionTopic({handleTopic}) {
  return (
    <div className='p-3'>
      <input className='form-control' type="text" onChange={(e)=>{handleTopic(e.target.value)}} placeholder="enter the topic"/>
    </div>
  )
}

export default QuestionTopic