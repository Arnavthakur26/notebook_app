import React from "react";
import "./scrollbar.css";
import NoteCard from "./NoteCard";
import { useContext, useEffect } from "react";
import noteContext from "../context/notes/NoteContext";
import filterContext from "../context/filter/FilterContext";
import LoginBtn from "../components/LoginBtn";
import Alert from "./Alert";

const Home = () => {
  const authToken = localStorage.getItem("authToken");
  const fContext = useContext(filterContext);
  const { filterTag } = fContext;
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  console.log(authToken);
  useEffect(() => {
    getNotes();
  }, []);
  if (authToken === null) {
    return (
      <div className="text-white font-mono font-extrabold absolute flex first-line:justify-center -translate-x-1/2 top-1/2 left-1/2 text-4xl">
        <span className="mr-2">Get Started</span>
        <LoginBtn />
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
      <div className="ml-72 mr-10 flex flex-wrap">
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
