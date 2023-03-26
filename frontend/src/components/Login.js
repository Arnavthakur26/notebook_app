import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [alertState, setAlertState] = useState({
    open: false,
    msg: "",
    successState: true,
    icon: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setAlertState({
      open: true,
      msg: "Checking Credentials",
      successState: true,
      icon: "fa-spinner fa-spin",
    });
    const host = process.env.REACT_APP_HOST;
    const response = await fetch(`https://${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (json.success === true) {
      setAlertState({
        open: true,
        msg: "User validated,Redirecting",
        successState: true,
        icon: "fa-circle-check",
      });
      setTimeout(() => {
        navigate("/");
        document.location.reload();
        localStorage.setItem("authToken", json.authToken);
      }, 1000);
    } else {
      setAlertState({
        open: true,
        msg: "Inavlid Credentials",
        successState: false,
        icon: "fa-circle-xmark",
      });
    }
    setTimeout(() => {
      setAlertState(...[alertState], { open: false });
    }, 1000);
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Alert
        open={alertState.open}
        msg={alertState.msg}
        successState={alertState.successState}
        icon={alertState.icon}
      />
      <div
        className="flex w-1/4 h-max absolute p-10 pt-8 pb-16 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col"
        style={{ background: "rgb(49 47 47" }}
      >
        <span className="font-mono text-white text-4xl mb-8 font-medium text-center">
          Login
        </span>
        <form className="flex flex-col" onSubmit={onSubmit} autoComplete="off">
          <label htmlFor="email" className="text-white mr-2 mb-4">
            Email
          </label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            autoSave="off"
            id="email-login"
            required
            onChange={onChange}
            className="rounded-md p-1 bg-zinc-900 text-white mb-4"
          />
          <label htmlFor="password" className="text-white mb-4  mr-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            autoComplete="off"
            id="email"
            onChange={onChange}
            required
            className="rounded-md p-1 bg-zinc-900 text-white mb-4"
          />
          <button
            type="submit"
            className="bg-teal-700 hover:bg-teal-800 transition text-white font-lg font-extrabold p-2 w-1/4 self-center rounded-lg mt-4 font-mono"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
