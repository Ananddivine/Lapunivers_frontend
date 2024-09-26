import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext';
import './../CartTotal/Carttotal.css'

const CartTotal = () => {
    const { getTotalCartAmount } = useContext(ShopContext);
  return (
    <div className='carttotal'>
    <h1>Cart Totals</h1>
    <div>
      <div className="cartitemtotal-item">
        <p>Subtotal</p>
        <p>${getTotalCartAmount()}</p>
      </div>
      <div className='cartitemtotal-item'>
        <p>Shipping Fee</p>
        <p>Free</p>
      </div>
      <div className='cartitemtotal-item'>
        <h3>Total</h3>
        <h3>${getTotalCartAmount()}</h3>
      </div>
    </div>
    </div>
  )
}

export default CartTotal;
