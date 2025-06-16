import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['protein', 'cheese', 'vegetable', 'sauce', 'extra']
  },
  available: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Ingredient', ingredientSchema);