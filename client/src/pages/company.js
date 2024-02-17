import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Company() {
  const [listOfCompanies, setListOfCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/companies").then((response) => {
      setListOfCompanies(response.data);
    });
  }, []);

  return (
    <div className="outer">
      {listOfCompanies.map((company, key) => (
        <div
          className="card"
          key={key}
          onClick={() => {
            navigate(`/companies/byId/${company.CompanyID}`);
          }}
        >
          <div className="inner">
            <h2 className="title">{company.CompanyName}</h2>
          </div>
          <div className="inner">
            <p className="companyName">Company Name: {company.CompanyName}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Company;
