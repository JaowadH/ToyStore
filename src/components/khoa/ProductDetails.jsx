import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShoppingCart } from './ShoppingCartContext';
import useApiFetch from './useApiFetch';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useShoppingCart();
  const { data: product, loading, error } = useApiFetch(`/products/${id}`);

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  const handleAddToCart = () => {
    if (product.available === 0) {
      alert(`${product.name} is currently out of stock.`);
      return;
    }

    addToCart({ ...product, quantity: 1 }); // Default quantity to 1
    alert(`${product.name} added to your cart!`);
  };

  return (
    <div className="product-details-container">
      <div className="product-details-card">
        <img className="product-details-image" src={product.image} alt={product.name} />
        <div className="product-details-content">
          <h2>{product.name}</h2>
          <p className="product-details-description">{product.description}</p>
          <p className="product-details-category">Category: {product.category}</p>
          <p className="product-details-price">${product.price.toFixed(2)}</p>
          <p className="product-details-available">
            Available: {product.available > 0 ? product.available : 'Out of Stock'}
          </p>
          <button
            className="product-details-add-to-cart-button"
            onClick={handleAddToCart}
            disabled={product.available === 0}
          >
            Add to Cart
          </button>
          <Link className="product-details-back-link" to="/">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
