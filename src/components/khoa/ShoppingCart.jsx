import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShoppingCart } from './ShoppingCartContext';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const { cartState, removeFromCart, updateQuantity, calculateSubtotal } = useShoppingCart();
  const { cartItems } = cartState;
  const navigate = useNavigate();

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, change) => {
    const item = cartItems.find((item) => item.id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0 && newQuantity <= item.available) {
        updateQuantity(productId, newQuantity);
      } else if (newQuantity > item.available) {
        alert(`Only ${item.available} units of "${item.name}" are available.`);
      }
    }
  };

  const handleCheckout = () => {
    const subtotal = calculateSubtotal();
    if (subtotal > 0) {
      navigate('/checkout');
    } else {
      alert('Your cart is empty!');
    }
  };

  return (
    <div className="shopping-cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/">Continue shopping!</Link>
        </p>
      ) : (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <div className="cart-quantity-control">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input type="text" value={item.quantity} readOnly />
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        disabled={item.quantity >= item.available}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleRemove(item.id)} className="remove-button">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-total">
            <p>Total: ${calculateSubtotal()}</p>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
