import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navigation from './Navigation';
import Headers from './Headers';
import Home from './Home';
import Product from './Product';
import About from './About';
import Services from './Services';
import Login from './Login';
import Register from './Register';
import Contact from './Contact';
import Welcome from './Welcome';
import ForgotPassword from './ForgotPassword';
import AdminPanel from './AdminPanel';
import ProductDetail from './ProductDetail';
import Fechingfilesfromrender from './Fechingfilesfromrender';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Headers />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Product' element={<Product />} />
          <Route path='/About' element={<About />} />
          <Route path='/Services' element={<Services />} /> 
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Welcome' element={<Welcome />} />
          <Route path='/ForgotPassword' element={<ForgotPassword />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/*' element={<Home />} />
          <Route path='/fechingfilesfromrender' element={<Fechingfilesfromrender />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
