"use client";
import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Calendar, Users, FileText, AlertTriangle, CheckCircle, 
  Clock, Settings, Edit, Trash2, Eye, Download, Upload, FolderPlus, UserPlus,
  TrendingUp, Activity, Bell, Target, Shield
} from 'lucide-react';

const AdminDashboard = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState('sop'); // 'sop', 'folder', 'assignment'

  // Mock data for demonstration
  const overviewStats = {
    totalSOPs: 247,
    activeSOPs: 189,
    draftSOPs: 34,
    archivedSOPs: 24,
    upcomingReviews: 12,
    overdueSOPs: 5,
    complianceRate: 94.2
  };

  const statusData = [
    { name: 'Approved', value: 189, color: '#10B981' },
    { name: 'Draft', value: 34, color: '#F59E0B' },
    { name: 'Under Review', value: 19, color: '#3B82F6' },
    { name: 'Archived', value: 24, color: '#6B7280' }
  ];

  const complianceData = [
    { month: 'Jan', onTime: 95, overdue: 5 },
    { month: 'Feb', onTime: 92, overdue: 8 },
    { month: 'Mar', onTime: 97, overdue: 3 },
    { month: 'Apr', onTime: 89, overdue: 11 },
    { month: 'May', onTime: 94, overdue: 6 },
    { month: 'Jun', onTime: 96, overdue: 4 }
  ];

  const departmentData = [
    { name: 'Operations', total: 45, completed: 42, rate: 93 },
    { name: 'Safety', total: 38, completed: 36, rate: 95 },
    { name: 'Quality', total: 29, completed: 27, rate: 93 },
    { name: 'HR', total: 22, completed: 20, rate: 91 },
    { name: 'Finance', total: 18, completed: 17, rate: 94 }
  ];

  const recentSOPs = [
    { id: 'SOP-001', title: 'Equipment Maintenance Protocol', status: 'Approved', owner: 'John Smith', lastUpdate: '2024-09-15', nextReview: '2024-12-15', priority: 'High' },
    { id: 'SOP-002', title: 'Customer Service Guidelines', status: 'Under Review', owner: 'Sarah Johnson', lastUpdate: '2024-09-14', nextReview: '2024-11-20', priority: 'Medium' },
    { id: 'SOP-003', title: 'Data Backup Procedures', status: 'Draft', owner: 'Mike Chen', lastUpdate: '2024-09-13', nextReview: '2024-10-30', priority: 'High' },
    { id: 'SOP-004', title: 'Employee Onboarding', status: 'Approved', owner: 'Lisa Brown', lastUpdate: '2024-09-12', nextReview: '2025-01-15', priority: 'Medium' },
    { id: 'SOP-005', title: 'Safety Incident Reporting', status: 'Overdue', owner: 'David Wilson', lastUpdate: '2024-08-20', nextReview: '2024-09-01', priority: 'Critical' }
  ];

  const upcomingTasks = [
    { id: 1, task: 'Review SOP-023 by September 30', type: 'review', priority: 'high', dueDate: '2024-09-30' },
    { id: 2, task: 'Approve new Quality Control SOP', type: 'approval', priority: 'medium', dueDate: '2024-09-28' },
    { id: 3, task: 'Update Employee Handbook references', type: 'update', priority: 'low', dueDate: '2024-10-05' },
    { id: 4, task: 'Training acknowledgment follow-up', type: 'training', priority: 'high', dueDate: '2024-09-25' }
  ];

  const CreateModal = () => {
    if (!showCreateModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`rounded-2xl p-6 w-full max-w-md ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}>
          <h3 className="text-xl font-bold mb-4">
            Create New {createType === 'sop' ? 'SOP' : createType === 'folder' ? 'Folder' : 'Assignment'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
                placeholder={`Enter ${createType} title`}
              />
            </div>
            
            {createType === 'sop' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <select className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode 
                      ? 'border-gray-600 bg-gray-700 text-white' 
                      : 'border-gray-300 bg-white text-gray-900'
                  }`}>
                    <option>Operations</option>
                    <option>Safety</option>
                    <option>Quality</option>
                    <option>HR</option>
                    <option>Finance</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode 
                      ? 'border-gray-600 bg-gray-700 text-white' 
                      : 'border-gray-300 bg-white text-gray-900'
                  }`}>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                    <option>Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Review Cycle (months)</label>
                  <input
                    type="number"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                        : 'border-gray-300 bg-white text-gray-900'
                    }`}
                    placeholder="6"
                    defaultValue="6"
                  />
                </div>
              </>
            )}
            
            {createType === 'assignment' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Assign to Users</label>
                  <select multiple className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32 ${
                    isDarkMode 
                      ? 'border-gray-600 bg-gray-700 text-white' 
                      : 'border-gray-300 bg-white text-gray-900'
                  }`}>
                    <option>John Smith (Operations)</option>
                    <option>Sarah Johnson (Quality)</option>
                    <option>Mike Chen (IT)</option>
                    <option>Lisa Brown (HR)</option>
                    <option>David Wilson (Safety)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Due Date</label>
                  <input
                    type="date"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-700 text-white' 
                        : 'border-gray-300 bg-white text-gray-900'
                    }`}
                  />
                </div>
              </>
            )}
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setShowCreateModal(false)}
              className={`flex-1 px-4 py-2 border rounded-lg ${
                isDarkMode 
                  ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                  : 'border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              Cancel
            </button>
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Create
            </button>
          </div>
        </div>
      </div>
    );
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 rounded-lg shadow-sm border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total SOPs</p>
              <p className={`text-xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{overviewStats.totalSOPs}</p>
            </div>
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        
        <div className={`p-4 rounded-lg shadow-sm border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Compliance Rate</p>
              <p className="text-xl font-bold text-green-600 mt-1">{overviewStats.complianceRate}%</p>
            </div>
            <Target className="w-6 h-6 text-green-600" />
          </div>
        </div>
        
        <div className={`p-4 rounded-lg shadow-sm border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Upcoming Reviews</p>
              <p className="text-xl font-bold text-yellow-600 mt-1">{overviewStats.upcomingReviews}</p>
            </div>
            <Calendar className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
        
        <div className={`p-4 rounded-lg shadow-sm border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Overdue SOPs</p>
              <p className="text-xl font-bold text-red-600 mt-1">{overviewStats.overdueSOPs}</p>
            </div>
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* SOP Status Distribution */}
        <div className={`p-4 rounded-lg shadow-sm border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-md font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SOP Status Distribution</h3>
          
        </div>

        {/* Compliance Trends */}
        <div className={`p-4 rounded-lg shadow-sm border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-md font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Compliance Trends</h3>
          
        </div>
      </div>

      {/* Department Training Progress */}
      <div className={`p-4 rounded-lg shadow-sm border ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-md font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Training Completion by Department</h3>
        
      </div>
    </div>
  );

  const SOPManagementTab = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search SOPs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              isDarkMode 
                ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                : 'border-gray-300 bg-white text-gray-900'
            }`}
          />
        </div>
        
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            isDarkMode 
              ? 'border-gray-600 bg-gray-700 text-white' 
              : 'border-gray-300 bg-white text-gray-900'
          }`}
        >
          <option value="all">All Status</option>
          <option value="approved">Approved</option>
          <option value="draft">Draft</option>
          <option value="review">Under Review</option>
          <option value="overdue">Overdue</option>
        </select>
        
        <button className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${
          isDarkMode 
            ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
            : 'border-gray-300 hover:bg-gray-50 text-gray-700'
        }`}>
          <Filter className="w-4 h-4" />
          More Filters
        </button>
      </div>

      {/* SOP Table */}
      <div className={`rounded-lg shadow-sm border overflow-hidden ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>SOP Details</th>
                <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>Status</th>
                <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>Owner</th>
                <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>Next Review</th>
                <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>Priority</th>
                <th className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              isDarkMode 
                ? 'bg-gray-800 divide-gray-700' 
                : 'bg-white divide-gray-200'
            }`}>
              {recentSOPs.map((sop) => (
                <tr key={sop.id} className={isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{sop.title}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{sop.id}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      sop.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      sop.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                      sop.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {sop.status}
                    </span>
                  </td>
                  <td className={`px-4 py-3 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-900'
                  }`}>{sop.owner}</td>
                  <td className={`px-4 py-3 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>{sop.nextReview}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      sop.priority === 'High' || sop.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                      sop.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {sop.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
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
    </div>
  );

  const TasksTab = () => (
    <div className="space-y-4">
      <div className={`p-4 rounded-lg shadow-sm border ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-md font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Upcoming Tasks & Reminders</h3>
        <div className="space-y-3">
          {upcomingTasks.map((task) => (
            <div key={task.id} className={`flex items-center justify-between p-3 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  task.priority === 'high' ? 'bg-red-500' :
                  task.priority === 'medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}></div>
                <div>
                  <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{task.task}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Due: {task.dueDate}</p>
                </div>
              </div>
              <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                Mark Done
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg shadow-sm border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending Approvals</p>
              <p className="text-xl font-bold text-blue-600 mt-1">8</p>
            </div>
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        
        <div className={`p-4 rounded-lg shadow-sm border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Training Alerts</p>
              <p className="text-xl font-bold text-yellow-600 mt-1">15</p>
            </div>
            <Bell className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
        
        <div className={`p-4 rounded-lg shadow-sm border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Critical Reviews</p>
              <p className="text-xl font-bold text-red-600 mt-1">3</p>
            </div>
            <Shield className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      {/* Header */}
      <div className={`shadow-sm border-b transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SOP Admin Dashboard</h1>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage and monitor your Standard Operating Procedures</p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Create Buttons */}
              <button
                onClick={() => { setCreateType('sop'); setShowCreateModal(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                New SOP
              </button>
              
              <button
                onClick={() => { setCreateType('folder'); setShowCreateModal(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <FolderPlus className="w-4 h-4" />
                New Folder
              </button>
              
              <button
                onClick={() => { setCreateType('assignment'); setShowCreateModal(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <UserPlus className="w-4 h-4" />
                Assign SOP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className={`flex space-x-8 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'sops', label: 'SOP Management', icon: FileText },
            { id: 'tasks', label: 'Tasks & Alerts', icon: Bell }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : isDarkMode 
                    ? 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'sops' && <SOPManagementTab />}
        {activeTab === 'tasks' && <TasksTab />}
      </div>

      {/* Create Modal */}
      <CreateModal />
    </div>
  );
};

export default AdminDashboard;