import React, { useContext } from 'react'
import './Css/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext' 
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
import { useNavigate } from 'react-router-dom'

const ShopCategory = (props) => {  
  const {all_product} = useContext(ShopContext)
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/products')
  }
  return (
    <div className="shop-category">
      <img className='shop-categrory-banner' src={props.banner} alt=''/> 
      <div className="shopcategory-indexshort">
        <p>
          <span>Showing 1-12</span> Out of 36 products
        </p>
        <div className="shopcategory-sort">
          short by <img src={dropdown_icon} alt=''/>
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item,i)=>{
          if (props.category===item.category) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          }
          else{
            return null;
          }
        })}
      </div>
      <div onClick={handleRedirect} className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory;  