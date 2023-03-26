import React from "react";

const Alert = ({ open, msg, successState, icon, spin }) => {
  return (
    open && (
      <div
        className={`text-white absolute z-[9999] transition-transform animate-alertOpen top-8 w-max left-1/2 -translate-x-1/2 ${
          successState ? "bg-green-700" : "bg-red-700"
        } shadow-2xl drop-shadow-xl rounded-lg  p-4`}
      >
        <span>{msg}</span>
        <i className={`fa-solid ${icon} fa-lg ml-3`}></i>
      </div>
    )
  );
};

export default Alert;
