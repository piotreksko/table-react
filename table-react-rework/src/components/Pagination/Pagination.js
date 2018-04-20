import React from "react";

import _ from "lodash";
import classes from "./Pagination.scss";

function Pagination({ currentPage, totalPages, onChangePage }) {
  // Add border check
  let prevPage = currentPage - 1;
  let nextPage = currentPage + 1;
  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? "disabled" : ""}>
        <a onClick={() => onChangePage(prevPage)}>&lt; back</a>
      </li>
      {_.times(totalPages, page => {
        page += 1;
        return (
          <li key={page} className={currentPage === page ? "active" : ""}>
            <a onClick={() => onChangePage(page)}>{page}</a>
          </li>
        );
      })}
      <li className={currentPage === totalPages ? "disabled" : ""}>
        <a onClick={() => onChangePage(nextPage)}>next &gt;</a>
      </li>
    </ul>
  );
}

export default Pagination;
