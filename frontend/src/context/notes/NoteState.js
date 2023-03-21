import React from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_HOST;
  const notesInitial = [];
  const getNotes = async () => {
    const response = await fetch(`https://${host}api/notes/fetchNotes`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("authToken"),
      },
    });
    const data = await response.json();
    setnotes(data);
  };
  const addNote = async (note) => {
    const { title, description, tag } = note;
    const response = await fetch(`https://${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const data = await response.json();
    setnotes(notes.concat(data));
  };
  const deleteNote = async (id) => {
    const response = await fetch(`https://${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    });
    const json = response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`https://${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
  };
  const [notes, setnotes] = useState(notesInitial);
  return (
    <NoteContext.Provider
      value={{ notes, setnotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
