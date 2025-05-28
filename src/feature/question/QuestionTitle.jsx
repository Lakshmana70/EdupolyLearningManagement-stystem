import React,{ useState } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import parse from 'html-react-parser'

function QuestionTitle({title='',handleQuestionTitle}) {
  var [showToolBar,setShowToolBar]=useState(true)
  return (
    <div className='p-2 border border-2 border-primary'>
      <b>Question Content</b>
      <Editor
        wrapperClassName="demo-wrapper"
        onEditorStateChange={handleQuestionTitle}
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  )
}
export default QuestionTitle