import React, {useRef, useEffect, useState} from 'react';
import SearchResults from '../../Components/SearchResults/SearchResults';
import { useLocation } from 'react-router-dom';
import delllogo from '../../Components/Assets/delllogo.png';
import hplogo from '../../Components/Assets/hplogo.png';
import asuslogo from '../../Components/Assets/asuslogo.png';
import acerlogo from '../../Components/Assets/acerlogo.jpg';
import microsoftlog from '../../Components/Assets/microsoftlogo.png';
import applelogo from '../../Components/Assets/applelogo.jpg';
import './Hero.css';
import Products from '../../Pages/Products';


const Hero = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    const searchResultsRef = useRef(null);
    const [laptopModels, setAll_Product] = useState([]);

    useEffect(() => {
      // Fetch all products
      fetch('https://lapuniversbackend-production.up.railway.app/allproducts')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Fetched products:', data);
          setAll_Product(data);
        })
        .catch((error) => console.error('Error fetching products:', error));
      }, []);
    
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
      <div className='hero'>
    
        <h1>WELCOME TO LAPUNIVERSE</h1>
        <p className='hero-items'>Explore the vast galaxy of cutting-edge laptops that redefine performance and innovation.</p>
        {searchQuery && (
          <SearchResults searchResults={filteredModels} searchParams={searchParams} ref={searchResultsRef}>
            <Products laptopModels={filteredModels} />
          </SearchResults>
        )}
        
    
     <section className='section'>
     <div className='row'>
     <div className='colums'>
     <h1>Laptop Services</h1>
     <p>Where The Laptops Get serviced By The LapUniverse With Advance L6 Chiplevel Service. The Brand New Laptops, Renewd Laptops, For Rentels And Sales</p>
     </div>
     <div className='colums'>
     <h1>something</h1>
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
          
        <p>Copyright © 2024 All Right Reserved LapUniverse</p>
      </div>
    );
     }
    
     function isQueryMatch(model, searchQuery) {
      const queryWords = searchQuery.split(/\s+/); // Split the query into words
      
      // Check if any word in the query is present in the model's name or description
      return queryWords.some(word =>
        (model.name && model.name.toLowerCase().includes(word)) ||
        (model.description && model.description.toLowerCase().includes(word))
      );
  }
  

export default Hero;