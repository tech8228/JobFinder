import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function Delete() {
  const initialValues = {
    title: "",
    body: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().min(10).max(100).required("Your post needs a name"),
    body: Yup.string().min(50).max(5000).required("Your post needs a body"),
  });
  let navi = useNavigate();
  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/jobInfos", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          navi("/");
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
              <label>Job Title: </label>
              <ErrorMessage name="title" component="span" />
              <Field name="title" placeholder="Title" />
            </div>
            <div className="inner">
              <label>Description: </label>
              <ErrorMessage name="body" component="span" />
              <Field
                as="textarea"
                className="bigBody"
                name="body"
                placeholder="Write your post here"
              />
            </div>
            <div className="inner">
              <button type="submit"> Update </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Delete;
