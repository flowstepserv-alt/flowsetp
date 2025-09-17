'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  User, 
  Clock, 
  FileText,
  Play,
  Image,
  Video
} from 'lucide-react';

// Mock SOP data based on your BlockSystem structure
const mockSOPData = {
  id: 'sop-001',
  title: 'Employee Welcome Process',
  description: 'Complete onboarding procedure for new team members',
  assignedTo: 'Sarah Johnson',
  dueDate: '2025-09-20',
  estimatedTime: '45 minutes',
  status: 'in-progress', // 'not-started', 'in-progress', 'completed'
  blocks: [
    {
      id: 1,
      type: 'text',
      content: 'Welcome to the company! This SOP will guide you through the essential steps of your onboarding process. Please complete each step in order and mark them as done.',
      assignedMembers: [
        { id: 'sarah', name: 'Sarah Johnson', color: 'bg-green-100 text-green-800' }
      ],
      completed: true
    },
    {
      id: 2,
      type: 'two-column',
      content: [
        {
          type: 'text',
          content: 'Review company handbook and policies. Make sure you understand our core values, code of conduct, and workplace guidelines.',
          assignedMembers: [
            { id: 'john', name: 'John Smith', color: 'bg-blue-100 text-blue-800' }
          ]
        },
        {
          type: 'image',
          content: '/api/placeholder/300/200', // Placeholder image URL
          assignedMembers: [
            { id: 'sarah', name: 'Sarah Johnson', color: 'bg-green-100 text-green-800' }
          ]
        }
      ],
      completed: false
    },
    {
      id: 3,
      type: 'text',
      content: 'Complete your IT setup: Get your laptop, install required software, and set up your company accounts (email, Slack, project management tools).',
      assignedMembers: [
        { id: 'mike', name: 'Mike Davis', color: 'bg-purple-100 text-purple-800' }
      ],
      completed: false
    },
    {
      id: 4,
      type: 'video',
      content: 'training-video.mp4', // Placeholder video
      assignedMembers: [
        { id: 'emma', name: 'Emma Wilson', color: 'bg-pink-100 text-pink-800' }
      ],
      completed: false
    },
    {
      id: 5,
      type: 'three-column',
      content: [
        {
          type: 'text',
          content: 'Meet your team members and understand your role within the department structure.',
          assignedMembers: []
        },
        {
          type: 'text',
          content: 'Schedule one-on-one meetings with key stakeholders and your direct manager.',
          assignedMembers: []
        },
        {
          type: 'text',
          content: 'Complete the new employee feedback form and submit it to HR.',
          assignedMembers: []
        }
      ],
      completed: false
    }
  ]
};

