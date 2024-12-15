import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCartProvider, useShoppingCart } from './components/khoa/ShoppingCartContext';
import { Checkout } from './components/jaowad/Checkout';
import Home from './components/cody/Home';
import ProductList from './components/khoa/ProductList';
import ProductDetails from './components/khoa/ProductDetails';
import ShoppingCart from './components/khoa/ShoppingCart';
import About from './components/jaowad/About';
import Contact from './components/jaowad/Contact';
import './App.css';

const Header = () => {
  const { getCartItemCount } = useShoppingCart(); // Access the cart item count

  return (
    <header className="header">
      <div className="logo">JCCK</div>
      <nav className="nav">
        <Link to="/" className="navLink">Home</Link>
        <Link to="/products" className="navLink">Products</Link>
        <Link to="/about" className="navLink">About</Link>
        <Link to="/contact" className="navLink">Contact</Link>
      </nav>
      {/* Shopping Cart Button with Dynamic Item Count */}
      <Link to="/cart" className="cartButton">
        🛒 Shopping Cart ({getCartItemCount()})
      </Link>
    </header>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <ShoppingCartProvider>
      <Router>
        <div className="App">
          {/* Header */}
          <Header />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<ProductList searchTerm={searchTerm} />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>

          {/* Footer */}
          <footer className="footer">
            <div>
              <a href="#!" className="footerLink">Facebook</a> |
              <a href="#!" className="footerLink">Instagram</a> |
              <a href="#!" className="footerLink">LinkedIn</a>
            </div>
            <div>Email: jcck@gmail.com | Phone: (709) 123-5555</div>
          </footer>
        </div>
      </Router>
    </ShoppingCartProvider>
  );
};

export default App;
