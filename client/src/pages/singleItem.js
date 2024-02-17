import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function SingleItem() {
  let { id } = useParams();
  const [jobInfo, setJobInfo] = useState({});
  const [authState, setAuthState] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleUpdate = () => {
    // Use the `navigate` function to redirect to the update page
    navigate(`/jobInfos/update/${id}`);
  };

  const handleDelete = async () => {
    try {
      console.log("Deleting jobInfo:", id);

      // Send a request to delete the jobInfo
      const response = await axios.delete(
        `http://localhost:3001/jobInfos/byId/${id}`,
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );

      console.log("Delete response:", response);

      // Redirect to the home page or another appropriate location
      navigate("/");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const [jobApply, setJobApply] = useState({
    ApplicationID: "",
    JobID: "",
    CandidateID: "",
    ApplicationDate: "",
    Status: "",
    Resume: "",
  });

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await axios.get("http://localhost:3001/profile", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      });

      const { id, ResumeFilePath } = userResponse.data;
      //console.log(userResponse.data);
      // Use the retrieved user ID and resume in the application data
      const applicationData = {
        JobID: jobInfo.JobID,
        CandidateID: id,
        ApplicationDate: new Date().toISOString(),
        Status: "Applied",
        Resume: ResumeFilePath,
      };

      // Send a request to submit the job application
      const response = await axios.post(
        "http://localhost:3001/jobInfos/apply",
        applicationData,
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );

      console.log("Job application submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting job application:", error);
    }
  };

  return (
    <div className="outer">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card">
          <form onSubmit={handleApply}>
            <div className="inner">
              <h1 className="title">{jobInfo.Title}</h1>
            </div>
            <div className="inner">
              <p className="body">{jobInfo.Description}</p>
              {/* Add other necessary info here */}
              <p className="companyName">
                <strong>Company Name: </strong>
                {jobInfo.CompanyID}
              </p>
              <p className="location">
                <strong>Location: </strong>
                {jobInfo.Location}
              </p>
              <p className="requirements">
                <strong>Requirements: </strong>
                {jobInfo.Requirements}
              </p>
              <p className="postedDate">
                <strong>Posted Date: </strong>
                {jobInfo.PostedDate}
              </p>
              {/* Add more fields as needed */}
            </div>
            {authState && (
              <div className="inner">
                <button type="submit">Apply Now</button>
                <button onClick={handleUpdate}> Update </button>
                <button onClick={handleDelete}> Delete </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default SingleItem;
