"use client";
import React, { useState } from 'react';
import { 
  Users, 
  Eye, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  UserPlus,
  FileText,
  Folder,
  X,
  ChevronRight,
  Calendar
} from 'lucide-react';

const AdminDashboard = ({ isDarkMode = false }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const users = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Operations Manager',
      avatar: 'SJ',
      status: 'active',
      joinDate: '2025-01-15',
      completedSOPs: 3,
      totalSOPs: 8,
      lastActivity: '2 hours ago',
      progress: 37.5
    },
    {
      id: 2,
      name: 'Mike Davis',
      email: 'mike.davis@company.com',
      role: 'IT Specialist',
      avatar: 'MD',
      status: 'active',
      joinDate: '2025-01-10',
      completedSOPs: 7,
      totalSOPs: 10,
      lastActivity: '1 day ago',
      progress: 70
    },
    {
      id: 3,
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'Finance Analyst',
      avatar: 'JS',
      status: 'inactive',
      joinDate: '2024-12-20',
      completedSOPs: 2,
      totalSOPs: 12,
      lastActivity: '1 week ago',
      progress: 16.7
    },
    {
      id: 4,
      name: 'Emily Chen',
      email: 'emily.chen@company.com',
      role: 'HR Manager',
      avatar: 'EC',
      status: 'active',
      joinDate: '2025-01-05',
      completedSOPs: 5,
      totalSOPs: 6,
      lastActivity: '30 minutes ago',
      progress: 83.3
    }
  ];

  const sopFolders = [
    { id: 1, name: 'Onboarding', sopCount: 4, icon: '📋' },
    { id: 2, name: 'Finance', sopCount: 8, icon: '💰' },
    { id: 3, name: 'Construction', sopCount: 12, icon: '🏗️' },
    { id: 4, name: 'Operations', sopCount: 6, icon: '⚙️' },
    { id: 5, name: 'IT Setup', sopCount: 5, icon: '💻' }
  ];

  const individualSOPs = [
    { id: 1, name: 'Employee Welcome Process', folder: 'Onboarding' },
    { id: 2, name: 'IT Setup Checklist', folder: 'Onboarding' },
    { id: 3, name: 'Department Introduction', folder: 'Onboarding' },
    { id: 4, name: 'Safety Protocol Review', folder: 'Operations' },
    { id: 5, name: 'Budget Approval Process', folder: 'Finance' }
  ];

  const userSOPs = [
    { id: 1, name: 'Employee Welcome Process', status: 'completed', completedAt: '2025-09-13', dueDate: '2025-09-15' },
    { id: 2, name: 'IT Setup Checklist', status: 'in_progress', progress: 60, dueDate: '2025-09-20' },
    { id: 3, name: 'Department Introduction', status: 'completed', completedAt: '2025-09-10', dueDate: '2025-09-12' },
    { id: 4, name: 'Safety Protocol Review', status: 'pending', dueDate: '2025-09-25' },
    { id: 5, name: 'Budget Approval Process', status: 'overdue', dueDate: '2025-09-08' },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in_progress': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-gray-600 bg-gray-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleQuickOnboard = (user) => {
    // Quick onboard action
    console.log('Quick onboarding for:', user.name);
    // This would assign all onboarding SOPs to the user
  };

  const handleAssignFolder = (folderId) => {
    console.log('Assigning folder:', folderId, 'to user:', selectedUser?.name);
    setShowAssignModal(false);
  };

  const handleAssignSOP = (sopId) => {
    console.log('Assigning SOP:', sopId, 'to user:', selectedUser?.name);
    setShowAssignModal(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`border-b transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-semibold transition-colors duration-200 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Admin Dashboard</h1>
              <p className={`mt-1 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Manage users and SOP assignments</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>Add User</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-lg shadow-sm border transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className={`text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Total Users</p>
                <p className={`text-2xl font-semibold transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{users.length}</p>
              </div>
            </div>
          </div>
          
          <div className={`p-6 rounded-lg shadow-sm border transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center">
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className={`text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Active Users</p>
                <p className={`text-2xl font-semibold transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className={`p-6 rounded-lg shadow-sm border transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center">
              <div className="p-3 bg-purple-50 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className={`text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Total SOPs</p>
                <p className={`text-2xl font-semibold transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {sopFolders.reduce((acc, folder) => acc + folder.sopCount, 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className={`p-6 rounded-lg shadow-sm border transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className={`text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Avg Progress</p>
                <p className={`text-2xl font-semibold transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {Math.round(users.reduce((acc, user) => acc + user.progress, 0) / users.length)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className={`p-4 rounded-lg shadow-sm border mb-6 transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    isDarkMode 
                      ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                      : 'border-gray-300 bg-white text-gray-900'
                  }`}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              >
                <option value="all">All Users</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className={`rounded-lg shadow-sm border transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className={`px-6 py-4 border-b transition-colors duration-200 ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h2 className={`text-lg font-semibold transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`transition-colors duration-200 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>User</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>Progress</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>Status</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>Last Activity</th>
                  <th className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y transition-colors duration-200 ${
                isDarkMode ? 'divide-gray-700' : 'divide-gray-200'
              }`}>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className={`transition-colors duration-200 ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {user.avatar}
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-medium transition-colors duration-200 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>{user.name}</div>
                          <div className={`text-sm transition-colors duration-200 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>{user.email}</div>
                          <div className={`text-xs transition-colors duration-200 ${
                            isDarkMode ? 'text-gray-500' : 'text-gray-400'
                          }`}>{user.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-16 rounded-full h-2 mr-3 transition-colors duration-200 ${
                          isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                        }`}>
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${user.progress}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm transition-colors duration-200 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>{user.completedSOPs}/{user.totalSOPs}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.status === 'active' ? 'text-green-800 bg-green-100' : 'text-gray-800 bg-gray-100'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {user.lastActivity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowProgressModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                          title="View Progress"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowAssignModal(true);
                          }}
                          className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded"
                          title="Assign SOPs"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleQuickOnboard(user)}
                          className="text-purple-600 hover:text-purple-900 p-1 hover:bg-purple-50 rounded"
                          title="Quick Onboard"
                        >
                          <UserPlus className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Progress Modal */}
      {showProgressModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedUser.name} - SOP Progress
                </h3>
                <p className="text-sm text-gray-500">{selectedUser.email}</p>
              </div>
              <button
                onClick={() => setShowProgressModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className="text-sm text-gray-900">{selectedUser.progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${selectedUser.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                {userSOPs.map((sop) => (
                  <div key={sop.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{sop.name}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sop.status)}`}>
                        {getStatusIcon(sop.status)}
                        <span className="ml-1 capitalize">{sop.status.replace('_', ' ')}</span>
                      </span>
                    </div>
                    
                    {sop.status === 'in_progress' && (
                      <div className="mb-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${sop.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{sop.progress}% complete</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Due: {sop.dueDate}
                      </span>
                      {sop.completedAt && (
                        <span>Completed: {sop.completedAt}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {showAssignModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Assign SOPs to {selectedUser.name}
                </h3>
                <p className="text-sm text-gray-500">Select folders or individual SOPs to assign</p>
              </div>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Quick Actions */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
                <button
                  onClick={() => handleQuickOnboard(selectedUser)}
                  className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-3 text-left flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-blue-900">Complete Onboarding</div>
                    <div className="text-sm text-blue-600">Assign all onboarding SOPs</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-blue-600" />
                </button>
              </div>

              {/* SOP Folders */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">SOP Folders</h4>
                <div className="space-y-2">
                  {sopFolders.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => handleAssignFolder(folder.id)}
                      className="w-full hover:bg-gray-50 border border-gray-200 rounded-lg p-3 text-left flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-3">{folder.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{folder.name}</div>
                          <div className="text-sm text-gray-500">{folder.sopCount} SOPs</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Individual SOPs */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Individual SOPs</h4>
                <div className="space-y-2">
                  {individualSOPs.map((sop) => (
                    <button
                      key={sop.id}
                      onClick={() => handleAssignSOP(sop.id)}
                      className="w-full hover:bg-gray-50 border border-gray-200 rounded-lg p-3 text-left flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-gray-400 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">{sop.name}</div>
                          <div className="text-sm text-gray-500">{sop.folder}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;