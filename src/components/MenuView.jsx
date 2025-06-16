import React from 'react';
import { Star, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { menuItems } from '../data/menu';

const MenuView = () => {
  const { addToCart } = useCart();

  const getIngredientNames = (ingredients) => {
    return ingredients.map(ing => ing.name).join(', ');
  };

  const handleAddToCart = (burger) => {
    addToCart({
      type: 'menu',
      burger,
      quantity: 1,
    });
  };

  // Use the exact order from menuItems
  const popularItems = menuItems.filter(item => item.popular);
  const categoryGroups = {
    classic: menuItems.filter(item => item.category === 'classic'),
    signature: menuItems.filter(item => item.category === 'signature'),
    premium: menuItems.filter(item => item.category === 'premium'),
  };

  const AddToCartButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
    >
      <Plus className="h-5 w-5" />
      <span className="font-medium">Add to Cart</span>
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-4">
          Our Signature Plant-Based Burgers
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Crafted with premium plant-based ingredients and grilled to perfection. Each creation tells a story of flavor.
        </p>
      </div>

      {/* Popular Items */}
      {popularItems.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Star className="h-6 w-6 text-gold-500 mr-2" />
            <h2 className="text-2xl font-bold text-secondary-800">Popular Choices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularItems.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary-800 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary-600">
                      ${item.basePrice.toFixed(2)}
                    </span>
                    <AddToCartButton onClick={() => handleAddToCart(item)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Category Sections */}
      {Object.entries(categoryGroups).map(([category, items]) => (
        items.length > 0 && (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-secondary-800 mb-6 capitalize">
              {category} Creations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div key={item._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-secondary-800 mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-primary-600">
                        ${item.basePrice.toFixed(2)}
                      </span>
                      <AddToCartButton onClick={() => handleAddToCart(item)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  );
};

export default MenuView;