import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [role, setRole] = useState("Job Seeker");
  const initialValues = {
    username: "",
    email: "",
    password: "",
    userType: role,
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4)
      .max(20)
      .matches(/^(?:[a-z0-9]*)$/gi, "Only lowercase letters and numbers")
      .required("username required"),
    email: Yup.string().email("invaild email").required("email is required"),
    password: Yup.string()
      .min(6)
      .required("password required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "password needs 1 uppercase, 1 lowercase, 1 special character"
      ),
  });

  let navi = useNavigate();

  const onSubmit = async (data) => {
    data.userType = role;
    await axios.post("http://localhost:3001/auth", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        navi("/login");
      }
    });
  };

  return (
    <div className="outer">
      <div className="card">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="inner">
              <label>Username: </label>
              <ErrorMessage name="username" component="span" />
              <Field name="username" />
            </div>
            <div className="inner">
              <label>Email: </label>
              <ErrorMessage name="email" component="span" />
              <Field name="email" />
            </div>
            <div className="inner">
              <label>Password: </label>
              <ErrorMessage name="password" component="span" />
              <Field name="password" type="password" />
            </div>
            <div className="inner">
              <label>
                Role:
                <select
                  name="userType"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                >
                  <option value="Job Seeker">Job Seeker</option>
                  <option value="Employer">Employer</option>
                </select>
              </label>
            </div>
            <div className="inner">
              <button type="submit"> Register</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Registration;
