import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import useAuth from "../views/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  // useAuth()

  const loginhandler = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      data: login,
      withCredentials: true,
      url: "http://localhost:8080/login",
    })
      .then((res) => {
        console.log(res.data.msg);
        if (res.data.msg === "Authenticated") {
          navigate("/home");
          console.log("U should be directed to the home page...");
        } else {
          setError({
            login: "Invalid Login attempt",
          });
          setLogin({
            ...login,
            password: "",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="loginDiv">
      <h4>Login</h4>
      {/* <img src="./images/blue.png" alt=""/> */}
      <div class="row">
        <form class="col s12">
          <div class="row">
            <Link to={"/register"} className="signUpBtn">
              SignUp
            </Link>{" "}
            <br />
            {/* <h6>Sign Up</h6> */}
            {error ? (
              <label for="textarea1">
                <h6 className="loginErrNoti">{error.login}</h6>
              </label>
            ) : null}
            <div class="input-field col s12">
              <textarea
                id="username"
                class="materialize-textarea textareas validate"
                type="text"
                value={login.username}
                name="username"
                onChange={(e) =>
                  setLogin({ ...login, [e.target.name]: e.target.value })
                }
              />
              <label for="textarea1">Username</label>
              <span class="helper-text" data-error="✖" data-success="✔"></span>
            </div>
          </div>
        </form>
      </div>

      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <textarea
                id="password"
                class="materialize-textarea textareas validate"
                type="password"
                value={login.password}
                name="password"
                onChange={(e) =>
                  setLogin({ ...login, [e.target.name]: e.target.value })
                }
              />
              <label for="textarea1">Password</label>
              <span class="helper-text" data-error="✖" data-success="✔"></span>
            </div>
          </div>
        </form>
      </div>

      <button className="btn light-blue lighten-2" onClick={loginhandler}>
        Login
      </button>
      <br />
      <br />
      <Link to={"/recover"} className="forgotPassBtn">
        Forgot Password?
      </Link>
      <br />
      <br />
      <h6 className="copyRight">
        © 2022 - 2023 Dred Mobile Gaming. All rights reserved.
      </h6>
    </div>
  );
}
