import express from 'express';
import Burger from '../models/Burger.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all burgers
router.get('/', async (req, res) => {
  try {
    const burgers = await Burger.find({ available: true }).populate('ingredients');
    res.json(burgers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get burger by ID
router.get('/:id', async (req, res) => {
  try {
    const burger = await Burger.findById(req.params.id).populate('ingredients');
    if (!burger) {
      return res.status(404).json({ message: 'Burger not found' });
    }
    res.json(burger);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create burger (admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const burger = new Burger(req.body);
    await burger.save();
    await burger.populate('ingredients');
    res.status(201).json(burger);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;