import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ page, pages, keyword = "" }) => {
  return (
    pages > 1 && (
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(pages).keys()].map((item) => (
            <li
              key={item + 1}
              className={`page-item ${item + 1 === page ? "active" : ""}`}
            >
              <Link
                className="page-link"
                to={
                  keyword
                    ? `/search/${keyword}/page/${item + 1}`
                    : `/page/${item + 1}`
                }
              >
                {item + 1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default Pagination;
