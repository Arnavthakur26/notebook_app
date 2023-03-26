import React, { useState } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {
  const [user, setUser] = useState({});
  const getUser = async (authToken) => {
    const host = process.env.REACT_APP_HOST;
    const response = await fetch(`https://${host}/api/auth/getUser`, {
      method: "POST",
      headers: {
        "auth-token": authToken,
      },
    });
    const data = await response.json();
    setUser(data);
  };
  return (
    <UserContext.Provider value={{ user, setUser, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
