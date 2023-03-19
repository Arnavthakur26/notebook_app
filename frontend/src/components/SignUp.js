import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (response.status === 200) {
      navigate("/login");
      document.location.reload();
    } else {
      alert(json.error);
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div
      className="flex w-1/4 h-max absolute p-10 pt-8 pb-16 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col"
      style={{ background: "rgb(49 47 47" }}
    >
      <span className="font-mono text-white text-4xl mb-8 font-medium text-center">
        Register
      </span>
      <form className="flex flex-col" onSubmit={onSubmit} autoComplete="off">
        <label htmlFor="name" className="text-white mr-2 mb-4">
          Name
        </label>
        <input
          type="name"
          name="name"
          autoComplete="off"
          id="name-signup"
          required
          onChange={onChange}
          className="rounded-md p-1 text-white mb-4"
          style={{ backgroundColor: "#212121" }}
        />
        <label htmlFor="email" className="text-white mr-2 mb-4">
          Email
        </label>
        <input
          type="email"
          name="email"
          autoComplete="off"
          autoSave="off"
          id="email-signup"
          required
          onChange={onChange}
          className="rounded-md p-1  text-white mb-4"
          style={{ background: "#212121 !Important" }}
        />
        <label htmlFor="password" className="text-white mb-4  mr-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          autoComplete="off"
          id="pwd-signup"
          onChange={onChange}
          required
          className="rounded-md p-1 text-white mb-4"
          style={{ background: "#212121" }}
        />
        <button
          type="submit"
          className="bg-teal-700 hover:bg-teal-800 transition text-white font-lg font-extrabold p-2 w-max self-center rounded-lg mt-4 font-mono"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
