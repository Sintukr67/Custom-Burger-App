import express from 'express';
import Ingredient from '../models/Ingredient.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all ingredients
router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find({ available: true });
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create ingredient (admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const ingredient = new Ingredient(req.body);
    await ingredient.save();
    res.status(201).json(ingredient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update ingredient (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const ingredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;