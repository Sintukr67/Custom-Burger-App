import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';

const Cart = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();
  const { isAuthenticated, user } = useAuth();

  const getIngredientNames = (ingredients) => {
    if (!ingredients) return '';
    return ingredients.map(ing => ing.name).join(', ');
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      alert('Please sign in to place an order');
      return;
    }

    try {
      const orderItems = items.map(item => ({
        type: item.type,
        burger: item.type === 'menu' ? item.burger._id : undefined,
        customBurger: item.type === 'custom' ? {
          name: item.burger.name,
          ingredients: item.burger.ingredients,
          totalPrice: item.burger.totalPrice
        } : undefined,
        quantity: item.quantity,
        price: item.type === 'menu' ? item.burger.basePrice : item.burger.totalPrice
      }));

      const orderData = {
        items: orderItems,
        totalAmount: getTotalPrice(),
        deliveryAddress: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'ST',
          zipCode: '12345'
        }
      };

      await ordersAPI.create(orderData);
      alert('Order placed successfully!');
      clearCart();
      onClose();
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-secondary-800 flex items-center">
              <ShoppingBag className="h-6 w-6 mr-2" />
              Your Order ({getTotalItems()})
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500">Add some delicious plant-based burgers to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => {
                  const burger = item.burger;
                  const price = item.type === 'menu' ? burger.basePrice : burger.totalPrice;

                  return (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-secondary-800">{burger.name}</h3>
                        {item.type === 'menu' && burger.description && (
                          <p className="text-sm text-gray-600 mt-1">{burger.description}</p>
                        )}
                        {item.type === 'custom' && (
                          <p className="text-sm text-gray-600 mt-1">
                            {getIngredientNames(burger.ingredients)}
                          </p>
                        )}
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="mx-2 text-gray-700">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className="text-lg font-semibold text-primary-600">
                          ${(price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="mt-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-secondary-800">Total:</span>
                <span className="text-2xl font-bold text-primary-600">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  {isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Order'}
                </button>
                
                <button
                  onClick={clearCart}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;