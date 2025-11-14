import express from 'express';
import { body } from 'express-validator';
import { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getProductsByOwner
} from '../controllers/productController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products (with optional search and category filters)
 * @access  Public
 */
router.get('/', getAllProducts);

/**
 * @route   GET /api/products/user/:userId
 * @desc    Get products by owner
 * @access  Private
 */
router.get('/user/:userId', authMiddleware, getProductsByOwner);

/**
 * @route   GET /api/products/:id
 * @desc    Get single product
 * @access  Public
 */
router.get('/:id', getProductById);

/**
 * @route   POST /api/products
 * @desc    Create new product
 * @access  Private
 */
router.post(
  '/',
  authMiddleware,
  [
    body('title')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Title must be at least 3 characters'),
    body('description')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Description must be at least 10 characters'),
    body('category')
      .notEmpty()
      .withMessage('Category is required'),
    body('price')
      .isNumeric()
      .withMessage('Price must be a number')
      .isFloat({ min: 0 })
      .withMessage('Price cannot be negative')
  ],
  createProduct
);

/**
 * @route   PUT /api/products/:id
 * @desc    Update product
 * @access  Private (owner only)
 */
router.put('/:id', authMiddleware, updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product
 * @access  Private (owner only)
 */
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
