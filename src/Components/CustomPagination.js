import React from "react";
import "./CustomPagination.css";
import Pagination from "@material-ui/lab/Pagination";

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
  const handlePage = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div className="pagination">
      <Pagination
        count={numOfPages}
        onChange={(e) => handlePage(e.target.textContent)}
        color="primary"
        hideNextButton
        hidePrevButton
      />
    </div>
  );
};

export default CustomPagination;
