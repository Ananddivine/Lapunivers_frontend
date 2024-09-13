import React, { createContext, useState, useEffect} from "react";

export const ShopContext = createContext(null);
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

    useEffect(() => {
        // Fetch all products
        fetch('https://lapuniversbackend-production.up.railway.app/allproducts')
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log('Fetched products:', data);
            setAll_Product(data);
          })
          .catch((error) => console.error('Error fetching products:', error));
    
      // // Fetch cart items if the user is authenticated
      //   if (localStorage.getItem('auth-token')) {
      //     fetch('https://lapuniversbackend-production.up.railway.app/getcart', {
      //       method: 'POST',
      //       headers: {
      //         Accept: 'application/json',
      //         'auth-token': `${localStorage.getItem('auth-token')}`,
      //         'Content-Type': 'application/json',
      //       },
      //     })
      //       .then((response) => response.json())
      //       .then((data) => {
      //         console.log('Fetched cart items:', data);
      //         setCartItems(data); // Update the cartItems state with fetched data
      //       })
      //       .catch((error) => console.error('Error fetching cart items:', error));
      //   }
      }, []);
    
      const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('auth-token')) {
          fetch('https://lapuniversbackend-production.up.railway.app/addtocart', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'auth-token': localStorage.getItem('auth-token'),
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item: itemId }),
          })
            .then((response) => response.json())
            .then((data) => console.log('Item added to cart:', data))
            .catch((error) => console.error('Error adding item to cart:', error));
        }
      };
    
      const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem('auth-token')) {
          fetch('https://lapuniversbackend-production.up.railway.app/removecartitem', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'auth-token': localStorage.getItem('auth-token'),
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item: itemId }),
          })
            .then((response) => response.json())
            .then((data) => console.log('Item removed from cart:', data))
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
        addToCart,
        removeFromCart,
      };

    return (
        <ShopContext.Provider value={ContextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};


