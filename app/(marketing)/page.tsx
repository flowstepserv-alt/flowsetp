'use client';

import { useState, useEffect } from 'react';
import BlockSystem from "./_components/block";
import { Heading } from "./_components/heading";
import { Heroes } from "./_components/heroes";
import Sidebar from "./_components/sidebar";

const MarketingPage = () => {
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
    <div className={`min-h-screen flex transition-colors duration-200 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-white'
    }`}>
      {/* Fixed Sidebar on the left */}
      <div className={`w-64 flex-shrink-0 border-r transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-900 border-gray-700' 
          : 'bg-gray-50 border-gray-200'
      }`}>
        <Sidebar 
          isDarkMode={isDarkMode} 
          onDarkModeToggle={toggleDarkMode} 
        />
      </div>
      
      {/* SOP Building Area on the right */}
      <div className={`flex-1 flex flex-col transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className={`flex-1 p-6 transition-colors duration-200 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          <BlockSystem isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
}

export default MarketingPage;