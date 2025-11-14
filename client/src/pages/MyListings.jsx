import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, PlusCircle } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

const MyListings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    try {
      const response = await axiosInstance.get(`/products/user/${user.id}`);
      setProducts(response.data.products);
    } catch (error) {
      toast.error('Failed to fetch your listings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (productId) => {
    setProducts(products.filter((p) => p._id !== productId));
  };

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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Package className="text-black" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">My Listings</h1>
              <p className="text-gray-400">
                {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/add-product')}
            className="btn-primary flex items-center space-x-2"
          >
            <PlusCircle size={20} />
            <span>Add Product</span>
          </button>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="card text-center py-20">
            <Package className="mx-auto text-gray-600 mb-4" size={64} />
            <h2 className="text-2xl font-semibold text-white mb-2">
              No listings yet
            </h2>
            <p className="text-gray-400 mb-6">
              Start selling by adding your first product
            </p>
            <button
              onClick={() => navigate('/add-product')}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <PlusCircle size={20} />
              <span>Add Your First Product</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                showActions={true}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;
