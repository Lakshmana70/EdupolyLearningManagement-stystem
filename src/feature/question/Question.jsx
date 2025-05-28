import React from 'react'
import QuestionAnswer from './QuestionAnswer'
import QuestionOptions from './QuestionOptions'
import QuestionTechnology from './QuestionTechnology'
import QuestionTitle from './QuestionTitle'
import QuestionTopic from './QuestionTopic'
import {  convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import parse from 'html-react-parser'

function Question() {
  const [question, setQuestion] = React.useState({
    title:'',
    options:['','','',''],
    answer:'',
    technology:'',
    topic:'',
    level:1
  })
  React.useEffect(()=>{
    console.log(question)
  },[question])
  function handleQuestionTitle(title){
    setQuestion({...question,title:title})
  }
  function handleAnswer(answer){
    console.log(answer)
    setQuestion({...question,answer:answer})
  }
  function handleTechnology(technology){
    setQuestion({...question,technology:technology})
  }
  function handleTopic(topic){
    setQuestion({...question,topic:topic})
  }
  function handleOptions(option,i){
    var temp = [...question.options];
    temp[i]=option;
    setQuestion({...question,options:[...temp]})
  }
  function addQuestion(){
    console.log(question)
  }
  return (
    <div className='d-flex flex-wrap'>
      <div className='w-6 border p-2'>
        <QuestionTechnology handleTechnology={handleTechnology}></QuestionTechnology>
        <QuestionTopic handleTopic={handleTopic}></QuestionTopic>
        <QuestionTitle title={question.title} handleQuestionTitle={handleQuestionTitle}></QuestionTitle>
        <QuestionOptions options={question.options} handleOptions={handleOptions}></QuestionOptions>
        <QuestionAnswer options={question.options}  handleAnswer={handleAnswer}></QuestionAnswer>
        <button onClick={addQuestion}>see</button>
      </div>
      <div className='w-4 border p-2'>
        <i>Preview</i>
        <h4>Technology:{question.technology}</h4>
        <h1>Topic:{question.topic}</h1>
        <p className='border'>
          <b>Question:</b>
          {question.title && parse(draftToHtml(convertToRaw(question.title.getCurrentContent())))}
        </p>
        <p className='border'>
          <b>Options:</b>
          <ol>
          {
            question.options && question.options.map((option,i)=>{
              return(
                <li className={question.answer!=='' && i==question.answer?'bg-success':''}>
                  {option && parse(draftToHtml(convertToRaw(option.getCurrentContent())))}
                </li>
              )
            })
          }
          </ol>
        </p>
      </div>
    </div>
  )
}

export default Question