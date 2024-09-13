import React, { useState } from 'react';
import './Productdisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { useNavigate } from 'react-router-dom';

const Productdisplay = (props) => {
    const { product } = props;
    const [showFullDescription, setShowFullDescription] = useState(false);
    const navigate = useNavigate();

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleRedirect = () => {
        navigate('/location'); 
    };

    // Ensure product.description is defined
    const description = product.description || '';

    return (
        <div className='Productdisply'>
            <div className="product-display-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="product-displayright">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(132)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-prices-old">{product.old_price}</div>
                    <div className="productdisplay-right-prices-new">{product.new_price}</div>
                </div>
                <div className="productdisplay-right-discription">
                    <p>
                        {showFullDescription 
                            ? description 
                            : description.length > 100 
                              ? `${description.substring(0, 100)}...` 
                              : description}
                    </p>
                    {description.length > 100 && (
                        <button className='read-discription' onClick={toggleDescription}>
                            {showFullDescription ? 'Read Less' : 'Read More'}
                        </button>
                    )}
                </div>
                <p className="productdisplay-nearby-shop">
                   
                    <button onClick={handleRedirect}>Add Product</button>
                </p>
                <p className="productdisplay-right-category"><span>Category :</span> {product.category}</p>
            </div>
        </div>
    );
}

export default Productdisplay;
