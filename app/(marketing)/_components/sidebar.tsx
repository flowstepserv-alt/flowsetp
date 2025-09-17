import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Settings, 
  Moon, 
  Sun,
  FolderOpen,
  Folder,
  FileText,
  Search,
  Menu,
  X
} from 'lucide-react';

interface SOPBuilderSidebarProps {
  isDarkMode?: boolean;
  onDarkModeToggle?: () => void;
}

const SOPBuilderSidebar: React.FC<SOPBuilderSidebarProps> = ({ 
  isDarkMode = false, 
  onDarkModeToggle 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState({
    onboarding: true,
    finance: false,
    construction: false,
    operations: false
  });

  // Dummy data structure
  const userData = {
    name: "Sarah Johnson",
    role: "Operations Manager",
    avatar: "SJ"
  };

  const sopFolders = [
    {
      id: 'onboarding',
      name: 'Onboarding',
      icon: '👋',
      sops: [
        { id: '1', name: 'Employee Welcome Process', lastModified: '2 days ago' },
        { id: '2', name: 'IT Setup Checklist', lastModified: '1 week ago' },
        { id: '3', name: 'Department Introduction', lastModified: '3 days ago' }
      ]
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: '💰',
      sops: [
        { id: '4', name: 'Invoice Processing', lastModified: '1 day ago' },
        { id: '5', name: 'Expense Approval Workflow', lastModified: '4 days ago' },
        { id: '6', name: 'Monthly Reporting', lastModified: '1 week ago' }
      ]
    },
    {
      id: 'construction',
      name: 'Construction',
      icon: '🏗️',
      sops: [
        { id: '7', name: 'Safety Protocol', lastModified: '2 days ago' },
        { id: '8', name: 'Material Inspection', lastModified: '5 days ago' },
        { id: '9', name: 'Quality Assurance', lastModified: '1 week ago' }
      ]
    },
    {
      id: 'operations',
      name: 'Operations',
      icon: '⚙️',
      sops: [
        { id: '10', name: 'Daily Standup Process', lastModified: '1 day ago' },
        { id: '11', name: 'Incident Response', lastModified: '3 days ago' },
        { id: '12', name: 'Performance Review', lastModified: '2 weeks ago' }
      ]
    }
  ];

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const toggleDarkMode = () => {
    onDarkModeToggle?.();
  };

  const SidebarContent = () => (
    <div className={`flex flex-col h-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-200`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center text-white text-sm font-medium`}>
              {userData.avatar}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium truncate">{userData.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userData.role}</p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="px-4 pb-2 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search SOPs..."
              className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
            />
          </div>
        </div>
      )}

      {/* SOP Folders */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        <div className="space-y-1">
          {sopFolders.map((folder) => (
            <div key={folder.id} className="mb-1">
              <button
                onClick={() => toggleFolder(folder.id)}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-gray-800 text-gray-200' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {expandedFolders[folder.id] ? (
                    <FolderOpen className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  ) : (
                    <Folder className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  )}
                  {!isCollapsed && (
                    <>
                      <span className="text-lg flex-shrink-0">{folder.icon}</span>
                      <span className="text-sm font-medium truncate">{folder.name}</span>
                    </>
                  )}
                </div>
                {!isCollapsed && (
                  <ChevronRight className={`w-4 h-4 transition-transform flex-shrink-0 ${expandedFolders[folder.id] ? 'rotate-90' : ''}`} />
                )}
              </button>
              
              {/* SOP Items */}
              {expandedFolders[folder.id] && !isCollapsed && (
                <div className="ml-6 mt-1 space-y-1">
                  {folder.sops.map((sop) => (
                    <button
                      key={sop.id}
                      className={`w-full flex items-start space-x-3 p-2 rounded-md text-left transition-colors ${
                        isDarkMode 
                          ? 'hover:bg-gray-800 text-gray-300' 
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <FileText className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{sop.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{sop.lastModified}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className={`border-t mt-auto transition-colors ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="p-4 space-y-3">
          {/* Dark Mode Toggle */}
          {!isCollapsed ? (
            <div className="flex items-center justify-between">
              <span className={`text-sm transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Dark Mode</span>
              <button
                onClick={toggleDarkMode}
                className={`relative inline-flex items-center w-10 h-5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform ${
                  isDarkMode ? 'translate-x-5' : 'translate-x-0.5'
                } flex items-center justify-center`}>
                  {isDarkMode ? (
                    <Moon className="w-2 h-2 text-blue-600" />
                  ) : (
                    <Sun className="w-2 h-2 text-yellow-500" />
                  )}
                </span>
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'hover:bg-gray-800 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                {isDarkMode ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </button>
            </div>
          )}

          {/* Settings */}
          <button className={`w-full flex items-center transition-colors rounded-lg p-2 ${
            isCollapsed ? 'justify-center' : 'space-x-3'
          } ${
            isDarkMode 
              ? 'hover:bg-gray-800 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-700'
          }`}>
            <Settings className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm">Settings</span>}
          </button>

          {/* Account */}
          <button className={`w-full flex items-center transition-colors rounded-lg p-2 ${
            isCollapsed ? 'justify-center' : 'space-x-3'
          } ${
            isDarkMode 
              ? 'hover:bg-gray-800 text-gray-200' 
              : 'hover:bg-gray-100 text-gray-700'
          }`}>
            <User className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm">Account</span>}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className={`lg:hidden fixed top-4 left-4 z-30 p-2 rounded-lg ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } shadow-lg border border-gray-200 dark:border-gray-700`}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col h-screen relative transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-72'
      } border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <SidebarContent />
        {/* Collapse Toggle - positioned within sidebar */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute right-2 top-4 z-20 p-1.5 rounded-full border transition-all duration-200 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500' 
              : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400'
          } shadow-sm`}
        >
          {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <SidebarContent />
      </div>
    </div>
  );
};

export default SOPBuilderSidebar;