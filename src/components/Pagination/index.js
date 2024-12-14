import React from "react";
import "./index.css";

const Pagination = ({ active, decrementActivePage, incrementActivePage }) => {
  const onDecrement = () => {
    decrementActivePage();
  };

  const onIncrement = () => {
    incrementActivePage();
  };

  return (
    <div className="pagination">
      <button
        className="arrows"
        onClick={onDecrement}
        type="button"
        testid="pagination-left-button"
      >
        ←
      </button>
      <p className="active-page">
        <span testid="active-page-number">{active}</span> of 4
      </p>
      <button
        className="arrows"
        onClick={onIncrement}
        type="button"
        testid="pagination-right-button"
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
