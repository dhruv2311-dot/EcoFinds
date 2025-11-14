import { useState } from 'react';
import { User, Mail, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    profilePic: user?.profilePic || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.put(`/users/${user.id}`, formData);
      updateUser(response.data.user);
      toast.success('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || '',
      profilePic: user?.profilePic || '',
    });
    setEditing(false);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <User className="text-black" size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <p className="text-gray-400 mt-2">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={formData.profilePic}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-dark-border"
                />
                {editing && (
                  <div className="absolute bottom-0 right-0 bg-primary rounded-full p-2">
                    <Camera className="text-black" size={20} />
                  </div>
                )}
              </div>
              {editing && (
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Profile Picture URL
                  </label>
                  <input
                    type="url"
                    name="profilePic"
                    value={formData.profilePic}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={!editing}
                  required
                  minLength={3}
                  className="input-field pl-12 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="input-field pl-12 opacity-50 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed
              </p>
            </div>

            {/* Account Stats */}
            <div className="border-t border-dark-border pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Account Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark-bg rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Member Since</p>
                  <p className="text-white font-medium">
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-dark-bg rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">User ID</p>
                  <p className="text-white font-medium text-xs">
                    {user?.id?.slice(0, 8)}...
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              {editing ? (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="w-full btn-primary"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
