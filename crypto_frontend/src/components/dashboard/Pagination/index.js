import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import "./styles.css";
export default function PaginationComponent({ page, handlePageChange, count }) {
  return (
    <div className="pagination-div">
      <Pagination
        count={count}
        page={page}
        onChange={handlePageChange}
        sx={{
          "& .MuiPaginationItem-text": {
            color: "var(--white) !important",
            border: "1px solid var(--grey)",
          },
          "& .MuiPaginationItem-text:hover": {
            backgroundColor: "var(--violet)",
            border: "none",
          },
          "& .Mui-selected  ": {
            backgroundColor: "var(--violet) !important",
            border: "none",
          },
          "& .MuiPaginationItem-ellipsis": {
            border: "none",
          },
        }}
      />
    </div>
  );
}
