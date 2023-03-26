import React from "react";
import "./scrollbar.css";
import NoteCard from "./NoteCard";
import { useContext, useEffect } from "react";
import noteContext from "../context/notes/NoteContext";
import filterContext from "../context/filter/FilterContext";
import LoginBtn from "../components/LoginBtn";

import { Link } from "react-router-dom";

const Home = () => {
  const authToken = localStorage.getItem("authToken");
  const fContext = useContext(filterContext);
  const { filterTag } = fContext;
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, []);
  if (authToken === null) {
    return (
      <div className="text-white font-mono font-extrabold absolute flex flex-col first-line:justify-center -translate-x-1/2 top-1/2 left-1/2 text-4xl">
        <div className="flex">
          <span className="mr-2">Get Started</span>

          <LoginBtn />
        </div>
        <span className="text-xl text-center">
          New User?{" "}
          <Link
            to={"/signup"}
            className="underline transition hover:text-yellow-300"
          >
            Register Now!
          </Link>
        </span>
      </div>
    );
  } else {
    if (notes.length === 0) {
      return (
        <div className="text-white text-4xl absolute -translate-x-1/4 top-1/2 left-1/2">
          No notes to display 😥
        </div>
      );
    }
    return (
      <div className="md:ml-72 md:mr-10 m-2 flex flex-wrap">
        {filterTag === ""
          ? notes.map((item, key) => {
              return (
                <NoteCard
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  description={item.description}
                  tag={item.tag}
                  date={item.date}
                />
              );
            })
          : notes
              .filter((note) => {
                return note.tag === filterTag;
              })
              .map((item, key) => {
                return (
                  <NoteCard
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    description={item.description}
                    tag={item.tag}
                    date={item.date}
                  />
                );
              })}
      </div>
    );
  }
};

export default Home;
