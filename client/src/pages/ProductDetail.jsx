import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, User, Calendar, Tag } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      toast.error('Failed to fetch product details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await axiosInstance.post(`/users/${user.id}/cart`, {
        productId: product._id,
      });
      toast.success('Added to cart!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const isOwner = user && product.owner?._id === user.id;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full rounded-lg object-cover aspect-square"
            />
            {product.sold && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
                <span className="text-white font-bold text-3xl">SOLD OUT</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                {product.sold && (
                  <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                    Sold
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {product.title}
              </h1>
              <p className="text-4xl font-bold text-primary">
                ₹{product.price.toLocaleString()}
              </p>
            </div>

            <div className="border-t border-dark-border pt-6">
              <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            </div>

            {/* Seller Info */}
            {product.owner && (
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <User size={20} />
                  <span>Seller Information</span>
                </h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={product.owner.profilePic}
                    alt={product.owner.username}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <p className="text-white font-medium">{product.owner.username}</p>
                    <p className="text-gray-400 text-sm">{product.owner.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Product Meta */}
            <div className="card space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Calendar size={20} />
                <span>
                  Listed on {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Tag size={20} />
                <span>Category: {product.category}</span>
              </div>
            </div>

            {/* Action Button */}
            {!isOwner && !product.sold && (
              <button
                onClick={handleAddToCart}
                className="w-full btn-primary flex items-center justify-center space-x-2 py-4 text-lg"
              >
                <ShoppingCart size={24} />
                <span>Add to Cart</span>
              </button>
            )}

            {isOwner && (
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <p className="text-primary text-center">This is your listing</p>
              </div>
            )}

            {product.sold && !isOwner && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-400 text-center">This item has been sold</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
