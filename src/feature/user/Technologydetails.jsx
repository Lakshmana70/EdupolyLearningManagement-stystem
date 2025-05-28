import React, { useState } from "react";
import { Outlet, Link, useNavigate, useParams } from "react-router-dom";
import { useGettechnologyQuery } from "../../services/technology";
import "./TechnologyDetails.css";

function TechnologyDetails() {
  const { tid, conceptId, topicId } = useParams();
  const { data: technology, isLoading } = useGettechnologyQuery(tid);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="min-vh-100">
      {/* Header - Full Width */}
      <div className="w-100" style={{ marginLeft: "-12px", marginRight: "-12px" }}>
        <div className="px-4 py-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-4">
              <button 
                className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px" }}
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <i className="bi bi-list fs-4"></i>
              </button>
              <h5 className="mb-0 fw-bold text-primary">{technology?.title}</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid p-0 mt-3">
        <div className="row">
          {/* Sidebar */}
          {!isCollapsed && (
            <div className="p-0" style={{ width: "20%" }}>
              <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                  <div className="list-group list-group-flush">
                    {technology?.concepts?.map((concept, index) => (
                      <div key={concept._id} className="list-group-item p-0">
                        <div className="p-2 border-start border-4 border-primary">
                          <h6 className="mx-3 mb-0 fw-semibold">
                            <span className="text-primary me-2">{index + 1}.</span>
                            {concept.conceptName}
                          </h6>
                        </div>
                        <div className="topics-list">
                          {concept.topics?.map((topic) => (
                            <Link
                            key={topic._id}
                            to={`/technologydetails/${tid}/${concept._id}/${topic._id}`}
                            className="d-block p-1 text-decoration-none border-start border-4 border-transparent topic-link"
                          >
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1">
                                <div className="d-flex align-items-center mx-5">
                                  <span className="text-body">
                                    <i className="bi bi-book me-2 text-primary"></i> {topic?.shortheading}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className="px-0" style={isCollapsed ? { width: "100%" } : { width: "80%" }}>
            <div className="card border-0 m-0 shadow-sm">
              <div className="card-body">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnologyDetails;
