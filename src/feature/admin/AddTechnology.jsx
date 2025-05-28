import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAddtechnologyMutation } from '../../services/technology';
import { useNavigate } from 'react-router-dom';

function AddTechnology() {
    const [addtechFn] = useAddtechnologyMutation();
    const navigate = useNavigate();

    return (
        <div className="container mt-4 p-4 border rounded shadow-sm bg-light">
            <h2 className="text-center mb-4">Add Technology</h2>
            <Formik
                initialValues={{ title: '', image: '', description: '' }}
                validationSchema={Yup.object({
                    title: Yup.string().max(100, 'Must be 100 characters or less').required('Required'),
                    image: Yup.string().required('Required'),
                    description: Yup.string().required('Required'),
                })}
                onSubmit={async (values) => {
                    const data = await addtechFn(values);
                    if (data.data.id) {
                        navigate(`/admin/addconcept/${data.data.id}`);
                        console.log(data);
                    } else {
                        console.log("Not navigated");
                    }
                }}
            >
                {({ touched, errors }) => (
                    <Form className="p-3">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Technology Title</label>
                            <Field name="title" type="text" className={`form-control ${touched.title && errors.title ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="title" component="div" className="invalid-feedback" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Technology Image URL</label>
                            <Field name="image" type="text" className={`form-control ${touched.image && errors.image ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="image" component="div" className="invalid-feedback" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Technology Description</label>
                            <Field as="textarea" name="description" className={`form-control ${touched.description && errors.description ? 'is-invalid' : ''}`} rows="3" />
                            <ErrorMessage name="description" component="div" className="invalid-feedback" />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-success">+ Add Technology</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddTechnology;