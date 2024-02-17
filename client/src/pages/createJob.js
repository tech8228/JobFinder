import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function CreateJob() {
  const initialValues = {
    Title: "",
    Description: "",
    Location: "",
    Requirements: "",
    PostedDate: "",
    StartDate: "",
    EndDate: "",
    SalaryRange: "",
    CompanyLogo: "",
    CompanyID: "", 
  };

  const validationSchema = Yup.object().shape({
    Title: Yup.string().min(10).max(100).required("Please provide a job title."),
    Description: Yup.string().min(50).max(5000).required("Your job description is required."),
    Location: Yup.string().max(255),
    Requirements: Yup.string().max(5000),
    PostedDate: Yup.date().required("Please provide a posted date."),
    StartDate: Yup.date(),
    EndDate: Yup.date(),
    SalaryRange: Yup.string().max(255),
    CompanyLogo: Yup.string().max(255),
    CompanyID: Yup.number().required("Please select a company."),
  });

  let navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/jobInfos", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          navigate("/");
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
              <label htmlFor="Title">Job Title:</label>
              <ErrorMessage name="Title" component="span" className="error-message" />
              <Field type="text" id="Title" name="Title" placeholder="Title" />
            </div>
            <div className="inner">
              <label htmlFor="Description">Description:</label>
              <ErrorMessage name="Description" component="span" className="error-message" />
              <Field
                as="textarea"
                className="bigBody"
                id="Description"
                name="Description"
                placeholder="Write your job description here"
              />
            </div>
            <div className="inner">
              <label htmlFor="Location">Location:</label>
              <ErrorMessage name="Location" component="span" className="error-message" />
              <Field type="text" id="Location" name="Location" placeholder="Location" />
            </div>
            <div className="inner">
              <label htmlFor="Requirements">Requirements:</label>
              <ErrorMessage name="Requirements" component="span" className="error-message" />
              <Field
                as="textarea"
                className="bigBody"
                id="Requirements"
                name="Requirements"
                placeholder="Requirements for the job"
              />
            </div>
            <div className="inner">
              <label htmlFor="PostedDate">Posted Date:</label>
              <ErrorMessage name="PostedDate" component="span" className="error-message" />
              <Field type="date" id="PostedDate" name="PostedDate" />
            </div>
            <div className="inner">
              <label htmlFor="StartDate">Start Date:</label>
              <ErrorMessage name="StartDate" component="span" className="error-message" />
              <Field type="date" id="StartDate" name="StartDate" />
            </div>
            <div className="inner">
              <label htmlFor="EndDate">End Date:</label>
              <ErrorMessage name="EndDate" component="span" className="error-message" />
              <Field type="date" id="EndDate" name="EndDate" />
            </div>
            <div className="inner">
              <label htmlFor="SalaryRange">Salary Range:</label>
              <ErrorMessage name="SalaryRange" component="span" className="error-message" />
              <Field type="text" id="SalaryRange" name="SalaryRange" placeholder="Salary Range" />
            </div>
            
            <div className="inner">
              <label htmlFor="CompanyID">Company ID:</label>
              <ErrorMessage name="CompanyID" component="span" className="error-message" />
              <Field type="number" id="CompanyID" name="CompanyID" placeholder="Company ID" />
            </div>
            <div className="inner">
              <button type="submit">Create</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CreateJob;
