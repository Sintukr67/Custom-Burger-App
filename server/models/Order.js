import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['menu', 'custom'],
    required: true
  },
  burger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Burger'
  },
  customBurger: {
    name: String,
    ingredients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient'
    }],
    totalPrice: Number
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'online'],
    default: 'cash'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);