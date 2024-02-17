import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  //const { userlogged, setUserloggeg } = useLocalStorage("IdUser", null);

  let navi = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert("Password or UserName is wrong. Please Check");
      } else {
        console.log(response.data);
        localStorage.setItem("accessToken", response.data);
        setAuthState(true);
        navi("/");
      }
    });
  };
  return (
    <div className="outer">
      <div className="card">
        <div className="inner">
          <label>Username: </label>
          <input
            type="text"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="inner">
          <label>Password: </label>
          <input
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>

        <div className="inner">
          <button onClick={login}> Login</button>
        </div>
        <div>
          <label className="loginRegisterButton">
            <Link to="/register">Sign Up for New Account </Link>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Login;
