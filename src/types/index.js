/**
 * @typedef {Object} Ingredient
 * @property {string} _id
 * @property {string} name
 * @property {string} category
 * @property {number} price
 * @property {string} [image]
 * @property {string} [description]
 * @property {boolean} available
 */

/**
 * @typedef {Object} PlantBasedBurger
 * @property {string} _id
 * @property {string} name
 * @property {string} description
 * @property {number} basePrice
 * @property {string} image
 * @property {('classic'|'signature'|'premium')} category
 * @property {string[]} ingredients
 * @property {boolean} [popular]
 * @property {boolean} available
 */

/**
 * @typedef {Object} CustomPlantBasedBurger
 * @property {string} name
 * @property {string[]} ingredients
 * @property {number} totalPrice
 */

/**
 * @typedef {Object} CartItem
 * @property {('menu'|'custom')} type
 * @property {PlantBasedBurger|CustomPlantBasedBurger} burger
 * @property {number} quantity
 */

/**
 * @typedef {Object} Order
 * @property {string} _id
 * @property {CartItem[]} items
 * @property {number} totalAmount
 * @property {('pending'|'preparing'|'ready'|'delivered')} status
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} User
 * @property {string} _id
 * @property {string} email
 * @property {string} name
 * @property {('user'|'admin')} role
 * @property {Order[]} orders
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

export {}; 