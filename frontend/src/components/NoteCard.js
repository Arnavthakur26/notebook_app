import React from "react";
import { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import AddNote from "../components/AddNote";
import Alert from "./Alert";

const NoteCard = ({ id, title, description, date, tag }) => {
  const [alertState, setAlertState] = useState({
    open: false,
    msg: "",
    successState: true,
    icon: "",
  });
  const [showModal, setShowModal] = useState(false);
  const context = useContext(noteContext);
  const { deleteNote } = context;
  let bgColor = "bg-teal-600";
  let textColor = "text-white";
  if (tag === "Projects") {
    bgColor = "bg-amber-600";
    textColor = "text-amber-600";
  } else if (tag === "Videos") {
    bgColor = "bg-lime-600";
    textColor = "text-lime-600";
  } else if (tag === "Wishlist") {
    bgColor = "bg-teal-600";
    textColor = "text-teal-600";
  } else if (tag === "Work") {
    bgColor = "bg-fuchsia-700";
    textColor = "text-fuchsia-700";
  } else if (tag === "Assignments") {
    bgColor = "bg-gray-600";
    textColor = "text-gray-500";
  } else if (tag === "Study") {
    bgColor = "bg-rose-600";
    textColor = "text-rose-600";
  }
  const dateObj = new Date(date);
  return (
    <>
      {showModal ? (
        <AddNote
          showModal={showModal}
          setShowModal={setShowModal}
          update={true}
          id={id}
        />
      ) : null}
      <Alert
        open={alertState.open}
        msg={alertState.msg}
        successState={alertState.successState}
        icon={alertState.icon}
      />
      <div className="justify-around ">
        <div
          className={`${bgColor} rounded-xl text-white pl-4 pr-4 md:w-[36rem] md:max-w-[36rem] max-w-[22rem]  min-h-[12rem] pt-6 m-2 `}
        >
          <div className="flex justify-between pr-6 pl-6 mb-4">
            <span className="font-semibold md:text-2xl text-xl ">{title}</span>
            <div className="flex align-middle items-center gap-4">
              <span
                className={`rounded-xl min-w-[7rem] md:block hidden bg-gray-900 font-semibold ${textColor} h-11 text-center pt-2`}
              >
                {tag}
              </span>
              <i
                className="fa-solid ml-3 fa-pen-to-square cursor-pointer"
                onClick={(e) => {
                  window.scrollTo({ top: 0 });
                  setShowModal(!showModal);
                }}
              ></i>
              <i
                className="fa-solid fa-trash cursor-pointer"
                onClick={() => {
                  setAlertState({
                    open: true,
                    msg: "Note Deleted",
                    successState: true,
                    icon: "fa-circle-xmark",
                  });
                  setTimeout(() => {
                    deleteNote(id);
                  }, 1000);
                }}
              ></i>
            </div>
          </div>
          <div className="pb-10 pr-6 text-justify pl-6">{description}</div>
          <div className="flex justify-between pr-8 pl-8 pb-4 font-semibold text-md ">
            <span>
              {(dateObj.getHours() > 12
                ? dateObj.getHours() - 12
                : dateObj.getHours()) +
                ":" +
                (dateObj.getMinutes() < 10
                  ? "0" + dateObj.getMinutes()
                  : dateObj.getMinutes()) +
                (dateObj.getHours() >= 12 ? "PM" : "AM")}
            </span>
            <span>{dateObj.toDateString()}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
