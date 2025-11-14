import User from '../models/User.js';
import Product from '../models/Product.js';

/**
 * Get user profile
 * GET /api/users/:id
 */
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('cart')
      .populate('purchased');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

/**
 * Update user profile
 * PUT /api/users/:id
 */
export const updateUserProfile = async (req, res) => {
  try {
    // Check if user is updating their own profile
    if (req.params.id !== req.userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to update this profile' 
      });
    }

    const { username, profilePic } = req.body;
    const updateData = {};

    if (username) updateData.username = username;
    if (profilePic) updateData.profilePic = profilePic;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

/**
 * Add product to cart
 * POST /api/users/:id/cart
 */
export const addToCart = async (req, res) => {
  try {
    // Check if user is adding to their own cart
    if (req.params.id !== req.userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    const { productId } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    // Check if product is already sold
    if (product.sold) {
      return res.status(400).json({ 
        success: false, 
        message: 'Product is already sold' 
      });
    }

    // Check if user is trying to add their own product
    if (product.owner.toString() === req.userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot add your own product to cart' 
      });
    }

    const user = await User.findById(req.params.id);

    // Check if product is already in cart
    if (user.cart.includes(productId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Product already in cart' 
      });
    }

    user.cart.push(productId);
    await user.save();

    const updatedUser = await User.findById(req.params.id)
      .select('-password')
      .populate('cart');

    res.json({
      success: true,
      message: 'Product added to cart',
      cart: updatedUser.cart
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

/**
 * Remove product from cart
 * DELETE /api/users/:id/cart/:productId
 */
export const removeFromCart = async (req, res) => {
  try {
    // Check if user is removing from their own cart
    if (req.params.id !== req.userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    const user = await User.findById(req.params.id);
    
    user.cart = user.cart.filter(
      item => item.toString() !== req.params.productId
    );
    
    await user.save();

    const updatedUser = await User.findById(req.params.id)
      .select('-password')
      .populate('cart');

    res.json({
      success: true,
      message: 'Product removed from cart',
      cart: updatedUser.cart
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

/**
 * Purchase items (checkout)
 * POST /api/users/:id/purchase
 */
export const purchaseItems = async (req, res) => {
  try {
    // Check if user is purchasing for themselves
    if (req.params.id !== req.userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    const user = await User.findById(req.params.id).populate('cart');

    if (user.cart.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cart is empty' 
      });
    }

    // Move cart items to purchased
    user.purchased.push(...user.cart);
    
    // Mark products as sold
    await Product.updateMany(
      { _id: { $in: user.cart } },
      { sold: true }
    );

    // Clear cart
    user.cart = [];
    await user.save();

    const updatedUser = await User.findById(req.params.id)
      .select('-password')
      .populate('purchased');

    res.json({
      success: true,
      message: 'Purchase successful',
      purchased: updatedUser.purchased
    });
  } catch (error) {
    console.error('Purchase error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

/**
 * Get user's cart
 * GET /api/users/:id/cart
 */
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('cart')
      .populate('cart');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      cart: user.cart
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

/**
 * Get user's purchases
 * GET /api/users/:id/purchases
 */
export const getPurchases = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('purchased')
      .populate('purchased');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      purchases: user.purchased
    });
  } catch (error) {
    console.error('Get purchases error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};
