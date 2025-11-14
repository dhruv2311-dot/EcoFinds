import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

const ProductCard = ({ product, onDelete, showActions = false }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      await axiosInstance.post(`/users/${user.id}/cart`, {
        productId: product._id,
      });
      toast.success('Added to cart!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit-product/${product._id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axiosInstance.delete(`/products/${product._id}`);
        toast.success('Product deleted successfully');
        if (onDelete) onDelete(product._id);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  const isOwner = user && product.owner?._id === user.id;

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="card hover:border-primary transition-all duration-300 cursor-pointer group"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.sold && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-white font-bold text-xl">SOLD</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-white line-clamp-1 flex-1">
            {product.title}
          </h3>
          <span className="text-primary font-bold text-lg ml-2">
            ₹{product.price.toLocaleString()}
          </span>
        </div>

        <p className="text-gray-400 text-sm line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs bg-dark-border px-3 py-1 rounded-full text-gray-300">
            {product.category}
          </span>

          {showActions && isOwner ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleEdit}
                className="p-2 hover:bg-dark-border rounded-lg transition-colors"
                title="Edit"
              >
                <Edit size={18} className="text-blue-400" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 hover:bg-dark-border rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 size={18} className="text-red-400" />
              </button>
            </div>
          ) : (
            !isOwner && !product.sold && (
              <button
                onClick={handleAddToCart}
                className="p-2 hover:bg-primary hover:text-black rounded-lg transition-colors"
                title="Add to cart"
              >
                <ShoppingCart size={18} />
              </button>
            )
          )}
        </div>

        {product.owner && (
          <div className="flex items-center space-x-2 pt-2 border-t border-dark-border">
            <img
              src={product.owner.profilePic}
              alt={product.owner.username}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs text-gray-400">
              {product.owner.username}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
