import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

  const sumbmitHandler = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      data: register,
      withCredentials: true,
      url: "http://localhost:8080/register",
    })
      //
      .then((res) => {
        console.log(res.data.msg);
        if (res.data.msg === "Welcome To The Site") {
          navigate("/");
        } else {
          setError({
            register: "Username or Email Is Already In Use",
          });
          setRegister({
            ...register,
            password: "",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const authUser = (e) => {
    e.preventDefault();
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:8080/auth",
    });
  };

  return (
    <div className="registerDiv">
      <Link to={"/"} className="registerBackBtn">
        Back
      </Link>
      <h4>Register</h4>
      <br />
      {error ? (
        <label for="textarea1">
          <h6 className="regErrNoti">{error.register}</h6>
        </label>
      ) : null}
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <textarea
                id="textarea1"
                class="materialize-textarea textareas validate"
                value={register.username}
                name="username"
                onChange={(e) =>
                  setRegister({ ...register, [e.target.name]: e.target.value })
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
                id="textarea1"
                class="materialize-textarea textareas validate"
                type="email"
                value={register.email}
                name="email"
                onChange={(e) =>
                  setRegister({ ...register, [e.target.name]: e.target.value })
                }
              />
              <label for="textarea1">Email</label>
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
                id="textarea3"
                class="materialize-textarea textareas validate"
                value={register.password}
                name="password"
                onChange={(e) =>
                  setRegister({ ...register, [e.target.name]: e.target.value })
                }
                type="password"
              />
              <label for="textarea3">Password</label>
              <span class="helper-text" data-error="✖" data-success="✔"></span>
            </div>
          </div>
        </form>
      </div>

      <button className="btn blue lighten-2" onClick={sumbmitHandler}>
        Register
      </button>
    </div>
  );
}
