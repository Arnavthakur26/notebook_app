import React from "react";
import { useState } from "react";

const Chip = ({ title, color, index, selectedChip, handleChip, onChange }) => {
  return (
    <div
      className="flex flex-shrink flex-wrap w-max gap-4 cursor-pointer"
      onClick={(e) => {
        handleChip(index);
        onChange(e);
      }}
    >
      <span
        className={`p-1 pl-3 transition select-none chip pr-3 ${color} ${
          selectedChip !== index ? "opacity-20" : "opacity-100 border-2"
        } w-max rounded-full`}
        data-name="tag"
      >
        {title}
      </span>
    </div>
  );
};
export default Chip;
