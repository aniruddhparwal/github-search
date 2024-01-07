import React from 'react';

const SearchForm = ({ searchTerm, onSearchTermChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
      />
    </div>
  );
};

export default SearchForm;
