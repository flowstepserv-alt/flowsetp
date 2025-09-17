'use client';

import { useState, useEffect } from 'react';
import EmployeeSOPViewer from "../(marketing)/_components/employee-sop-viewer";
import Sidebar from "../(marketing)/_components/sidebar";

const EmployeePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save dark mode preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    // Toggle the 'dark' class on the document element for global dark mode
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`h-screen flex transition-colors duration-200 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-white'
    }`}>
      {/* Fixed Sidebar on the left - sticky and full height */}
      <div className={`w-64 h-screen sticky top-0 flex-shrink-0 border-r transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-900 border-gray-700' 
          : 'bg-gray-50 border-gray-200'
      }`}>
        <Sidebar 
          isDarkMode={isDarkMode} 
          onDarkModeToggle={toggleDarkMode} 
        />
      </div>
      
      {/* SOP Viewing Area on the right - scrollable content */}
      <div className={`flex-1 h-screen overflow-y-auto transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <EmployeeSOPViewer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default EmployeePage;