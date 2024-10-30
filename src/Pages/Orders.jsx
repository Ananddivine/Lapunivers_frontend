import React, { useEffect, useState } from 'react';
import Title from '../Components/Title/Title';
import './Css/Orders.css';
import { useNavigate } from 'react-router-dom';
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://lapuniversbackend-production.up.railway.app/api/orders/myorders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
      });

      const text = await response.text();
      console.log("Response Text:", text);
      const data = JSON.parse(text);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch orders');
      }

      setOrders(data.orders);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    const username = localStorage.getItem('username');

    if (!token || !username) {
      // Token or username missing, clear localStorage and redirect to login
      localStorage.clear();
      navigate('/login'); // Redirect to login page
    } else {
      // Fetch orders if token and username are available
      fetchOrders();
    }
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='border-t mt-8'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {orders.map((order) => (
          <div key={order._id} className='py-4 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-start gap-6 text-sm md:gap-8 md:ml-4'>
              {/* Check for product images */}
                              {order.products[0]?.productId?.images && order.products[0].productId.images.length > 0 ? (
                  <img 
                    src={order.products[0].productId.images[0]} 
                    alt={order.products[0].productId.name} 
                    className='w-20 h-20 md:w-24 md:h-24 object-cover rounded-md' 
                  />
                ) : (
                  <img 
                    src='https://via.placeholder.com/150' 
                    alt='Placeholder' 
                    className='w-20 h-20 md:w-24 md:h-24 object-cover rounded-md' 
                  />
                      )}
              <div>
                <p className='sm:text-base font-medium'>{order.products[0]?.productId?.name || 'Product Name'}</p>
                <div className='flex items-center text-gray-700'>
                <p className='text-lg'>
                    ${order.products[0]?.productId?.new_price * order.products[0]?.quantity || 0}
                  </p>
                  <p>Quantity: {order.products[0]?.quantity || 0}</p>
                </div>
                <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(order.date).toLocaleDateString()}</span></p>
              </div>
            </div>
            <div className='process-shipment md:text-center'>
              <div className='flex items-center justify-center gap-2'>
                <p className='text-sm md:text-base'>Status: {order.status || 'Status not available'}</p>
              </div>
              <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
