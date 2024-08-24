import React from "react";
import { TextField } from "@mui/material";

interface SearchBarProps {
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <TextField
      id="search-box"
      type="search"
      label="Search Box"
      onChange={(e) => props.setCode(e.target.value)}
    />
  );
};

export default SearchBar;
