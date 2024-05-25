// SearchResults.js
import React from 'react';
import { Link } from 'react-router-dom';
import './search.css';

function SearchResults({ searchResults, searchParams }) {
  const searchQuery = searchParams.get('search');

  return (
    <div>
      <h1>Search Results</h1>
      <div className="row">
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div key={result.id} className={`search-result  ${result.searchIdentifier}`}>
              <h2>{result.name}</h2>
              
              <p>{result.description}</p>
              <p><Link to={`/product/${result.id}`}>Read More</Link></p>
              <img src={result.image} alt={result.name} />
              
            </div>
          ))
        ) : (
          <p className='null'>No results found for: {searchQuery}</p>
        )};
      </div>
    </div>
  );
}

export default SearchResults;
