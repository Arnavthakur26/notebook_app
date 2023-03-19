import React from "react";
import { useState } from "react";
import FilterContext from "./FilterContext";

const FilterState = (props) => {
  const [filterTag, setFilterTag] = useState("");
  return (
    <FilterContext.Provider value={{ filterTag, setFilterTag }}>
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterState;
