import React from "react";
import Chip from "./Chip";
import { useEffect, useState } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
import NavLinks from "../data/NavLinks";

const AddNote = ({ showModal, setShowModal, update, id }) => {
  const [scale, setscale] = useState("scale-0");
  const [selectedChip, setSelectedChip] = useState(0);
  const context = useContext(noteContext);
  const { addNote, editNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "Projects",
  });

  const validation = () => {
    if (note.title.length < 5 || note.description.length < 5) {
      return false;
    }

    return true;
  };
  const addNewNote = (e) => {
    e.preventDefault();
    if (validation()) {
      setShowModal(false);
      addNote(note);
    }
  };

  const onUpdate = (e) => {
    e.preventDefault();
    e.setShowModal(false);
    editNote(id, note.title, note.description, note.tag);
  };
  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name ? e.target.name : e.target.dataset.name]: e.target.value
        ? e.target.value
        : e.target.innerText,
    });
  };

  const handleChip = (index) => {
    setSelectedChip(index);
  };
  useEffect(() => {
    setscale("scale-100");
  }, []);
  return (
    <>
      <div
        className="w-full absolute top-0 left-0 z-50 flex h-screen items-center align-middle justify-center"
        style={{ background: "rgba(0 ,0 ,0,0.7)" }}
      >
        <form
          id="addNoteForm"
          onSubmit={addNewNote}
          className={`absolute transition duration-500 ${scale} p-8 rounded-xl text-white w-1/2 flex flex-col`}
          style={{ background: "rgb(49 47 47)" }}
        >
          <label htmlFor="title">Title</label>
          <input
            onChange={onChange}
            type="text"
            name="title"
            id="title"
            required
            className=" rounded-lg mt-2 mb-2  ml-3 h-8 p-2 "
            style={{ background: "#212121" }}
            minLength={5}
          />
          <label htmlFor="description">Description</label>
          <textarea
            onChange={onChange}
            type="text"
            name="description"
            id="description"
            required
            className=" rounded-lg mt-2 ml-3 h-[150px] p-2 max-h-[200px] "
            style={{ background: "#212121" }}
            minLength={5}
          />
          <label htmlFor="tag" className="mb-2 mt-2">
            Tag
          </label>
          <div className="flex gap-4 justify-center mb-6" name="tag">
            {NavLinks.map((item, index) => {
              return (
                <Chip
                  key={index}
                  index={index}
                  title={item.label}
                  color={item.color}
                  selectedChip={selectedChip}
                  handleChip={handleChip}
                  onChange={onChange}
                ></Chip>
              );
            })}
          </div>
          <hr className="opacity-10" />
          <div className="flex gap-4 items-center align-middle justify-center">
            {update ? (
              <button
                onClick={onUpdate}
                className="bg-teal-700 rounded-lg pl-3 mt-4 pr-3 pt-1 pb-1 mb-2  text-gray-200 hover:bg-teal-800 transition"
              >
                Update
              </button>
            ) : (
              <button
                type="submit"
                className="bg-teal-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg pl-3 mt-4 pr-3 pt-1 pb-1 mb-2  text-gray-200 hover:bg-teal-800 transition"
              >
                Save
              </button>
            )}
            <button
              onClick={() => {
                setShowModal(false);
                document.getElementById("addNoteForm").reset();
              }}
              className="bg-red-700 rounded-lg pl-3 mt-4 pr-3 pt-1 pb-1 mb-2  text-gray-200 hover:bg-red-800 transition"
            >
              Discard
            </button>
          </div>
        </form>
      </div>
      ;
    </>
  );
};

export default AddNote;
