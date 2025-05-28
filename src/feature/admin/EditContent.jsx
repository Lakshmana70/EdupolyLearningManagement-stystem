// import React, { useEffect, useState } from "react";
// import {
//   EditorState,
//   convertToRaw,
//   ContentState,
//   convertFromHTML,
// } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import draftToHtml from "draftjs-to-html";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   useGettopicdetailsQuery,
//   useLazyGettopicdetailsQuery,
//   useUpdatetopicMutation,
// } from "../../services/technology";

// function EditContent() {
//   const { tid, cid, topicId, contentId } = useParams();
//   const [updtopicFn] = useUpdatetopicMutation();
//   // const [gettopicdetailsFn]=useLazyGettopicdetailsQuery()
  
//   const { data, isLoading } = useGettopicdetailsQuery({
//     tid,
//     cid,
//     topicId,
//     contentId,
//   });
//  console.log("lakshmana",data)
//   const navigate = useNavigate();

//   const [topicInfo, setTopicInfo] = useState({
//     title: "",
//     shortheading: "",
//     content: "",
//     type: "",
//   });

//   const [description, setDescription] = useState(EditorState.createEmpty());
//   const [isError, setError] = useState(null);

//   useEffect(() => {
//     if (data) {
//       const blocksFromHTML = convertFromHTML(data.content || "");
//       const contentState = ContentState.createFromBlockArray(
//         blocksFromHTML.contentBlocks,
//         blocksFromHTML.entityMap
//       );

//       setTopicInfo({
//         title: data.title || "",
//         shortheading: data.shortheading || "",
//         content: data.content || "",
//         type: data.type || "",
//       });
//       setDescription(EditorState.createWithContent(contentState));
//     }
//   }, [data]);

//   const onChangeValue = (e) => {
//     setTopicInfo({
//       ...topicInfo,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const onEditorStateChange = (editorState) => {
//     setDescription(editorState);
//     const htmlContent = draftToHtml(
//       convertToRaw(editorState.getCurrentContent())
//     );
//     setTopicInfo({
//       ...topicInfo,
//       content: htmlContent,
//     });
//   };

//   const edittopic = async (event) => {
//     event.preventDefault();
//     try {
//       console.log("Updated topic data:", topicInfo);
//       await updtopicFn({ topicInfo, tid, cid, topicId, contentId });
//       navigate(`/admin/addconcept/${tid}/topicdetails/${cid}/${topicId}`);
//       // gettopicdetailsFn({tid,cid,topicId,contentId})
//     } catch (error) {
//       console.error("Error updating topic:", error);
//       setError("Failed to update topic. Please try again.");
//     }
//   };
//   const handleCancel = () => {
//     navigate(-1); 
//   };

//   return (
//     <div className="container mt-4">
//       <div className="row justify-content-center">
//         <div className="col-md-12">
//           <div className="card shadow-lg border-0 rounded">
//             <div className="card-header bg-primary text-white d-flex justify-content-between">
//               <h3 className="mb-0">Edit Content</h3>
//               <div>
//                 <button
//               className="btn  btn-sm  p-0"
//                onClick={handleCancel}
//                title="Close">
//                 <i class="bi bi-x-circle text-light fs-4 "></i>        
//              </button>
//               </div>

//             </div>
//             <div className="card-body p-4">
//               {isLoading ? (
//                 <div className="text-center">
//                   <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                 </div>
//               ) : (
//                 <form onSubmit={edittopic}>
//                   {/* Title Input */}
//                   <div className="mb-3">
//                     <label htmlFor="title" className="form-label fw-bold">
//                       Title
//                     </label>
//                     <input
//                       type="text"
//                       name="title"
//                       value={topicInfo.title}
//                       onChange={onChangeValue}
//                       className="form-control"
//                       placeholder="Enter Title"
//                       required
//                     />
//                   </div>

//                   {/* Short Heading Input */}
//                   <div className="mb-3">
//                     <label htmlFor="shortheading" className="form-label fw-bold">
//                       Short Heading
//                     </label>
//                     <input
//                       type="text"
//                       name="shortheading"
//                       value={topicInfo.shortheading}
//                       onChange={onChangeValue}
//                       className="form-control"
//                       placeholder="Enter Short Heading"
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                   <label htmlFor="type" className="form-label fw-bold">Content Type</label>
//                   <select
//                     name="type"
//                     value={topicInfo.type}
//                     onChange={onChangeValue}
//                     className="form-select"
//                     required
//                   >
//                     <option value="">Select content type</option>
//                     <option value="Description">Description</option>
//                     <option value="Video">Video</option>
//                     <option value="Practise-questions">Practice Questions</option>
//                     <option value="Assignments">Assignments</option>
//                     <option value="Examples">Examples</option>
//                     <option value="Quiz">Quiz</option>
//                     <option value="Projects">Projects</option>
//                   </select>
//                 </div>

//                   {/* Rich Text Editor */}
//                   <div className="mb-3">
//                     <label htmlFor="content" className="form-label fw-bold">
//                       Description
//                     </label>
//                     <div className="border p-2 rounded bg-light">
//                       <Editor
//                         editorState={description}
//                         toolbarClassName="toolbarClassName"
//                         wrapperClassName="wrapperClassName"
//                         editorClassName="editorClassName"
//                         onEditorStateChange={onEditorStateChange}
//                       />
//                     </div>
//                     <textarea
//                       readOnly
//                       className="form-control mt-3"
//                       rows="5"
//                       value={topicInfo.content}
//                     />
//                   </div>

