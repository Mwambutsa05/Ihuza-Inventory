import React from 'react';
import { Users, Package, CheckCircle, AlertCircle, Edit, Trash2, Eye, FolderOpen, Activity } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useUsers } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { products } = useProducts();
  const { users } = useUsers();
  const { isAdmin } = useAuth();

  // Calculate stats
  const totalUsers = users.length;
  const totalProducts = products.length;
  const assignedProducts = products.filter(p => p.status === 'In Stock').length;
  const unassignedProducts = products.filter(p => p.status === 'Out of Stock').length;

  // Get recently added products (last 4)
  const recentProducts = [...products].slice(0, 4);

  // Sample recent activity data
  const recentActivity = [
    { id: 1, action: 'Product added to inventory', product: 'Macbook Pro 16" SKU: MB-PRO-2024-001', time: 'Dec 15, 2023', icon: Package, color: 'blue' },
    { id: 2, action: 'Product assigned to Sarah Johnson', product: 'iPad Pro 11" SKU: IPD-PRO-11-001', time: 'Oct 5, 2023', icon: CheckCircle, color: 'green' },
    { id: 3, action: 'Product assigned to Michael Brown', product: 'Apple MacBook Air M2 SKU: MBA-M2-2024-001', time: 'Oct 1, 2023', icon: CheckCircle, color: 'green' },
    { id: 4, action: 'Product sent for maintenance', product: 'Dell Inspiron 15 - System replacement request', time: 'Sep 20, 2023', icon: AlertCircle, color: 'yellow' },
    { id: 5, action: 'Product delivered', product: 'Samsung Galaxy Tab S9 - Staff Member', time: 'Jul 12, 2023', icon: CheckCircle, color: 'green' },
  ];

  // Sample quick actions
  const quickActions = [
    { id: 1, title: 'View Users', description: 'View all registered users', icon: Users, color: 'blue', link: '/users' },
    { id: 2, title: 'View Products', description: 'View all registered products', icon: Package, color: 'blue', link: '/products' },
    { id: 3, title: 'View Assignments', description: 'View all product assignments', icon: FolderOpen, color: 'purple', link: '/assignments' },
  ];

  const stats = [
    { id: 1, name: 'Total Users', value: totalUsers, icon: Users, color: 'blue', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { id: 2, name: 'Total Products', value: totalProducts, icon: Package, color: 'blue', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { id: 3, name: 'Assigned Products', value: assignedProducts, icon: CheckCircle, color: 'green', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    { id: 4, name: 'Unassigned Products', value: unassignedProducts, icon: AlertCircle, color: 'yellow', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Out of Stock':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'Low Stock':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">iHUZA INVENTORY - System Overview</h1>
            <p className="text-blue-100">Monitor your iHUZA inventory and product assignments in real time.</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <CheckCircle className="w-4 h-4" />
          <span>All systems operational</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
          </div>
        ))}
      </div>

      {/* Recently Added Products */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recently Added Products</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {recentProducts.map((product) => (
            <div key={product.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white">{product.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{product.category}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{product.addedDate}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users Table (Admin Only) */}
        {isAdmin && (
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Users</h2>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">USER</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ROLE</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">STATUS</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">LAST LOGIN</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {users.slice(0, 5).map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                              {user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name || user.email.split('@')[0]}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' 
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{user.lastLogin}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className={`${isAdmin ? '' : 'lg:col-span-2'} bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              View all
            </button>
          </div>
          <div className="p-6 space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-8 h-8 bg-${activity.color}-50 dark:bg-${activity.color}-900/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <activity.icon className={`w-4 h-4 text-${activity.color}-600 dark:text-${activity.color}-400`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{activity.product}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`${isAdmin ? 'lg:col-span-1' : 'lg:col-span-1'} bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-3">
            {quickActions.map((action) => {
              // Hide Users action for non-admin
              if (action.title === 'View Users' && !isAdmin) return null;

              return (
                <button
                  key={action.id}
                  className="w-full flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-left"
                >
                  <div className={`w-10 h-10 bg-${action.color}-50 dark:bg-${action.color}-900/20 rounded-lg flex items-center justify-center`}>
                    <action.icon className={`w-5 h-5 text-${action.color}-600 dark:text-${action.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{action.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
