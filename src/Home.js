// Home.js
import React, { useRef, useEffect } from 'react';
import SearchResults from './SearchResults';
import { useLocation } from 'react-router-dom';
import "./Home.css";
import laptopModels from './data';
import Product from './Product';
import TimelineComponent from './TimelineComponent';
import delllogo from './images/delllogo.png';
import hplogo from './images/hplogo.png';
import asuslogo from './images/asuslogo.png';
import acerlogo from './images/acerlogo.png';
import microsoftlog from './images/microsoftlogo.png';
import applelogo from './images/applelogo.jpg';


function Home() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');
  const searchResultsRef = useRef(null);

  // Check if searchQuery is null or empty
  const filteredModels = searchQuery
    ? laptopModels.filter(model =>
        isQueryMatch(model, searchQuery.toLowerCase())
      )
    : [];

    useEffect(() => {
      // Scroll to the search results when they are available
      window.scrollTo({ top: -20 });
    }, [searchQuery]);

  console.log('Search Query:', searchQuery);
  console.log('Filtered Models:', filteredModels);

  return (
    <div>

      <h1>WELCOME TO LAPUNIVERSE</h1>
      <p className='class'>Explore the vast galaxy of cutting-edge laptops that redefine performance and innovation.</p>
      {searchQuery && (
        <SearchResults searchResults={filteredModels} searchParams={searchParams} ref={searchResultsRef}>
          <Product laptopModels={filteredModels} />
        </SearchResults>
      )}
    

<section className='section'>
<div className='row'>
<div className='colums'>
<h1>Laptop Services</h1>
<p>Where The Laptops Get serviced By The LapUniverse With Advance L6 Chiplevel Service. The Brand New Laptops, Renewd Laptops, For Rentels And Sales</p>
</div>
<div className='colums'>
<h1>Laptops Rentels</h1>
<p>Elevate your business with Lapuivers' laptop rentals. Access cutting-edge technology on demand, empowering your journey towards success without the hassle of ownership.</p>
</div>
</div>
   
</section>

{/*-------------ICONS----------------------*/}

<div className='icons row'>
  <div className='col-md-2 col-4'>
    <img src={delllogo} alt='Dell logo' />
  </div>
  <div className='col-md-2 col-4'>
    <img src={hplogo} alt='HP logo' />
  </div>
  <div className='col-md-2 col-4'>
    <img src={asuslogo} alt='Asus logo' />
  </div>
  <div className='col-md-2 col-4'>
    <img src={acerlogo} alt='Acer logo' />
  </div>
  <div className='col-md-2 col-4'>
    <img src={microsoftlog} alt='Windows logo' />
  </div>
  <div className='col-md-2 col-4'>
    <img src={applelogo} alt='Apple logo' />
  </div>
</div>

<TimelineComponent />





    <div className='row'>
        <div className='column'>
          <h2>Featured Models</h2>
          <p>Discover the latest in technology with our premium laptop models, crafted for unparalleled performance and style.</p>
        </div>
        <div className='column'>
          <h2>Best Sellers</h2>
          <p>Join the legion of satisfied customers who have chosen our best-selling laptops for their reliability and cutting-edge features.</p>
        </div>
        <div className='column'>
          <h2>Special Offers</h2>
          <p>Unlock exclusive deals and special offers on high-performance laptops. Your dream laptop is just a click away!</p>
        </div>
        <div className='column'>
          <h2>Customer Reviews</h2>
          <p>Read what our customers are saying about their LAPUNIVERSE experience. Join the community of happy laptop owners!</p>
        </div>
      </div>
    </div>
  );
}

function isQueryMatch(model, searchQuery) {
  const queryWords = searchQuery.split(/\s+/); // Split the query into words

  // Check if any word in the query is present in the model's name or description
  return queryWords.some(word =>
    model.name.toLowerCase().includes(word) ||
    model.description.toLowerCase().includes(word)
  );
}


export default Home;
