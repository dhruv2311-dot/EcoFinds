import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, CreditCard } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get(`/users/${user.id}/cart`);
      setCartItems(response.data.cart);
    } catch (error) {
      toast.error('Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await axiosInstance.delete(`/users/${user.id}/cart/${productId}`);
      setCartItems(cartItems.filter((item) => item._id !== productId));
      toast.success('Removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    setCheckoutLoading(true);
    try {
      await axiosInstance.post(`/users/${user.id}/purchase`);
      toast.success('Purchase successful!');
      setCartItems([]);
      navigate('/purchases');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Checkout failed');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <ShoppingCart className="text-black" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
            <p className="text-gray-400">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="card text-center py-20">
            <ShoppingCart className="mx-auto text-gray-600 mb-4" size={64} />
            <h2 className="text-2xl font-semibold text-white mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-400 mb-6">
              Browse products and add them to your cart
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="card">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                      onClick={() => navigate(`/product/${item._id}`)}
                    />
                    <div className="flex-1">
                      <h3
                        className="text-lg font-semibold text-white hover:text-primary cursor-pointer"
                        onClick={() => navigate(`/product/${item._id}`)}
                      >
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-1">
                        {item.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs bg-dark-border px-2 py-1 rounded text-gray-300">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="text-xl font-bold text-primary">
                        ₹{item.price.toLocaleString()}
                      </p>
                      <button
                        onClick={() => handleRemoveFromCart(item._id)}
                        className="text-red-400 hover:text-red-300 flex items-center space-x-1"
                      >
                        <Trash2 size={16} />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h2 className="text-xl font-semibold text-white mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="text-primary">Free</span>
                  </div>
                  <div className="border-t border-dark-border pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-primary">
                        ₹{totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {checkoutLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      <span>Proceed to Checkout</span>
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-500 text-center mt-4">
                  By checking out, items will be moved to your purchase history
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
