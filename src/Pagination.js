import React from "react";

const Pagination = ({ nPages, page, setPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const prevPage = () => {
    if (page !== 1) setPage(page - 1);
  };

  const nextPage = () => {
    if (page !== nPages) setPage(page + 1);
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a className="page-link" onClick={prevPage} href="/">
            Previous
          </a>
        </li>
        {pageNumbers.map((x) => (
          <li key={x} className={`page-item ${page === x ? "active" : ""}`}>
            <a href="/" onClick={() => setPage(x)} className="page-link">
              {x}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a href="/" onClick={nextPage} className="page-link">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
