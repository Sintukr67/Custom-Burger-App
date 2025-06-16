import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ingredients } from '../data/ingredients';

const BurgerBuilder = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [burgerName, setBurgerName] = useState('My Custom Burger');
  const { addToCart } = useCart();

  // Add default Beyond Meat patty
  React.useEffect(() => {
    const beyondPatty = ingredients.find(ing => ing.name.toLowerCase().includes('beyond'));
    if (beyondPatty) {
      setSelectedIngredients([beyondPatty.id]);
    }
  }, []);

  const ingredientCategories = {
    protein: ingredients.filter(ing => ing.category === 'protein'),
    cheese: ingredients.filter(ing => ing.category === 'cheese'),
    vegetable: ingredients.filter(ing => ing.category === 'vegetable'),
    sauce: ingredients.filter(ing => ing.category === 'sauce'),
    extra: ingredients.filter(ing => ing.category === 'extra'),
  };

  const calculateTotalPrice = () => {
    const basePrice = 8.99;
    const ingredientsCost = selectedIngredients.reduce((total, ingredientId) => {
      const ingredient = ingredients.find(ing => ing.id === ingredientId);
      return total + (ingredient?.price || 0);
    }, 0);
    return basePrice + ingredientsCost;
  };

  const getIngredientCount = (ingredientId) => {
    return selectedIngredients.filter(id => id === ingredientId).length;
  };

  const addIngredient = (ingredientId) => {
    setSelectedIngredients(prev => [...prev, ingredientId]);
  };

  const removeIngredient = (ingredientId) => {
    const index = selectedIngredients.indexOf(ingredientId);
    if (index > -1) {
      setSelectedIngredients(prev => {
        const newIngredients = [...prev];
        newIngredients.splice(index, 1);
        return newIngredients;
      });
    }
  };

  const handleAddToCart = () => {
    const customBurger = {
      name: burgerName,
      ingredients: selectedIngredients,
      totalPrice: calculateTotalPrice(),
    };

    addToCart({
      type: 'custom',
      burger: customBurger,
      quantity: 1,
    });

    // Reset builder
    const beyondPatty = ingredients.find(ing => ing.name.toLowerCase().includes('beyond'));
    setSelectedIngredients(beyondPatty ? [beyondPatty.id] : []);
    setBurgerName('My Custom Burger');
  };

  const clearAll = () => {
    setSelectedIngredients([]);
    setBurgerName('My Custom Burger');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary-800 mb-4">
          Build Your Perfect Burger
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create your dream burger with our premium ingredients. Every combination is possible!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ingredient Selection */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-secondary-800">Choose Your Ingredients</h2>
              <button
                onClick={clearAll}
                className="text-red-500 hover:text-red-700 flex items-center space-x-2 transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear All</span>
              </button>
            </div>

            {Object.entries(ingredientCategories).map(([category, categoryIngredients]) => (
              categoryIngredients.length > 0 && (
                <div key={category} className="mb-8">
                  <h3 className="text-lg font-semibold text-secondary-700 mb-4 capitalize">
                    {category === 'vegetable' ? 'Vegetables' : category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {categoryIngredients.map((ingredient) => {
                      const count = getIngredientCount(ingredient.id);
                      const isSelected = count > 0;

                      return (
                        <div
                          key={ingredient.id}
                          className={`border-2 rounded-lg p-4 transition-all duration-200 ${
                            isSelected
                              ? 'border-primary-400 bg-primary-50'
                              : 'border-gray-200 hover:border-primary-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-secondary-800">{ingredient.name}</h4>
                            <span className="text-primary-600 font-semibold">
                              {ingredient.price === 0 ? 'Free' : `+$${ingredient.price.toFixed(2)}`}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => removeIngredient(ingredient.id)}
                                className="p-1 text-gray-500 hover:text-primary-600 transition-colors duration-200"
                                disabled={count === 0}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="text-sm font-medium text-gray-700">{count}</span>
                              <button
                                onClick={() => addIngredient(ingredient.id)}
                                className="p-1 text-gray-500 hover:text-primary-600 transition-colors duration-200"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold text-secondary-800 mb-4">Your Creation</h2>
            
            {/* Burger Name Input */}
            <div className="mb-6">
              <label htmlFor="burgerName" className="block text-sm font-medium text-gray-700 mb-2">
                Name Your Burger
              </label>
              <input
                type="text"
                id="burgerName"
                value={burgerName}
                onChange={(e) => setBurgerName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Selected Ingredients */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-secondary-700 mb-3">Selected Ingredients</h3>
              <div className="space-y-2">
                {selectedIngredients.map((ingredientId) => {
                  const ingredient = ingredients.find(ing => ing.id === ingredientId);
                  return ingredient ? (
                    <div key={`${ingredientId}-${selectedIngredients.indexOf(ingredientId)}`} className="flex justify-between items-center">
                      <span className="text-gray-600">{ingredient.name}</span>
                      <span className="text-primary-600">
                        {ingredient.price === 0 ? 'Free' : `+$${ingredient.price.toFixed(2)}`}
                      </span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Total Price */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-secondary-800">Total Price</span>
                <span className="text-2xl font-bold text-primary-600">
                  ${calculateTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerBuilder;