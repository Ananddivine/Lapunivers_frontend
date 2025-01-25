import React, { useState, useContext } from "react";
import { useNavigate  } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import './SearchiItemDisplay.css';

const SearchiItemDisplay = () => {

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const { all_product } = useContext(ShopContext);

       //----------------+-------  search Function LapUniverse  -------+------------//
       const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    
        // Filter the products based on the search term
        if (value) {
            const filteredSuggestions = all_product.filter(product =>
                `${product.name?.toLowerCase() || ''} ${product.description?.toLowerCase() || ''}`.includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };
    

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(`${suggestion.name} ${suggestion.description}`);
        setSuggestions([]);
        navigate(`/search?search=${suggestion.name}`);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?search=${searchTerm}`);
    };

  return (
    <div className="Searchresult-item">
          <form className="form-inline my-2 my-lg-0" onSubmit={handleSearchSubmit}>
                <input
                    className="form-control mr-sm-2 search"
                    type="search"
                    placeholder=" &#128269; Search the laptop models & Products"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                    Search
                </button>
                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion.name} {suggestion.description}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
    </div>
  )
}

export default SearchiItemDisplay