import React, { useState } from "react";
import "./styles.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function Search({ search, onSearchChange }) {
  return (
    <div className="search-bar">
      <SearchOutlinedIcon />
      <input
        placeholder="Search"
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e)}
      />
    </div>
  );
}

export default Search;
