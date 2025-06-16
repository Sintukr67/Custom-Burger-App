import mongoose from 'mongoose';

const burgerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  basePrice: {
    type: Number,
    required: true,
    min: 0
  },
  ingredients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient'
  }],
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['signature', 'classic', 'premium']
  },
  popular: {
    type: Boolean,
    default: false
  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Burger', burgerSchema);