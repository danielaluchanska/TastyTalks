import React, { useState } from 'react';
import './PaginationControls.css'
import PropTypes from "prop-types";

const PaginationControls = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    onPageChange(currentPage + 1); 
  };

  return (
    <div className='pagination-buttons'>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      <p>{`Page ${currentPage} of ${totalPages}`}</p>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next Page
      </button>
    </div>
  );
};

PaginationControls.propTypes = {
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};
export default PaginationControls;