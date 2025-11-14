import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Package } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Purchases = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await axiosInstance.get(`/users/${user.id}/purchases`);
      setPurchases(response.data.purchases);
    } catch (error) {
      toast.error('Failed to fetch purchases');
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = purchases.reduce((sum, item) => sum + item.price, 0);

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
            <History className="text-black" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Purchase History</h1>
            <p className="text-gray-400">
              {purchases.length} {purchases.length === 1 ? 'purchase' : 'purchases'}
            </p>
          </div>
        </div>

        {/* Stats Card */}
        {purchases.length > 0 && (
          <div className="card mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Purchases</p>
                <p className="text-2xl font-bold text-white">{purchases.length}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Spent</p>
                <p className="text-2xl font-bold text-primary">
                  ₹{totalSpent.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Average Price</p>
                <p className="text-2xl font-bold text-white">
                  ₹{Math.round(totalSpent / purchases.length).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Purchases List */}
        {purchases.length === 0 ? (
          <div className="card text-center py-20">
            <Package className="mx-auto text-gray-600 mb-4" size={64} />
            <h2 className="text-2xl font-semibold text-white mb-2">
              No purchases yet
            </h2>
            <p className="text-gray-400 mb-6">
              Start shopping to see your purchase history
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {purchases.map((item) => (
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
                      <span className="text-xs text-gray-500">
                        Purchased on {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">
                      ₹{item.price.toLocaleString()}
                    </p>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded mt-2 inline-block">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchases;
