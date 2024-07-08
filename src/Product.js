import React from 'react';
import SearchResults from './SearchResults';
import { useLocation, Link } from 'react-router-dom';
import laptopModels from './data';
import './Product.css';

function Product() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  // Check if searchQuery is null or empty
  const filteredModels = searchQuery
    ? laptopModels.filter(model =>
        model.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  console.log('Search Query:', searchQuery);
  console.log('Filtered Models:', filteredModels);

  return (
    <div className='products'>
      <h1>WELCOME TO LAPUNIVERSE</h1>
      <div className='row'>
        {searchQuery && <SearchResults searchResults={filteredModels} searchParams={searchParams} />}
        {laptopModels.map(model => (
          <div key={model.id} className='productes'>
            <h2>{model.name}</h2>
            <Link to={`/product/${model.id}`}>See More</Link>
            <p>{model.description}</p>
            <img src={process.env.PUBLIC_URL + model.image} alt={model.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
