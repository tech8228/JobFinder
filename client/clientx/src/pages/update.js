import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const { id } = useParams();
  const [jobInfo, setJobInfo] = useState({});
  const [authState, setAuthState] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    // Add your validation schema as needed
    // ...
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobResponse = await axios.get(
          `http://localhost:3001/jobInfos/byId/${id}`
        );
        setJobInfo(jobResponse.data);

        const authResponse = await axios.get("http://localhost:3001/auth", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        });

        if (authResponse.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const initialValues = {
    Title: jobInfo.Title,
    Description: jobInfo.Description,
    Location: jobInfo.Location,
    Requirements: jobInfo.Requirements,
    PostedDate: jobInfo.PostedDate,
    StartDate: jobInfo.StartDate,
    EndDate: jobInfo.EndDate,
    SalaryRange: jobInfo.SalaryRange,
    CompanyLogo: jobInfo.CompanyLogo,
    CompanyID: jobInfo.CompanyID,
  };

  const handleInputChange = (e) => {
    // Update the corresponding field in the state when input changes
    setJobInfo({
      ...jobInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      // Send a request to update the user profile
      const response = await axios.put(
        `http://localhost:3001/jobInfos/update/${id}`,
        jobInfo,
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );

      console.log("Profile updated successfully:", response.data);
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="outer">
      <div className="card">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="inner">
              <label htmlFor="Title">Job Title:</label>
              <ErrorMessage
                name="Title"
                component="span"
                className="error-message"
              />
              <Field
                type="text"
                id="Title"
                name="Title"
                placeholder="Title"
                value={jobInfo.Title}
                onChange={handleInputChange}
              />
            </div>
            <div className="inner">
              <label htmlFor="Description">Description:</label>
              <ErrorMessage
                name="Description"
                component="span"
                className="error-message"
              />
              <Field
                as="textarea"
                className="bigBody"
                id="Description"
                name="Description"
                placeholder="Write your job description here"
                value={jobInfo.Description}
                onChange={handleInputChange}
              />
            </div>
            <div className="inner">
              <label htmlFor="Location">Location:</label>
              <ErrorMessage
                name="Location"
                component="span"
                className="error-message"
              />
              <Field
                type="text"
                id="Location"
                name="Location"
                placeholder="Location"
                value={jobInfo.Location}
                onChange={handleInputChange}
              />
            </div>
            <div className="inner">
              <label htmlFor="Requirements">Requirements:</label>
              <ErrorMessage
                name="Requirements"
                component="span"
                className="error-message"
              />
              <Field
                as="textarea"
                className="bigBody"
                id="Requirements"
                name="Requirements"
                placeholder="Requirements for the job"
                value={jobInfo.Requirements}
                onChange={handleInputChange}
              />
            </div>
            <div className="inner">
              <label htmlFor="PostedDate">Posted Date:</label>
              <ErrorMessage
                name="PostedDate"
                component="span"
                className="error-message"
              />
              <Field
                type="date"
                id="PostedDate"
                name="PostedDate"
                value={jobInfo.PostedDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="inner">
              <label htmlFor="StartDate">Start Date:</label>
              <ErrorMessage
                name="StartDate"
                component="span"
                className="error-message"
              />
              <Field
                type="date"
                id="StartDate"
                name="StartDate"
                value={jobInfo.StartDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="inner">
              <label htmlFor="EndDate">End Date:</label>
              <ErrorMessage
                name="EndDate"
                component="span"
                className="error-message"
              />
              <Field
                type="date"
                id="EndDate"
                name="EndDate"
                value={jobInfo.EndDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="inner">
              <label htmlFor="SalaryRange">Salary Range:</label>
              <ErrorMessage
                name="SalaryRange"
                component="span"
                className="error-message"
              />
              <Field
                type="text"
                id="SalaryRange"
                name="SalaryRange"
                placeholder="Salary Range"
                value={jobInfo.SalaryRange}
                onChange={handleInputChange}
              />
            </div>

            <div className="inner">
              <label htmlFor="CompanyID">Company ID:</label>
              <ErrorMessage
                name="CompanyID"
                component="span"
                className="error-message"
              />
              <Field
                type="number"
                id="CompanyID"
                name="CompanyID"
                placeholder="Company ID"
                value={jobInfo.CompanyID}
              />
            </div>
            <div className="inner">
              <button type="submit">Update</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Update;
