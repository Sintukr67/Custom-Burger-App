import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Utensils, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './Auth/AuthModal';

const Header = ({ currentView, onViewChange, onCartToggle }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalForm, setAuthModalForm] = useState('login');
  const { getTotalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const navigationItems = [
    { id: 'menu', label: 'Menu' },
    { id: 'builder', label: 'Build Your Own' },
  ];

  const handleAuthClick = (form) => {
    setAuthModalForm(form);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => onViewChange('menu')}>
              <div className="bg-primary-500 p-2 rounded-full mr-3">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-secondary-800">Brrrgrrr</h1>
                {/* <p className="text-xs text-gray-500 -mt-1">Premium Plant-Based Burgers</p> */}
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentView === item.id
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <button
                onClick={onCartToggle}
                className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white rounded-full text-xs h-5 w-5 flex items-center justify-center animate-bounce-soft">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Auth Section */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {user?.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 animate-slide-up">
              <nav className="flex flex-col space-y-2 mb-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onViewChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2 rounded-md text-sm font-medium text-left transition-colors duration-200 ${
                      currentView === item.id
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Mobile Auth Section */}
              {isAuthenticated ? (
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">
                        {user?.name}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <button
                    onClick={() => {
                      handleAuthClick('login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-left"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      handleAuthClick('register');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialForm={authModalForm}
      />
    </>
  );
};

export default Header;