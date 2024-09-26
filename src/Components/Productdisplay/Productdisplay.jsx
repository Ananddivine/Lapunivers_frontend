import React, { useContext, useState } from 'react';
import './Productdisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const Productdisplay = (props) => {
    const { product } = props;
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [mainImage, setMainImage] = useState(product.images ? product.images[0] : 'https://via.placeholder.com/300');
    const { addToCart } = useContext(ShopContext);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleImageClick = (image) => {
        setMainImage(image);
    };

    const description = product.description || '';
    const images = product.images || [];

    return (
        <div className='Productdisply'>
            <div className="product-display-left">
                <div className="productdisplay-img-list">
                    {images.map((image, index) => (
                        <img 
                            key={index} 
                            src={image} 
                            alt={product.name} // Descriptive alt text
                            onClick={() => handleImageClick(image)}
                            className="productdisplay-thumbnail"
                        />
                    ))}
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={mainImage} alt={product.name} /> {/* Descriptive alt text */}
                </div>
            </div>
            <div className="product-displayright">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="Star icon" />
                    <img src={star_icon} alt="Star icon" />
                    <img src={star_icon} alt="Star icon" />
                    <img src={star_icon} alt="Star icon" />
                    <img src={star_dull_icon} alt="Empty star icon" />
                    <p>(132)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-prices-old">{product.old_price}</div>
                    <div className="productdisplay-right-prices-new">{product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    <p>
                        {showFullDescription
                            ? description
                            : description.length > 100
                                ? `${description.substring(0, 100)}...`
                                : description}
                    </p>
                    {description.length > 100 && (
                        <button className='read-description' onClick={toggleDescription}>
                            {showFullDescription ? 'Read Less' : 'Read More'}
                        </button>
                    )}
                </div>
                <button onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
                <p className="productdisplay-right-category"><span>Category :</span> {product.category}</p>
            </div>
        </div>
    );
};

export default Productdisplay;