//                   {/* Error Message */}
//                   {isError && <div className="alert alert-danger">{isError}</div>}

//                   {/* Submit Button */}
//                   <div className="text-center">
//                     <button type="submit" className="btn btn-success w-100">
//                       <i className="bi bi-pencil-square me-2"></i>Update
//                     </button>
//                   </div>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditContent;
import React, { useEffect, useState } from "react";
import {
  EditorState,
  convertToRaw,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs"; // Importing for better HTML conversion
import { useParams, useNavigate } from "react-router-dom";
import {
  useGettopicdetailsQuery,
  useUpdatetopicMutation,
} from "../../services/technology";

function EditContent() {
  const { tid, cid, topicId, contentId } = useParams();
  const [updtopicFn] = useUpdatetopicMutation();
  const { data, isLoading } = useGettopicdetailsQuery({ tid, cid, topicId, contentId });

  const navigate = useNavigate();

  const [topicInfo, setTopicInfo] = useState({
    title: "",
    shortheading: "",
    content: "",
    type: "",
  });

  const [description, setDescription] = useState(EditorState.createEmpty());
  const [isError, setError] = useState(null);

  useEffect(() => {
    if (data) {
      const blocksFromHTML = htmlToDraft(data.content || "");
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );

      setTopicInfo({
        title: data.title || "",
        shortheading: data.shortheading || "",
        content: data.content || "",
        type: data.type || "",
      });

      setDescription(EditorState.createWithContent(contentState));
    }
  }, [data]);

  const onChangeValue = (e) => {
    setTopicInfo({
      ...topicInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onEditorStateChange = (editorState) => {
    setDescription(editorState);

    const rawContentState = convertToRaw(editorState.getCurrentContent());

    // Ensure image width/height are retained
    Object.keys(rawContentState.entityMap).forEach((key) => {
      if (rawContentState.entityMap[key].type === "IMAGE") {
        const imageData = rawContentState.entityMap[key].data;
        imageData.width = imageData.width || "100%"; // Default width
        imageData.height = imageData.height || "auto"; // Default height
      }
    });

    const htmlContent = draftToHtml(rawContentState);
    setTopicInfo({
      ...topicInfo,
      content: htmlContent,
    });
  };

  const edittopic = async (event) => {
    event.preventDefault();
    try {
      console.log("Updated topic data:", topicInfo);
      await updtopicFn({ topicInfo, tid, cid, topicId, contentId });
      navigate(`/admin/addconcept/${tid}/topicdetails/${cid}/${topicId}`);
    } catch (error) {
      console.error("Error updating topic:", error);
      setError("Failed to update topic. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card shadow-lg border-0 rounded">
            <div className="card-header bg-primary text-white d-flex justify-content-between">
              <h3 className="mb-0">Edit Content</h3>
              <button className="btn btn-sm p-0" onClick={handleCancel} title="Close">
                <i className="bi bi-x-circle text-light fs-4"></i>
              </button>
            </div>
            <div className="card-body p-4">
              {isLoading ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={edittopic}>
                  {/* Title Input */}
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-bold">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={topicInfo.title}
                      onChange={onChangeValue}
                      className="form-control"
                      placeholder="Enter Title"
                      required
                    />
                  </div>

                  {/* Short Heading Input */}
                  <div className="mb-3">
                    <label htmlFor="shortheading" className="form-label fw-bold">
                      Short Heading
                    </label>
                    <input
                      type="text"
                      name="shortheading"
                      value={topicInfo.shortheading}
                      onChange={onChangeValue}
                      className="form-control"
                      placeholder="Enter Short Heading"
                      required
                    />
                  </div>

                  {/* Content Type Dropdown */}
                  <div className="mb-3">
                    <label htmlFor="type" className="form-label fw-bold">
                      Content Type
                    </label>
                    <select
                      name="type"
                      value={topicInfo.type}
                      onChange={onChangeValue}
                      className="form-select"
                      required
                    >
                      <option value="">Select content type</option>
                      <option value="Description">Description</option>
                      <option value="Video">Video</option>
                      <option value="Practise-questions">Practice Questions</option>
                      <option value="Assignments">Assignments</option>
                      <option value="Examples">Examples</option>
                      <option value="Quiz">Quiz</option>
                      <option value="Projects">Projects</option>
                    </select>
                  </div>

                  {/* Rich Text Editor */}
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label fw-bold">
                      Description
                    </label>
                    <div className="border p-2 rounded bg-light">
                      <Editor
                        editorState={description}
                        toolbar={{
                          image: {
                            uploadEnabled: true,
                            previewImage: true,
                            defaultSize: { width: "100%", height: "auto" },
                          },
                        }}
                        onEditorStateChange={onEditorStateChange}
                      />
                    </div>
                    <textarea
                      readOnly
                      className="form-control mt-3"
                      rows="5"
                      value={topicInfo.content}
                    />
                  </div>

                  {/* Error Message */}
                  {isError && <div className="alert alert-danger">{isError}</div>}

                  {/* Submit Button */}
                  <div className="text-center">
                    <button type="submit" className="btn btn-success w-100">
                      <i className="bi bi-pencil-square me-2"></i>Update
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditContent;
