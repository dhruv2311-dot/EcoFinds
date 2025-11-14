import express from 'express';
import { 
  getUserProfile, 
  updateUserProfile, 
  addToCart, 
  removeFromCart, 
  purchaseItems,
  getCart,
  getPurchases
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   GET /api/users/:id
 * @desc    Get user profile
 * @access  Private
 */
router.get('/:id', authMiddleware, getUserProfile);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user profile
 * @access  Private
 */
router.put('/:id', authMiddleware, updateUserProfile);

/**
 * @route   GET /api/users/:id/cart
 * @desc    Get user's cart
 * @access  Private
 */
router.get('/:id/cart', authMiddleware, getCart);

/**
 * @route   POST /api/users/:id/cart
 * @desc    Add product to cart
 * @access  Private
 */
router.post('/:id/cart', authMiddleware, addToCart);

/**
 * @route   DELETE /api/users/:id/cart/:productId
 * @desc    Remove product from cart
 * @access  Private
 */
router.delete('/:id/cart/:productId', authMiddleware, removeFromCart);

/**
 * @route   POST /api/users/:id/purchase
 * @desc    Purchase items (checkout)
 * @access  Private
 */
router.post('/:id/purchase', authMiddleware, purchaseItems);

/**
 * @route   GET /api/users/:id/purchases
 * @desc    Get user's purchases
 * @access  Private
 */
router.get('/:id/purchases', authMiddleware, getPurchases);

export default router;
