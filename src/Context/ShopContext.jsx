import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Components/axiosInstance/axiosInstance"; // Importing axiosInstance

export const ShopContext = createContext();

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index <= 300; index++) {
    cart[index] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [cartTotal, setCartTotal] = useState(getDefaultCart());
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_BASE_URL; // Using the base URL from the environment variable

  useEffect(() => {
    // Fetch all products using axiosInstance
    axiosInstance.get(`${baseURL}/api/products`)  
      .then((response) => {
        console.log('Fetched products:', response.data);
        setAll_Product(response.data);
      })
      .catch((error) => console.error('Error fetching products:', error));

    // Fetch cart items if the user is authenticated
    if (localStorage.getItem('auth-token')) {
      axiosInstance.post(`${baseURL}/api/users/getcart`, {}, {
        headers: {
          'auth-token': `${localStorage.getItem('auth-token')}`,
        },
      })
        .then((response) => {
          setCartItems(response.data);
          setCartTotal(response.data);
        })
        .catch((error) => console.error('Error fetching cart items:', error));
    }
  }, [baseURL]);

  const addToCart = async (itemId) => {
    const token = localStorage.getItem('auth-token'); // Retrieve JWT
    if (!token) {
      navigate('/Login'); // Redirect to the login page
      return; // Exit the function
    }

    try {
      const response = await axiosInstance.post(`${baseURL}/api/users/addtocart`, 
        { item: itemId },
        {
          headers: {
            'auth-token': token, // Send the JWT here
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Item added to cart:', response.data);

      if (response.data.success) {
        // Update the cart items state locally
        setCartItems((prev) => ({
          ...prev,
          [itemId]: prev[itemId] + 1, // Increment the quantity
        }));
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem('auth-token')) {
      axiosInstance.post(`${baseURL}/api/users/removecartitem`, 
        { item: itemId },
        {
          headers: {
            'auth-token': localStorage.getItem('auth-token'),
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => console.log('Item removed from cart:', response.data))
        .catch((error) => console.error('Error removing item from cart:', error));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    if (all_product.length === 0) {
      return totalAmount; // If products are not loaded yet, return 0
    }

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        } else {
          console.error(`Product with ID ${item} not found`);
        }
      }
    }

    for (const item in cartTotal) {
      if (cartTotal[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartTotal[item];
        } else {
          console.error(`Product with ID ${item} not found`);
        }
      }
    }

    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const ContextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    cartTotal,
    addToCart,
    removeFromCart,
    navigate
  };

  return (
    <ShopContext.Provider value={ContextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
