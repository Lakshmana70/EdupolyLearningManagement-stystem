import React, { useEffect, useState } from 'react';
import { useEdittopicMutation, useLazyGettechnologyQuery,  useTopicdetailsQuery } from '../../services/technology';
import { useNavigate, useParams } from 'react-router-dom';

function EditTopic({ setIsEditing }) {
  const [gettechFN] = useLazyGettechnologyQuery();
  const [edittopicFn] = useEdittopicMutation();
  const { tid, cid, topicid } = useParams();
  const navigate = useNavigate();
  
  const [topicInfo, setTopicInfo] = useState({
    title: '',
    shortheading: '',
  });

  // Fetch topic details
  const { data } = useTopicdetailsQuery({ tid, cid });
  

  useEffect(() => {
    if (data?.concepts) {
      const foundTopic = data.concepts
        .flatMap(concept => concept.topics)
        .find(topic => topic._id === topicid);

      if (foundTopic) {
        setTopicInfo({
          title: foundTopic.title || '',
          shortheading: foundTopic.shortheading || '',
        });
      }
    }
  }, [data, topicid]);

  // Handle Input Changes
  const onChangeValue = (e) => {
    setTopicInfo({
      ...topicInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Edit Submission
  const editTopic = async (event) => {
    event.preventDefault();
    try {
      await edittopicFn({ topicInfo, tid, cid, topicid });
      await gettechFN(tid);
      navigate(`/admin/addconcept/${tid}`);
      setIsEditing(false);
    } catch (error) {
      console.error('Error in editing topic:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card shadow-lg">
            <div className="card-header bg-warning text-dark text-center">
              <h3 className="mb-0">Edit Topic</h3>
            </div>
            <div className="card-body">
              <form onSubmit={editTopic}>
                <div className="form-group mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={topicInfo.title}
                    onChange={onChangeValue}
                    className="form-control"
                    placeholder="Enter Title"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="shortheading" className="form-label">
                    Short Heading
                  </label>
                  <input
                    type="text"
                    id="shortheading"
                    name="shortheading"
                    value={topicInfo.shortheading}
                    onChange={onChangeValue}
                    className="form-control"
                    placeholder="Enter Short Heading"
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary w-100">
                    Update
                  </button>
                </div>
                <button
                  className="btn btn-secondary w-100 mt-2"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTopic;
