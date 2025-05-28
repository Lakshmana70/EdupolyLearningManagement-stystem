import React from 'react'

function QuestionTechnology({handleTechnology}) {
  return (
    <div className='p-3'>
      <input className="form-control" type="text" placeholder='Enter the Technology' onChange={(e)=>{handleTechnology(e.target.value)}}/>
    </div>
  )
}

export default QuestionTechnology