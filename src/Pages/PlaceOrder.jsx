  import React, { useContext, useState } from 'react';
  import Title from '../Components/Title/Title';
  import './Css/PlaceOrder.css';
  import CartTotal from '../Components/CartTotal/CartTotal';
  import { ShopContext } from '../Context/ShopContext';
  import axiosInstance from '../Components/axiosInstance/axiosInstance';
  import { toast, ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



  const PlaceOrder = () => {
    const { navigate, cartItems} = useContext(ShopContext);
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      phone: '',
      paymentMethod: 'cod', // Default payment method
    });

    // Handle form changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const products = Object.keys(cartItems).map((id) => ({
        productId: Number(id), // Convert ID to number
        quantity: cartItems[id],
        price: cartItems[id],
      }));
  
      console.log('Products array:', products); // Log the products array
  
      try {
        const response = await axiosInstance.post('/api/orders/placeorder', {
          products,
          deliveryInfo: formData,
        }, {
          headers: {
            'auth-token': localStorage.getItem('auth-token'),
          }
        });
  
        const data = response.data;
        if (data.success) {
          navigate('/orders');
          window.location.reload(); 
        } else {
          toast('Order placement failed: ' + data.message);
        }
      } catch (error) {
        console.error('Error placing order:', error);        
        toast.error(error.response ? error.response.data.message : error.message);        
       
      }
    };
    

    return (
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
        {/* ----------Left side------------- */}
        <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-2xl sm:text-2xl my-3 mx-4'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>

          {/* Form Fields */}
          <div className='flex gap-3'>
            <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} className='border border-gray-300 rounded py-2 px-3 w-full mx-4 my-2 outline-none' placeholder='First Name' required />
            <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} className='border border-gray-300 rounded py-2 px-3 w-full mx-4 my-2 outline-none' placeholder='Last Name' required />
          </div>
          <div className="width-full">
            <input type='email' name='email' value={formData.email} onChange={handleChange} className='border border-gray-300 rounded py-2 px-3 w-full mx-4 my-2 outline-none' placeholder='Email Id' required />
            <input type='text' name='street' value={formData.street} onChange={handleChange} className='border border-gray-300 rounded py-2 px-3 w-full mx-4 my-2' placeholder='Street' required />
          </div>
          <div className='flex gap-3'>
            <input type='text' name='city' value={formData.city} onChange={handleChange} className='border border-gray-300 rounded py-2 px-3 w-full mx-4 my-2 outline-none' placeholder='City' required />
            <input type='text' name='state' value={formData.state} onChange={handleChange} className='border border-gray-300 rounded py-2 px-3 w-full mx-4 my-2 outline-none' placeholder='State' required />
          </div>

          <div className='flex gap-3'>
            <input type='number' name='zipcode' value={formData.zipcode} onChange={handleChange} className='border border-gray-300 rounded py-2 px-3 w-full mx-4 my-2 outline-none' placeholder='Zipcode' required />
            <input type='text' name='country' value={formData.country} onChange={handleChange} className='border border-gray-300 rounded py-2 px-3 w-full mx-4 my-2' placeholder='Country' required />
          </div>

          <div className="width-full">
            <input type='number' name='phone' value={formData.phone} onChange={handleChange} className='border border-gray-300 rounded py-2 px-3 w-full mx-4 my-2 outline-none' placeholder='Phone' required />
          </div>
        </div>

        {/* -----Right Side-------- */}
        <div className="carttotal">
          <div className="mt-8 min-w-80">
            <CartTotal />
          </div>

          {/* Payment Method Section */}
          <div className='payment-method'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />
            <div className='payment-options'>
              <label className='payment'>
                <input type="radio" name="paymentMethod" value="stripe" onChange={handleChange} />
                Stripe
              </label>
              <label className='payment r'>
                <input type="radio" name="paymentMethod" value="rupay" onChange={handleChange} />
                Rupay
              </label>
              <label className='payment'>
                <input type="radio" name="paymentMethod" value="cod" onChange={handleChange} checked={formData.paymentMethod === 'cod'} />
                Cash on Delivery
              </label>
            </div>
            <div className='placeorder-button'>
              <button type="submit">Place Order</button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </form>
    );
  };

  export default PlaceOrder;
