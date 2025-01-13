import React  from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import ProductDisplay from './Components/Productdisplay/Productdisplay';
import About from './Pages/About';
import Services from './Pages/Services';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Contact from './Pages/Contact';
import Welcome from './Pages/Welcome';
import ForgotPassword from './Pages/ForgotPassword';
import Notifications from './Components/Notification/Notification';
import { ShopContext } from './Context/ShopContext';
import ShopCategory from './Pages/ShopCategory';
import Products from './Pages/Products';
import Cart from './Pages/Cart';
import SearchiItemDisplay from './Components/Searchitem/SearchiItemDisplay';
import Product from './Pages/Product';
import PlaceOrder from './Pages/PlaceOrder';
import { ShopContextProvider } from './Context/ShopContext';
import './App.css';
import Orders from './Pages/Orders';
import Terms from './Components/Terms/Terms';
import Support from './Components/Support/Support';
import Advance from './Components/Factory/Advance';


function App() {

  return (
 
      <div>
      <BrowserRouter>
      <ShopContextProvider>
      <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/searchitemsdisplay' element={<SearchiItemDisplay />} />
          <Route path='/Product' element={<ProductDisplay />} />
          <Route path='/About' element={<About />} />
          <Route path='/Services' element={<Services />} /> 
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Welcome' element={<Welcome />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path='/ForgotPassword' element={<ForgotPassword />} />
          <Route path='/products' element={<ShopCategory category="laptop" />} />
          <Route path='/products' element={<Products />} />
          <Route path='/*' element={<Home />} />
          <Route path='/product' element={<Product/>}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path='/ShopContext' element={<ShopContext />} />
          <Route path='/battery' element={<ShopCategory category="battery" />} />
          <Route path='/keyboard' element={<ShopCategory category="keyboard" />} />
          <Route path='/laptop' element={<ShopCategory category="laptop" />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/Support' element={<Support />} />
          <Route path='/Factory' element={<Advance/>} />
          </Routes>
          </ShopContextProvider>
        </BrowserRouter>
      </div>
  );
}

export default App;
