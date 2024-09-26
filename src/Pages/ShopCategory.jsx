import React, { useContext, useState } from 'react';
import './Css/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';
import { useNavigate } from 'react-router-dom';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const navigate = useNavigate();

  // State to handle the selected sort option
  const [selectedCategory, setSelectedCategory] = useState(props.category || 'All Categories');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleRedirect = () => {
    navigate('/products');
  };

  // Filter products based on the selected category
  const filteredProducts = all_product.filter((item) => {
    if (selectedCategory === 'All Categories') return true; // Show all products
    return item.category === selectedCategory; // Show products that match the selected category
  });

  return (
    <div className="shop-category">
      <img className="shop-categrory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexshort">
        <p>
          <span>Showing 1-{filteredProducts.length}</span> out of {all_product.length} products
        </p>
        <div className="shopcategory-sort">
          <label htmlFor="categorySort">Sort by: </label>
          <select
            id="categorySort"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="All Categories">All Categories</option>
            <option value="laptop">Laptop</option>
            <option value="keyboard">Keyboard</option>
            <option value="battery">Battery</option>
          </select>
          <img src={dropdown_icon} alt="dropdown icon" />
        </div>
      </div>
      <div className="shopcategory-products">
        {filteredProducts.map((item, i) => {
          const productImage = item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150';

          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={productImage}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
      <div onClick={handleRedirect} className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
