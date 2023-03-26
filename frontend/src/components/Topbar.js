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
        className="flex  md:text-lg text-xs sticky top-0 w-[98%] rounded-b-md m-auto justify-between pr-2 md:pr-16 pt-4 mb-4 pb-2 "
        style={{
          background: "rgb(49 47 47)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="md:pl-72 pl-4 text-white text-lg">
          {authToken === null ? (
            <span className=" md:text-2xl text-xs font-mono font-extrabold">
              <i class="fa-solid text-white fa-bars"></i>
              Noting
            </span>
          ) : (
            <span className=" md:text-2xl text-xs font-mono font-extrabold">
              <i class="fa-solid text-white mr-2 fa-bars"></i>
              👋{user.name}
            </span>
          )}
        </div>
        <div className="flex md:gap-32">
          <div className="">
            <input
              type="search"
              name="search"
              id="search"
              autoComplete="off"
              className={`md:w-[40rem] w-[8rem] scale-x-0 ${
                search ? "scale-x-100" : ""
              } border p-1 pl-4 text-white transition  mr-2 md:-mr-7 bg-transparent rounded-full`}
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
            className={`bg-teal-700 rounded-lg${
              authToken === null ? "invisible" : ""
            }  p-2 ml-2 md:pr-3 md:pt-1 md:pb-1 mb-2 md:text-lg text-xs text-gray-200 hover:bg-teal-800 transition`}
            onClick={() => {
              window.scrollTo({ top: 0 });
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
