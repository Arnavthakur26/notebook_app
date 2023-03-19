import React from "react";
import LoginBtn from "./LoginBtn";
import { Outlet } from "react-router-dom";
import NavItems from "./NavItems";
import NavLinks from "../data/NavLinks";
import { useContext, useState } from "react";

import filterContext from "../context/filter/FilterContext";
const Navbar = () => {
  const context = useContext(filterContext);
  const { filterTag } = context;
  const authToken = localStorage.getItem("authToken");

  return (
    <>
      <Outlet />
      <div>
        <section
          className={`min-h-[87vh]  border border-white border-opacity-10 ml-4 top-20 fixed  w-60 rounded-lg  ${
            authToken === null ? "invisible" : ""
          } rounded-br-lg`}
          style={{ backgroundColor: "rgb(49 47 47)" }}
        >
          <div className="text-2xl text-center mt-2 text-gray-300 font-light">
            Noting
          </div>
          <hr className="mt-2 opacity-10" />
          <nav>
            <div className="flex  flex-col w-full">
              {NavLinks.map((item, index) => {
                return (
                  <NavItems
                    key={index}
                    label={item.label}
                    color={item.color}
                    filterTag={filterTag}
                  ></NavItems>
                );
              })}
            </div>
            <button
              className="bg-teal-700 flex mt-16 hover:bg-teal-800 transition text-white font-lg font-extrabold p-2 pl-3 pr-3 self-center rounded-lg font-mono m-auto"
              onClick={() => {
                localStorage.clear();
                document.location.reload();
              }}
            >
              Logout
            </button>
          </nav>
        </section>
      </div>
    </>
  );
};

export default Navbar;
