import React, { useEffect, useState } from 'react';
import Title from '../Components/Title/Title';
import './Css/Orders.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Components/axiosInstance/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.post('/api/orders/myorders', {}, {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      });

      setOrders(response.data.orders);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const response = await axiosInstance.post('/api/orders/cancelorder', { orderId }, {
        headers: {
          'auth-token': localStorage.getItem('auth-token'),
        },
      });

      toast.success(response.data.message);
      // Refresh the orders list after cancellation
      fetchOrders();
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    const username = localStorage.getItem('username');

    if (!token || !username) {
      localStorage.clear();
      navigate('/login');
    } else {
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
              {/* Add the cancel order button */}
              {order.status !== 'Canceled' && order.status !== 'Completed' && (
                <button 
                  onClick={() => cancelOrder(order._id)} 
                  className='border px-4 py-2 text-sm font-medium rounded-sm text-red-500 mt-2'>
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};


export default Orders;
