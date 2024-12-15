import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShoppingCart } from './ShoppingCartContext';
import useApiFetch from './useApiFetch';
import './ProductList.css';

const ProductList = () => {
  const { categoryName } = useParams();
  const { cartState: { cartItems = [] }, addToCart } = useShoppingCart();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: products, loading, error } = useApiFetch('/products');

  // Loading State
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error State
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Filter products by category and search term
  const filteredProducts = products.filter((product) => {
    const matchesCategory = !categoryName || product.category === categoryName;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle adding products to the cart
  const handleAddToCart = (product) => {
    if (!product || !product.id) {
      console.error('Invalid product passed to handleAddToCart');
      return;
    }

    const existingItem = cartItems.find((item) => item.id === product.id);
    const availableQuantity = product.availableQuantity;

    if (existingItem) {
      // Update the cart with the available quantity
      const newQuantity = Math.min(existingItem.quantity + availableQuantity, availableQuantity);
      addToCart({ ...existingItem, quantity: newQuantity });
    } else {
      // Add the product with its available quantity
      addToCart({ ...product, quantity: availableQuantity });
    }

    alert(`Added ${availableQuantity} of ${product.name} to the cart.`);
  };

  return (
    <div className="products-container">
      {/* Search Bar */}
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="products-grid">
  {filteredProducts.map((product) => (
    <div key={product.id} className="product-card">
      <img className="product-image" src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="product-category">{product.category}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <p className="product-stock">
        Available Quantity: {product.available || 'Not available'}
      </p>



            {/* Add to Cart Button */}
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>

            {/* View Details Button */}
            <Link className="product-link view-details-button" to={`/products/${product.id}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
