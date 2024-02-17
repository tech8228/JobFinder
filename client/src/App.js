import React, { useState, useEffect } from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/home";
import Update from "./pages/update";
import Delete from "./pages/delete";
import SingleItem from "./pages/singleItem";
import Login from "./pages/login";
import Registration from "./pages/register";
import Profile from "./pages/seekerupdate";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
import Company from './pages/company';
import CreateJob from './pages/createJob';
import SingleItemCmy from './pages/singleItemCmy';


function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState(false);
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div><h1>JobFinder</h1></div>      
          <div className="navbar">
            <Link to="/">Home Page</Link>
            {authState ? (
              <>

                <Link to="/profile">Profile</Link>
                <Link to="/company">Comments</Link>
                <Link to="/createJob">Post a job</Link>
                <button onClick={logout}> Logout </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Registration</Link>
              </>
            )}
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/company" element={<Company />} />
            
            <Route path="/companies/byId/:id" element={<SingleItemCmy />} />
            <Route path="/createJob" element={<CreateJob />} />
            <Route path="/jobInfos/update/:id" element={<Update />} />
            <Route path="/jobInfos/byId/:id/delete" element={<Delete />} />
            <Route path="/jobInfos/byId/:id" element={<SingleItem />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
