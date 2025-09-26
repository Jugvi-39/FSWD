import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.payload;
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.title === action.payload.title);
      let newItems;
      if (existing) {
        newItems = state.items.map(i => i.title === action.payload.title ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      return { ...state, items: newItems };
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(i => i.title !== action.payload);
      return { ...state, items: newItems };
    }
    case 'UPDATE_QTY': {
      const { title, quantity } = action.payload;
      const newItems = state.items
        .map(i => i.title === title ? { ...i, quantity: Math.max(1, quantity) } : i)
        .filter(i => i.quantity > 0);
      return { ...state, items: newItems };
    }
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

const initialCartState = { items: [] };

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('quickcart_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'INIT', payload: parsed });
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('quickcart_cart', JSON.stringify(state));
    } catch (_) {}
  }, [state]);

  const api = useMemo(() => ({
    items: state.items,
    addItem: (product) => dispatch({ type: 'ADD_ITEM', payload: product }),
    removeItem: (title) => dispatch({ type: 'REMOVE_ITEM', payload: title }),
    updateQuantity: (title, quantity) => dispatch({ type: 'UPDATE_QTY', payload: { title, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
    totalItems: state.items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal: state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  }), [state]);

  return (
    <CartContext.Provider value={api}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}



