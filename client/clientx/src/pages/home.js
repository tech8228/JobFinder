import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfJobInfos, setListOfJobInfos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalList, setOriginalList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/jobInfos").then((response) => {
      setOriginalList(response.data);
      setListOfJobInfos(response.data);
    });
  }, []);
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      // If search term is empty, reset to the original list
      setListOfJobInfos(originalList);
    } else {
      // Use the filter function to search for jobInfos
      const filteredJobInfos = originalList.filter((jobInfo) =>
        jobInfo.Title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setListOfJobInfos(filteredJobInfos);
    }
  };

  return (
    
    <div className="outer">
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {listOfJobInfos.map((jobInfo, key) => (
        <div
          className="card"
          key={key}
          onClick={() => {
            navigate(`/jobInfos/byId/${jobInfo.JobID}`);
          }}
        >
          <div className="inner">
            <h2 className="title">{jobInfo.Title}</h2>
          </div>
          <div className="inner">
            <p className="body"><strong>Description: </strong>
              {jobInfo.Description.length >= 400
                ? jobInfo.Description.substring(0, 400) + "..."
                : jobInfo.Description}
            </p>
            {/* Add other necessary fields */}
            <p className="companyName"><strong>Company Name: </strong>{jobInfo.CompanyID}</p>
            <p className="location"><strong>Location: </strong>{jobInfo.Location}</p>
            <p className="requirements"><strong>Requirements: </strong>{jobInfo.Requirements}</p>
            <p className="postedDate"><strong>Posted Date: </strong>{jobInfo.PostedDate}</p>
            {/* Add more fields as needed */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
