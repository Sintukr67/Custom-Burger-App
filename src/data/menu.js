/** @type {import('../types').PlantBasedBurger[]} */
export const menuItems = [
  // Classic Category
  {
    _id: 'classic-burger',
    name: 'The Classic',
    description: 'Our signature Beyond Meat patty with American cheese, lettuce, tomato, pickles, and house sauce on a toasted bun.',
    basePrice: 12.99,
    ingredients: ['beyond-patty', 'american-cheese', 'lettuce', 'tomato', 'pickles', 'mayo'],
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    category: 'classic',
    popular: true,
    available: true,
  },

  // Signature Category
  {
    _id: 'mushroom-swiss',
    name: 'Mushroom Swiss',
    description: 'Juicy Beyond Meat patty with sautéed mushrooms, Swiss cheese, and garlic aioli on a brioche bun.',
    basePrice: 15.49,
    ingredients: ['beyond-patty', 'swiss-cheese', 'mushrooms', 'mayo'],
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
    category: 'signature',
    available: true,
  },
  {
    _id: 'spicy-chicken',
    name: 'Fiery Chicken',
    description: 'Grilled chicken breast with pepper jack cheese, avocado, lettuce, and chipotle mayo.',
    basePrice: 14.99,
    ingredients: ['chicken-breast', 'pepper-jack', 'avocado', 'lettuce', 'chipotle-mayo'],
    image: 'https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg',
    category: 'signature',
    available: true,
  },

  // Premium Category
  {
    _id: 'veggie-supreme',
    name: 'Veggie Supreme',
    description: 'Black Bean patty with avocado, roasted red peppers, lettuce, tomato, and herb aioli.',
    basePrice: 16.49,
    ingredients: ['black-bean-patty', 'avocado', 'roasted-peppers', 'lettuce', 'tomato', 'mayo'],
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    category: 'premium',
    available: true,
  }
]; 