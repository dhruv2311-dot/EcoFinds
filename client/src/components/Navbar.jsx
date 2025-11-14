import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Package, ShoppingCart, User, LogOut, PlusCircle, History } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-dark-card border-b border-dark-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">E</span>
            </div>
            <span className="text-xl font-bold text-white">EcoFinds</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/') ? 'bg-primary text-black' : 'text-gray-300 hover:bg-dark-border'
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            
            <Link
              to="/my-listings"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/my-listings') ? 'bg-primary text-black' : 'text-gray-300 hover:bg-dark-border'
              }`}
            >
              <Package size={20} />
              <span>My Listings</span>
            </Link>

            <Link
              to="/add-product"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/add-product') ? 'bg-primary text-black' : 'text-gray-300 hover:bg-dark-border'
              }`}
            >
              <PlusCircle size={20} />
              <span>Add Product</span>
            </Link>

            <Link
              to="/cart"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/cart') ? 'bg-primary text-black' : 'text-gray-300 hover:bg-dark-border'
              }`}
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
            </Link>

            <Link
              to="/purchases"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/purchases') ? 'bg-primary text-black' : 'text-gray-300 hover:bg-dark-border'
              }`}
            >
              <History size={20} />
              <span>Purchases</span>
            </Link>

            <Link
              to="/profile"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/profile') ? 'bg-primary text-black' : 'text-gray-300 hover:bg-dark-border'
              }`}
            >
              <User size={20} />
              <span>Profile</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-red-400 hover:bg-dark-border transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                isActive('/') ? 'bg-primary text-black' : 'text-gray-300'
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            
            <Link
              to="/my-listings"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                isActive('/my-listings') ? 'bg-primary text-black' : 'text-gray-300'
              }`}
            >
              <Package size={20} />
              <span>My Listings</span>
            </Link>

            <Link
              to="/add-product"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                isActive('/add-product') ? 'bg-primary text-black' : 'text-gray-300'
              }`}
            >
              <PlusCircle size={20} />
              <span>Add Product</span>
            </Link>

            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                isActive('/cart') ? 'bg-primary text-black' : 'text-gray-300'
              }`}
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
            </Link>

            <Link
              to="/purchases"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                isActive('/purchases') ? 'bg-primary text-black' : 'text-gray-300'
              }`}
            >
              <History size={20} />
              <span>Purchases</span>
            </Link>

            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                isActive('/profile') ? 'bg-primary text-black' : 'text-gray-300'
              }`}
            >
              <User size={20} />
              <span>Profile</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-red-400 w-full"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
