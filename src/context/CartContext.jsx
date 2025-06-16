import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(undefined);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem = {
        ...action.payload,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      };
      return [...state, newItem];
    }
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload);
    case 'UPDATE_QUANTITY':
      return state
        .map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        )
        .filter(item => item.quantity > 0);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, []);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = item.type === 'menu'
        ? item.burger.basePrice
        : item.burger.totalPrice;
      return total + price * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};