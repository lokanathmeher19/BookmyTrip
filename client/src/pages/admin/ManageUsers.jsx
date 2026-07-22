import React from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Trash2, Shield, ShieldOff, AlertCircle, Users } from 'lucide-react';
import useAdminData from '../../hooks/useAdminData';

const ManageUsers = () => {
  const { user } = useAuth();
  const { data: users, loading, error, refetch } = useAdminData('/api/admin/users', 5000);

  const toggleAdminStatus = async (id, currentStatus) => {
    try {
      await axios.put(`/api/admin/users/${id}/role`, 
        { isAdmin: !currentStatus },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      refetch(); // Instantly refetch
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        refetch(); // Instantly refetch
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (loading && !users) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9281C]"></div></div>;
  }

  if (error) {
    return <div className="text-red-500 bg-red-50 p-4 rounded-xl flex items-center"><AlertCircle className="mr-2" /> Error loading users: {error}</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in text-gray-100">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-white tracking-tight">Manage Users</h2>
        <span className="bg-[#D9281C]/20 text-[#D9281C] px-4 py-1.5 rounded-full text-sm font-bold border border-[#D9281C]/30">
          Total: {users?.length || 0}
        </span>
      </div>
      
      <div className="bg-gray-800/60 border border-gray-700 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D9281C] to-red-600"></div>
        <div className="overflow-x-auto mt-1">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/50 divide-y divide-gray-700">
              {users && users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-white flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 font-bold mr-3">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    {u.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-400">{u.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-full border ${u.isAdmin ? 'bg-purple-900/30 text-purple-400 border-purple-800' : 'bg-blue-900/30 text-blue-400 border-blue-800'}`}>
                      {u.isAdmin ? 'Admin' : 'User'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-400">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {u._id !== user._id && (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => toggleAdminStatus(u._id, u.isAdmin)}
                          className={`p-2 rounded-lg transition-colors flex items-center ${u.isAdmin ? 'text-orange-400 hover:bg-orange-900/30' : 'text-emerald-400 hover:bg-emerald-900/30'}`}
                          title={u.isAdmin ? 'Remove Admin' : 'Make Admin'}
                        >
                          {u.isAdmin ? <ShieldOff className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                        </button>
                        <button
                          onClick={() => deleteUser(u._id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/30 p-2 rounded-lg transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {(!users || users.length === 0) && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Users className="w-12 h-12 text-gray-600 mb-3" />
                      <p className="font-medium text-gray-500">No users found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
