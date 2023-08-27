import React from "react";
import { Link } from "react-router-dom";
const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <div className="pagination-component">
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productList/${x + 1}`
            }
          >
            <div
              className="pagination-item"
              style={{ color: x + 1 === page ? "red" : "black" }}
            >
              {x + 1}
            </div>
          </Link>
        ))}
      </div>
    )
  );
};

export default Paginate;
