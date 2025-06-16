import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Ingredient from './models/Ingredient.js';
import Burger from './models/Burger.js';
import User from './models/User.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/brrrgrrr');
    
    // Clear existing data
    await Ingredient.deleteMany({});
    await Burger.deleteMany({});
    
    // Seed ingredients
    const ingredients = await Ingredient.insertMany([
      // Proteins
      { name: 'Beyond Meat Patty', price: 0, category: 'protein', available: true },
      { name: 'Grilled Chicken Breast', price: 1.50, category: 'protein', available: true },
      { name: 'Black Bean Patty', price: 1.00, category: 'protein', available: true },
      { name: 'Falafel Patty', price: 1.25, category: 'protein', available: true },
      
      // Cheese
      { name: 'American Cheese', price: 0.75, category: 'cheese', available: true },
      { name: 'Sharp Cheddar', price: 0.75, category: 'cheese', available: true },
      { name: 'Swiss Cheese', price: 1.00, category: 'cheese', available: true },
      { name: 'Pepper Jack', price: 1.00, category: 'cheese', available: true },
      { name: 'Blue Cheese Crumbles', price: 1.50, category: 'cheese', available: true },
      
      // Vegetables
      { name: 'Fresh Lettuce', price: 0, category: 'vegetable', available: true },
      { name: 'Tomato Slices', price: 0, category: 'vegetable', available: true },
      { name: 'Red Onion', price: 0, category: 'vegetable', available: true },
      { name: 'Dill Pickles', price: 0, category: 'vegetable', available: true },
      { name: 'Fresh Avocado', price: 1.50, category: 'vegetable', available: true },
      { name: 'Caramelized Onions', price: 1.00, category: 'vegetable', available: true },
      { name: 'Roasted Red Peppers', price: 1.00, category: 'vegetable', available: true },
      { name: 'Sautéed Mushrooms', price: 1.00, category: 'vegetable', available: true },
      
      // Sauces
      { name: 'House Ketchup', price: 0, category: 'sauce', available: true },
      { name: 'Dijon Mustard', price: 0, category: 'sauce', available: true },
      { name: 'Garlic Aioli', price: 0.25, category: 'sauce', available: true },
      { name: 'Smoky BBQ Sauce', price: 0.50, category: 'sauce', available: true },
      { name: 'Chipotle Mayo', price: 0.75, category: 'sauce', available: true },
      { name: 'Sriracha', price: 0.50, category: 'sauce', available: true },
      
      // Extras
      { name: 'Crispy Bacon', price: 2.00, category: 'extra', available: true },
      { name: 'Fried Egg', price: 1.50, category: 'extra', available: true },
      { name: 'Onion Rings', price: 1.75, category: 'extra', available: true },
      { name: 'Crispy Hash Browns', price: 1.25, category: 'extra', available: true }
    ]);

    // Create ingredient lookup
    const ingredientMap = {};
    ingredients.forEach(ing => {
      ingredientMap[ing.name.toLowerCase().replace(/\s+/g, '-')] = ing._id;
    });

    // Seed burgers
    await Burger.insertMany([
      {
        name: 'The Classic',
        description: 'Our signature Beyond Meat patty with American cheese, lettuce, tomato, pickles, and house sauce on a toasted bun.',
        basePrice: 12.99,
        ingredients: [
          ingredientMap['beyond-meat-patty'],
          ingredientMap['american-cheese'],
          ingredientMap['fresh-lettuce'],
          ingredientMap['tomato-slices'],
          ingredientMap['dill-pickles'],
          ingredientMap['garlic-aioli']
        ],
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
        category: 'classic',
        popular: true
      },
      {
        name: 'Mushroom Swiss',
        description: 'Juicy Beyond Meat patty with sautéed mushrooms, Swiss cheese, and garlic aioli on a brioche bun.',
        basePrice: 15.49,
        ingredients: [
          ingredientMap['beyond-meat-patty'],
          ingredientMap['swiss-cheese'],
          ingredientMap['sautéed-mushrooms'],
          ingredientMap['garlic-aioli']
        ],
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
        category: 'signature'
      }
    ]);

    // Create admin user if it doesn't exist
    const adminExists = await User.findOne({ email: 'admin@brrrgrrr.com' });
    if (!adminExists) {
      const adminUser = new User({
        name: 'Admin User',
        email: 'admin@brrrgrrr.com',
        password: 'admin123',
        role: 'admin'
      });
      await adminUser.save();
      console.log('Admin user created successfully!');
    } else {
      console.log('Admin user already exists.');
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();