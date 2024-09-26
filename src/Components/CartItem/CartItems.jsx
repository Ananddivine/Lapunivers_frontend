import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart, navigate } = useContext(ShopContext);

  const hasItemsInCart = Object.keys(cartItems).some(id => cartItems[id] > 0);

  return (
    <div className='CartItems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {hasItemsInCart ? (
        all_product.filter(product => cartItems[product.id] > 0).map((e) => (
          <div key={e.id}>
            <div className='cartitems-format cartitems-format-main'>
              <img src={e.images && e.images.length > 0 ? e.images[0] : 'https://via.placeholder.com/150'} alt={e.name} className='carticon-product-icon' />
              <p>{e.name}</p>
              <p>${e.new_price.toFixed(2)}</p>
              <button className='cartitems-quantitiy'>{cartItems[e.id]}</button>
              <p>${(e.new_price * cartItems[e.id]).toFixed(2)}</p>
              <img className='cartitem-remove-icon' src={remove_icon} onClick={() => removeFromCart(e.id)} alt="Remove item" />
            </div>
            <hr />
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div className='cartitems-down'>
        <div className='cartitems-total'>
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitem-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <div className='cartitem-total-item'>
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <div className='cartitem-total-item'>
              <h3>Total</h3>
              <h3>${getTotalCartAmount().toFixed(2)}</h3>
            </div>
          </div>
          <button onClick={() => navigate('/place-order')}>Proceed to checkout</button>
        </div>
        <div className='cartitems-promocode'>
          <p>If you have a Promo code, enter it here</p>
          <div className="promobox">
            <input type="text" placeholder="Promo code" />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
