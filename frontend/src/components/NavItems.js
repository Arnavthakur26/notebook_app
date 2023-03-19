import React from "react";
import { useContext, useState } from "react";
import filterContext from "../context/filter/FilterContext";
import noteContext from "../context/notes/NoteContext";

const NavItems = (props) => {
  const [active, setActive] = useState(false);
  const context = useContext(filterContext);
  const { filterTag, setFilterTag } = context;
  const notesContext = useContext(noteContext);
  const { notes } = notesContext;
  const noteTagArr = notes.filter((note) => {
    return note.tag === props.label;
  });
  var noteCount = noteTagArr ? noteTagArr.length : 0;
  noteCount < 10 ? (noteCount = "0" + noteCount) : (noteCount = noteCount);
  return (
    <>
      <div
        onClick={() => {
          filterTag === props.label
            ? setFilterTag("")
            : setFilterTag(props.label);
          setActive(!active);
        }}
        className={`flex gap-2 cursor-pointer justify-between pr-8 ${
          props.filterTag === props.label ? "bg-slate-700" : ""
        } hover:bg-slate-700 transition duration-150  hover:rounded-md hover:translate-x-3 h-full pl-4 pt-4 pb-4 items-baseline flex-row ${
          active ? "translate-x-3 rounded-md" : ""
        }`}
      >
        <div className="flex items-baseline gap-2">
          <div className={`rounded-full w-3 h-3 ${props.color}`}></div>
          <span className="text-gray-300">{props.label}</span>
        </div>
        <div>
          <div
            className={`flex items-center text-white ${props.color} pr-2 pl-2 rounded-lg`}
          >
            {noteCount}
          </div>
        </div>
      </div>
      <hr className="opacity-5" />
    </>
  );
};

export default NavItems;
