import React from "react";
import { useState, useEffect, useContext } from "react";
import AddNote from "./AddNote";
import "./search.css";
import userContext from "../context/user/UserContext";

const Topbar = () => {
  const authToken = localStorage.getItem("authToken");
  const uContext = useContext(userContext);
  const { user, getUser } = uContext;
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState();
  useEffect(() => {
    getUser(authToken);
  }, []);

  return (
    <>
      <div
        className="flex sticky top-0 w-[98vw] rounded-b-md m-auto justify-between pr-16 pt-4 mb-4 pb-2 "
        style={{
          background: "rgb(49 47 47)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="pl-72 text-white text-lg">
          {authToken === null ? (
            <span className="text-2xl font-mono font-extrabold">Noting</span>
          ) : (
            `👋 ${user.name}`
          )}
        </div>
        <div className="flex gap-32">
          <div className="">
            <input
              type="search"
              name="search"
              id="search"
              autoComplete="off"
              className={`w-[40rem] scale-x-0 ${
                search ? "scale-x-100" : ""
              } border p-1 pl-4 text-white transition -mr-7 bg-transparent rounded-full`}
              onBlur={() => {
                setSearch(false);
              }}
            />
            <i
              className="fa-solid fa-magnifying-glass cursor-pointer"
              style={{ color: "white" }}
              onClick={(e) => {
                setSearch(true);
                const search = document.getElementById("search");
                search.focus();
              }}
            ></i>
          </div>
          <button
            className={`bg-teal-700 rounded-lg pl-3 ${
              authToken === null ? "invisible" : ""
            } pr-3 pt-1 pb-1 mb-2 text-gray-200 hover:bg-teal-800 transition`}
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add new note
          </button>
        </div>
      </div>
      {showModal ? (
        <AddNote
          showModal={showModal}
          setShowModal={setShowModal}
          update={false}
        />
      ) : null}
    </>
  );
};

export default Topbar;
