import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGettechnologyQuery,
  useLazyGettechnologyQuery,
  useUpdatetechnologyMutation,
} from "../../services/technology";

function EditTechnology() {
  const { tid } = useParams();
  const { data: technology, isLoading } = useGettechnologyQuery(tid);
  const [getTechFn] = useLazyGettechnologyQuery();
  const [updtecFn] = useUpdatetechnologyMutation();
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card shadow-lg border-0 rounded">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">Edit Technology</h3>
            </div>
            <div className="card-body p-4">
              {isLoading ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <Formik
                  initialValues={{
                    title: technology ? technology.title : "",
                    image: technology ? technology.image : "",
                    description: technology ? technology.description : "",
                  }}
                  validationSchema={Yup.object({
                    title: Yup.string().required("Title is required"),
                    image: Yup.string().required("Image URL is required"),
                    description: Yup.string().required(
                      "Description is required"
                    ),
                  })}
                  onSubmit={async (updtech) => {
                    console.log(updtech);
                    await updtecFn({ tid, updtech });
                    await getTechFn(tid);
                    navigate(`/admin/addconcept/${tid}`);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      {/* Title Field */}
                      <div className="mb-3">
                        <label className="form-label fw-bold">Title</label>
                        <Field
                          name="title"
                          type="text"
                          placeholder="Enter title"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="title"
                          component="div"
                          className="text-danger small mt-1"
                        />
                      </div>

                      {/* Image URL Field */}
                      <div className="mb-3">
                        <label className="form-label fw-bold">Image URL</label>
                        <Field
                          name="image"
                          type="text"
                          placeholder="Enter image URL"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="image"
                          component="div"
                          className="text-danger small mt-1"
                        />
                      </div>

                      {/* Description Field */}
                      <div className="mb-3">
                        <label className="form-label fw-bold">
                          Description
                        </label>
                        <Field
                          name="description"
                          as="textarea"
                          placeholder="Enter description"
                          className="form-control"
                          rows="3"
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-danger small mt-1"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-success w-100"
                          disabled={isSubmitting}
                        >
                          <i className="bi bi-pencil-square me-2"></i>
                          {isSubmitting ? "Updating..." : "Update Technology"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTechnology;