// Employee block component - read-only with completion checkbox
const EmployeeBlock = ({ block, onToggleComplete, isDarkMode = false }) => {
  // Use the block's completion state directly, don't maintain separate local state
  const isCompleted = block.completed || false;

  const handleComplete = () => {
    const newCompletedState = !isCompleted;
    console.log('Block handleComplete called:', block.id, 'current:', isCompleted, 'new:', newCompletedState); // Debug log
    onToggleComplete(block.id, newCompletedState);
  };

  const renderContent = () => {
    switch (block.type) {
      case 'text':
        return (
          <div className="prose prose-sm max-w-none">
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {block.content}
            </p>
          </div>
        );
      
      case 'image':
        return (
          <div className="flex flex-col items-center space-y-2">
            <div className={`w-full max-w-md rounded-lg overflow-hidden ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            } p-4 flex items-center justify-center min-h-[200px]`}>
              <div className="text-center">
                <Image className={`w-12 h-12 mx-auto mb-2 ${
                  isDarkMode ? 'text-gray-600' : 'text-gray-400'
                }`} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Image content would display here
                </span>
              </div>
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div className="flex flex-col items-center space-y-2">
            <div className={`w-full max-w-md rounded-lg overflow-hidden ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            } p-4 flex items-center justify-center min-h-[200px]`}>
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-white'
                } shadow-sm`}>
                  <Play className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                </div>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Training Video
                </span>
              </div>
            </div>
          </div>
        );
      
      case 'two-column':
      case 'three-column':
        const columns = block.content || [];
        const columnClass = block.type === 'two-column' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3';
        
        return (
          <div className={`grid ${columnClass} gap-4`}>
            {columns.map((column, index) => (
              <div key={index} className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                {column.assignedMembers && column.assignedMembers.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1">
                    {column.assignedMembers.map((member) => (
                      <span
                        key={member.id}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${member.color}`}
                      >
                        {member.name}
                      </span>
                    ))}
                  </div>
                )}
                
                {column.type === 'text' && (
                  <p className={`text-sm leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {column.content}
                  </p>
                )}
                
                {column.type === 'image' && (
                  <div className={`rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'} p-3 flex items-center justify-center min-h-[120px]`}>
                    <div className="text-center">
                      <Image className={`w-8 h-8 mx-auto mb-2 ${
                        isDarkMode ? 'text-gray-600' : 'text-gray-400'
                      }`} />
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Image
                      </span>
                    </div>
                  </div>
                )}
                
                {column.type === 'video' && (
                  <div className={`rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'} p-3 flex items-center justify-center min-h-[120px]`}>
                    <div className="text-center">
                      <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${
                        isDarkMode ? 'bg-gray-600' : 'bg-gray-100'
                      }`}>
                        <Play className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                      </div>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Video
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`relative rounded-lg transition-all duration-300 ${
      isCompleted 
        ? `${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'} opacity-75`
        : `${isDarkMode ? 'bg-gray-800' : 'bg-white'} hover:shadow-sm`
    }`}>
      {/* Completion Overlay - Make it clickable */}
      {isCompleted && (
        <button
          onClick={handleComplete}
          className="absolute inset-0 bg-black/5 backdrop-blur-[1px] rounded-lg flex items-center justify-center z-10 hover:bg-black/10 transition-all cursor-pointer"
          title="Click to mark as incomplete"
        >
          <div className={`p-3 rounded-full ${
            isDarkMode ? 'bg-green-800' : 'bg-green-100'
          } shadow-lg hover:scale-110 transition-transform`}>
            <CheckCircle2 className={`w-8 h-8 ${
              isDarkMode ? 'text-green-400' : 'text-green-600'
            }`} />
          </div>
        </button>
      )}
      
      <div className="p-6">
        {/* Assigned Members */}
        {block.assignedMembers && block.assignedMembers.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1">
            {block.assignedMembers.map((member) => (
              <span
                key={member.id}
                className={`px-2 py-1 rounded-full text-xs font-medium ${member.color}`}
              >
                {member.name}
              </span>
            ))}
          </div>
        )}
        
        {/* Block Content */}
        <div className="mb-4">
          {renderContent()}
        </div>
        
        {/* Completion Checkbox */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={handleComplete}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${
              isCompleted
                ? `${isDarkMode ? 'bg-green-800 text-green-200 hover:bg-green-700 shadow-lg' : 'bg-green-100 text-green-800 hover:bg-green-200 shadow-lg'}`
                : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
            }`}
            title={isCompleted ? "Click to mark as incomplete" : "Click to mark as complete"}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Circle className="w-4 h-4" />
            )}
            <span>{isCompleted ? 'Completed (Click to undo)' : 'Mark as Complete'}</span>
          </button>
          
          {isCompleted && (
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Completed at {new Date().toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Main employee SOP viewer component
const EmployeeSOPViewer = ({ isDarkMode = false }) => {
  const [sopData, setSOPData] = useState(mockSOPData);

  const handleToggleBlockComplete = (blockId, isCompleted) => {
    console.log('Toggling block:', blockId, 'to:', isCompleted); // Debug log
    
    setSOPData(prevData => {
      const updatedBlocks = prevData.blocks.map(block => 
        block.id === blockId ? { ...block, completed: isCompleted } : block
      );
      
      const newCompletedCount = updatedBlocks.filter(block => block.completed).length;
      const totalBlocks = updatedBlocks.length;
      
      let newStatus = 'not-started';
      if (newCompletedCount === totalBlocks) {
        newStatus = 'completed';
      } else if (newCompletedCount > 0) {
        newStatus = 'in-progress';
      }
      
      console.log('New completed count:', newCompletedCount); // Debug log
      
      return {
        ...prevData,
        blocks: updatedBlocks,
        status: newStatus
      };
    });
  };

  const completedBlocks = sopData.blocks.filter(block => block.completed).length;

  const completionPercentage = Math.round((completedBlocks / sopData.blocks.length) * 100) || 0;

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className={`rounded-lg border mb-6 p-6 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className={`text-2xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {sopData.title}
              </h1>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {sopData.description}
              </p>
            </div>
            
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              sopData.status === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : sopData.status === 'in-progress'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {sopData.status === 'completed' ? 'Completed' : 
               sopData.status === 'in-progress' ? 'In Progress' : 'Not Started'}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Progress
              </span>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {completedBlocks}/{sopData.blocks.length} steps completed
              </span>
            </div>
            <div className={`w-full rounded-full h-2 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
          
          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <User className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Assigned to: {sopData.assignedTo}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Est. time: {sopData.estimatedTime}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                Due: {new Date(sopData.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* SOP Blocks */}
        <div className="space-y-6">
          {sopData.blocks.map((block, index) => (
            <div key={block.id} className="relative">
              <EmployeeBlock
                block={block}
                onToggleComplete={handleToggleBlockComplete}
                isDarkMode={isDarkMode}
              />
            </div>
          ))}
        </div>

        {/* Completion Summary */}
        {sopData.status === 'completed' && (
          <div className={`mt-8 p-6 rounded-lg border-2 border-green-200 ${
            isDarkMode ? 'bg-green-900/20' : 'bg-green-50'
          }`}>
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              <div>
                <h3 className={`text-lg font-semibold ${
                  isDarkMode ? 'text-green-400' : 'text-green-800'
                }`}>
                  SOP Completed!
                </h3>
                <p className={isDarkMode ? 'text-green-300' : 'text-green-700'}>
                  You have successfully completed all steps in this Standard Operating Procedure.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeSOPViewer;