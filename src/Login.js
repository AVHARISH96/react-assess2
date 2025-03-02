import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'

const Login = () => {
  const navigate = useNavigate();

  const initialValues = { username: '', password: '' };
  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        const user = response.data.find(user => user.username === values.username && user.password === values.password);
        if (user) {
          navigate('/products', { state: { userId: user.id } });
        } else {
          alert('Invalid credentials');
        }
        setSubmitting(false);
      });
  };

  // ...existing code...
  return (
   <>
   <Header></Header>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="text-center mb-4">Login</h1>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <Field 
                      type="text" 
                      id="username" 
                      name="username" 
                      className="form-control" 
                      placeholder="Enter username"
                    />
                    <ErrorMessage name="username" component="div" className="text-danger small mt-1" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <Field 
                      type="password" 
                      id="password" 
                      name="password" 
                      className="form-control" 
                      placeholder="Enter password"
                    />
                    <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
// ...existing code...
};

export default Login;