import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useShoppingCart } from '../khoa/ShoppingCartContext';
import { useLocation } from 'react-router-dom';
import './Checkout.css';

export const Checkout = () => {
  const { cartState } = useShoppingCart();
  const { cartItems } = cartState;
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    shippingAddress: '',
  });

  const [cartTotal, setCartTotal] = useState(0);
  const [isThankYouDisplayed, setIsThankYouDisplayed] = useState(false);

  // Calculate cart total dynamically from cart items or navigation state
  useEffect(() => {
    const subtotalFromState = location.state?.subtotal;
    if (subtotalFromState) {
      setCartTotal(subtotalFromState);
    } else {
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setCartTotal(total.toFixed(2));
    }
  }, [cartItems, location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleApprove = (orderID) => {
    console.log(`Transaction completed with Order ID: ${orderID}`);
    setIsThankYouDisplayed(true);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Billing Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="shippingAddress">Shipping Address:</label>
          <input
            type="text"
            id="shippingAddress"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleInputChange}
            required
          />
        </div>
      </form>

      <div className="cart-summary">
        <h3>Order Summary</h3>
        <p>Subtotal: ${cartTotal}</p>
      </div>

      <div className="payment-section">
        <h3>Pay with PayPal</h3>
        <PayPalScriptProvider
          options={{
            'client-id': 'Ac4hPaBkcNsf-Fsbb3rEQ0VaXzM1bETSVQt163E2PZxMtbWw5JFMsT_3BhSMgiKXRIdmVKscUdHs5t3C',
          }}
        >
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: cartTotal, // Use the dynamic cart total
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                const { id } = details;
                handleApprove(id);
              });
            }}
            onError={(err) => {
              console.error('PayPal Checkout error:', err);
              alert('There was an issue processing your payment.');
            }}
          />
        </PayPalScriptProvider>
      </div>

      {isThankYouDisplayed && (
        <div className="thank-you-message">
          <h3>Thank you for purchasing!</h3>
          <p>Your order has been successfully processed.</p>
        </div>
      )}
    </div>
  );
};
