import React,{useState} from 'react'
import { Editor } from 'react-draft-wysiwyg';

function QuestionOptions({options,handleOptions}) {
  var [showToolBar,setShowToolBar]=useState(true)

  return (
    <div className='p-1 border'>
      QuestionOptions
      <br />
      {
        options.map((option,i)=>(
          <div className='border'>
              <Editor 
                wrapperClassName="demo-wrapper"
                onEditorStateChange={(x)=>{handleOptions(x,i)}}
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
          </div>
          ))
      }
    </div>
  )
}

export default QuestionOptions