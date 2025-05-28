import React, { useState } from 'react';
import { useAddtopicMutation, useLazyGettechnologyQuery } from '../../services/technology';
import { useNavigate, useParams } from 'react-router-dom';

function AddTopic() {
  const [gettechFN] = useLazyGettechnologyQuery();
  const [addtopicFn] = useAddtopicMutation();
  const { tid, cid } = useParams();
  const navigate = useNavigate();

  const [topicInfo, setTopicInfo] = useState({
    title: '',
    shortheading: '',
  });

  const onChangeValue = (e) => {
    setTopicInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const addtopic = async (event) => {
    event.preventDefault();
    try {
      await addtopicFn({ topicInfo, tid, cid });
      await gettechFN(tid);
      navigate(`/admin/addconcept/${tid}`);
    } catch (error) {
      console.error('Error in adding topic:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">Add Topic</h3>
            </div>
            <div className="card-body">
              <form onSubmit={addtopic}>
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
                  <button type="submit" className="btn btn-success w-100">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTopic;
