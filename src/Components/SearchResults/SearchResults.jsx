// SearchResults.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css';

function SearchResults({ searchResults, searchParams }) {
  const searchQuery = searchParams.get('search');

  return (
    <div className='Searchresult'>
      <h1>Search Results</h1>
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div key={result.id} className={`search-result  ${result.searchIdentifier}`}>
              <h2>{result.name}</h2>
              
              <p>{result.description}</p>
              <Link to={`/product/${result.id}`}>
              <img src={result.images[0]} alt={result.name} />              
              </Link>
              
            </div>
          ))
        ) : (
          <p className='null'>No results found for: {searchQuery}</p>
        )}
    </div>
  );
}

export default SearchResults;
