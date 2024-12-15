import React, { createContext, useContext, useReducer } from 'react';

const ShoppingCartContext = createContext();

// Reducer function to manage cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cartItems?.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    }
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };
    }
    case 'CLEAR_CART': {
      return { ...state, cartItems: [] };
    }
    default: {
      console.error(`Unhandled action type: ${action.type}`);
      return state;
    }
  }
};

// ShoppingCartProvider to provide cart context
export const ShoppingCartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { cartItems: [] });

  const addToCart = (product) => {
    if (!product || !product.id) {
      console.error('Invalid product passed to addToCart');
      return;
    }
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    if (!productId) {
      console.error('Invalid productId passed to removeFromCart');
      return;
    }
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (!productId || quantity < 1) {
      console.error('Invalid parameters passed to updateQuantity');
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const calculateSubtotal = () => {
    return cartState.cartItems?.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ) || 0;
  };

  const getCartItemCount = () => {
    return cartState.cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;
  };

  const confirmOrder = () => {
    if (!cartState.cartItems?.length) {
      alert('Your cart is empty!');
      return;
    }
    alert('Thanks for your order!');
    clearCart();
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartState,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        calculateSubtotal,
        getCartItemCount,
        confirmOrder,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
  }
  return context;
};
