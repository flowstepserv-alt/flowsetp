"use client";
import React, { useState, useRef } from 'react';
import { Edit, Trash2, Type, Image, Layout, Columns2, Columns3, Plus, Video, User, Download } from 'lucide-react';

// Block types enum
const BLOCK_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  TWO_COLUMN: 'two-column',
  THREE_COLUMN: 'three-column'
};

// Simple text editor component
const TextEditor = ({ content, onChange, placeholder = "Type something..." }) => {
  return (
    <div className="w-full">
      <textarea
        className="w-full p-3 outline-none resize-none bg-transparent text-gray-800 placeholder-gray-400"
        placeholder={placeholder}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        style={{ minHeight: '60px' }}
      />
    </div>
  );
};

// Image upload component
const ImageUpload = ({ content, onChange }) => {
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      {content ? (
        <div className="relative">
          <img src={content} alt="Uploaded" className="w-full h-auto rounded-lg" />
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full p-8 bg-white rounded-lg hover:bg-gray-50 transition-colors flex flex-col items-center justify-center text-gray-500"
        >
          <Image size={48} />
          <span className="mt-2">Click to upload image</span>
        </button>
      )}
    </div>
  );
};

// Video upload component
const VideoUpload = ({ content, onChange }) => {
  const fileInputRef = useRef(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleVideoUpload}
        accept="video/*"
        className="hidden"
      />
      {content ? (
        <div className="relative">
          <video src={content} controls className="w-full h-auto rounded-lg" />
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full p-8 bg-white rounded-lg hover:bg-gray-50 transition-colors flex flex-col items-center justify-center text-gray-500"
        >
          <Video size={48} />
          <span className="mt-2">Click to upload video</span>
        </button>
      )}
    </div>
  );
};

// Team member assignment popup
const TeamMemberPopup = ({ onSelect, onClose, currentMembers = [] }) => {
  const teamMembers = [
    { id: 'john', name: 'John Smith', color: 'bg-blue-100 text-blue-800' },
    { id: 'sarah', name: 'Sarah Johnson', color: 'bg-green-100 text-green-800' },
    { id: 'mike', name: 'Mike Davis', color: 'bg-purple-100 text-purple-800' },
    { id: 'emma', name: 'Emma Wilson', color: 'bg-pink-100 text-pink-800' },
    { id: 'david', name: 'David Brown', color: 'bg-orange-100 text-orange-800' },
    { id: 'alex', name: 'Alex Thompson', color: 'bg-yellow-100 text-yellow-800' },
  ];

  const isAssigned = (memberId) => currentMembers.some(m => m.id === memberId);

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-80">
        <h3 className="text-lg font-medium mb-4 text-gray-800">Assign Team Members</h3>
        <p className="text-sm text-gray-600 mb-4">Click to add or remove team members</p>
        <div className="space-y-2">
          {teamMembers.map((member) => (
            <button
              key={member.id}
              onClick={() => onSelect(member)}
              className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between ${
                isAssigned(member.id) 
                  ? 'bg-blue-50 hover:bg-blue-100 ring-2 ring-blue-500' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className="text-gray-800">{member.name}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${member.color}`}>
                {isAssigned(member.id) ? '✓' : '+'}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
const ColumnBlockTypePopup = ({ onSelect, onClose }) => {
  const columnBlockTypes = [
    { type: BLOCK_TYPES.TEXT, icon: Type, label: 'Text' },
    { type: BLOCK_TYPES.IMAGE, icon: Image, label: 'Image' },
    { type: BLOCK_TYPES.VIDEO, icon: Video, label: 'Video' }
  ];

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h3 className="text-lg font-medium mb-4 text-gray-800">Select Block Type</h3>
        <div className="grid grid-cols-3 gap-3">
          {columnBlockTypes.map((blockType) => {
            const Icon = blockType.icon;
            return (
              <button
                key={blockType.type}
                onClick={() => {
                  onSelect(blockType.type);
                  onClose();
                }}
                className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <Icon size={24} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{blockType.label}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Column block component - each column is its own block with options
const ColumnBlock = ({ column, onUpdate, onTypeChange, onDelete, canDelete, assignedMembers = [], onMemberChange }) => {
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showMemberMenu, setShowMemberMenu] = useState(false);

  const handleMemberSelect = (member) => {
    const isCurrentlyAssigned = assignedMembers.some(m => m.id === member.id);
    let updatedMembers;
    
    if (isCurrentlyAssigned) {
      // Remove member
      updatedMembers = assignedMembers.filter(m => m.id !== member.id);
    } else {
      // Add member
      updatedMembers = [...assignedMembers, member];
    }
    
    onMemberChange(updatedMembers);
  };

  const removeMember = (memberId) => {
    const updatedMembers = assignedMembers.filter(m => m.id !== memberId);
    onMemberChange(updatedMembers);
  };

  // Check if column is empty (no type or empty string)
  if (!column || !column.type || column.type === '') {
    // Empty state - show + symbol in the middle
    return (
      <div className="relative">
        <button
          onClick={() => setShowTypeMenu(true)}
          className="flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors p-3 bg-white rounded-lg hover:bg-gray-50 w-full min-h-[100px]"
        >
          <Plus size={24} />
        </button>

        {showTypeMenu && (
          <ColumnBlockTypePopup
            onSelect={(selectedType) => {
              onTypeChange(selectedType);
              setShowTypeMenu(false);
            }}
            onClose={() => setShowTypeMenu(false)}
          />
        )}
      </div>
    );
  }

  // Has content - show like regular block
  const renderContent = () => {
    switch (column.type) {
      case BLOCK_TYPES.TEXT:
        return (
          <TextEditor
            content={column.content}
            onChange={(content) => onUpdate({ content })}
            placeholder="Type something..."
          />
        );
      case BLOCK_TYPES.IMAGE:
        return (
          <ImageUpload
            content={column.content}
            onChange={(content) => onUpdate({ content })}
          />
        );
      case BLOCK_TYPES.VIDEO:
        return (
          <VideoUpload
            content={column.content}
            onChange={(content) => onUpdate({ content })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="group/column relative rounded-lg hover:bg-gray-50 transition-all bg-white">
      {/* Column hover controls */}
      <div className="absolute top-2 right-2 opacity-0 group-hover/column:opacity-100 transition-opacity flex space-x-2 z-10">
        <button
          onClick={() => setShowMemberMenu(true)}
          className="text-gray-400 hover:text-gray-600 transition-all p-1 rounded hover:bg-gray-100 bg-white shadow-sm"
          title="Assign team member"
        >
          <User size={16} />
        </button>
        
        <button
          onClick={() => setShowTypeMenu(true)}
          className="text-gray-400 hover:text-gray-600 transition-all p-1 rounded hover:bg-gray-100 bg-white shadow-sm"
          title="Edit block type"
        >
          <Edit size={16} />
        </button>
        
        {canDelete && (
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 transition-all p-1 rounded hover:bg-gray-100 bg-white shadow-sm"
            title="Delete block"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Column content */}
      <div className="p-3">
        {assignedMembers.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {assignedMembers.map((member) => (
              <button
                key={member.id}
                onClick={(e) => {
                  e.stopPropagation();
                  removeMember(member.id);
                }}
                className={`px-2 py-1 rounded-full text-xs font-medium hover:opacity-75 transition-opacity cursor-pointer ${member.color}`}
                title="Click to remove"
              >
                {member.name} ×
              </button>
            ))}
          </div>
        )}
        {renderContent()}
      </div>

      {/* Member assignment popup */}
      {showMemberMenu && (
        <TeamMemberPopup
          currentMembers={assignedMembers}
          onSelect={handleMemberSelect}
          onClose={() => setShowMemberMenu(false)}
        />
      )}

      {/* Type selection popup */}
      {showTypeMenu && (
        <ColumnBlockTypePopup
          onSelect={(selectedType) => {
            onTypeChange(selectedType);
            setShowTypeMenu(false);
          }}
          onClose={() => setShowTypeMenu(false)}
        />
      )}
    </div>
  );
};

// Main block type popup (includes all types including columns)
const BlockTypePopup = ({ onSelect, onClose }) => {
  const blockTypes = [
    { type: BLOCK_TYPES.TEXT, icon: Type, label: 'Text' },
    { type: BLOCK_TYPES.IMAGE, icon: Image, label: 'Image' },
    { type: BLOCK_TYPES.VIDEO, icon: Video, label: 'Video' },
    { type: BLOCK_TYPES.TWO_COLUMN, icon: Columns2, label: '2 Columns' },
    { type: BLOCK_TYPES.THREE_COLUMN, icon: Columns3, label: '3 Columns' }
  ];

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h3 className="text-lg font-medium mb-4 text-gray-800">Select Block Type</h3>
        <div className="grid grid-cols-2 gap-3">
          {blockTypes.map((blockType) => {
            const Icon = blockType.icon;
            return (
              <button
                key={blockType.type}
                onClick={() => {
                  onSelect(blockType.type);
                  onClose();
                }}
                className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <Icon size={24} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{blockType.label}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Single block component
const Block = ({ block, onUpdate, onDelete }) => {
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showMemberMenu, setShowMemberMenu] = useState(false);

  const handleMemberSelect = (member) => {
    const currentMembers = block.assignedMembers || [];
    const isCurrentlyAssigned = currentMembers.some(m => m.id === member.id);
    let updatedMembers;
    
    if (isCurrentlyAssigned) {
      // Remove member
      updatedMembers = currentMembers.filter(m => m.id !== member.id);
    } else {
      // Add member
      updatedMembers = [...currentMembers, member];
    }
    
    onUpdate(block.id, { ...block, assignedMembers: updatedMembers });
  };

  const removeMember = (memberId) => {
    const currentMembers = block.assignedMembers || [];
    const updatedMembers = currentMembers.filter(m => m.id !== memberId);
    onUpdate(block.id, { ...block, assignedMembers: updatedMembers });
  };

  const handleTypeChange = (newType) => {
    let newContent = '';
    if (newType === BLOCK_TYPES.TWO_COLUMN) {
      newContent = [{ type: '', content: '' }, { type: '', content: '' }];
    } else if (newType === BLOCK_TYPES.THREE_COLUMN) {
      newContent = [
        { type: '', content: '' },
        { type: '', content: '' },
        { type: '', content: '' }
      ];
    }
    
    onUpdate(block.id, { type: newType, content: newContent });
    setShowEditMenu(false);
  };

  const updateColumnContent = (columnIndex, updates) => {
    const updatedColumns = [...block.content];
    updatedColumns[columnIndex] = { ...updatedColumns[columnIndex], ...updates };
    onUpdate(block.id, { ...block, content: updatedColumns });
  };

  const updateColumnType = (columnIndex, newType) => {
    const updatedColumns = [...block.content];
    updatedColumns[columnIndex] = { type: newType, content: '' };
    onUpdate(block.id, { ...block, content: updatedColumns });
  };

  const updateColumnMember = (columnIndex, members) => {
    const updatedColumns = [...block.content];
    updatedColumns[columnIndex] = { ...updatedColumns[columnIndex], assignedMembers: members };
    onUpdate(block.id, { ...block, content: updatedColumns });
  };

  const renderContent = () => {
    switch (block.type) {
      case BLOCK_TYPES.TEXT:
        return (
          <TextEditor
            content={block.content}
            onChange={(content) => onUpdate(block.id, { ...block, content })}
          />
        );
      case BLOCK_TYPES.IMAGE:
        return (
          <ImageUpload
            content={block.content}
            onChange={(content) => onUpdate(block.id, { ...block, content })}
          />
        );
      case BLOCK_TYPES.VIDEO:
        return (
          <VideoUpload
            content={block.content}
            onChange={(content) => onUpdate(block.id, { ...block, content })}
          />
        );
      case BLOCK_TYPES.TWO_COLUMN:
      case BLOCK_TYPES.THREE_COLUMN:
        const columns = block.content || [];
        const columnClass = block.type === BLOCK_TYPES.TWO_COLUMN ? 'grid-cols-2' : 'grid-cols-3';
        
        return (
          <div className={`grid ${columnClass} gap-4`}>
            {columns.map((column, index) => (
              <ColumnBlock
                key={index}
                column={column}
                onUpdate={(updates) => updateColumnContent(index, updates)}
                onTypeChange={(newType) => updateColumnType(index, newType)}
                onDelete={() => {/* Columns can't be individually deleted */}}
                canDelete={false}
                assignedMembers={column.assignedMembers || []}
                onMemberChange={(members) => updateColumnMember(index, members)}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="group relative rounded-lg mb-4 hover:bg-gray-50 transition-all bg-white">
      {/* Block content with hover controls */}
      <div className="relative p-3">
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2 z-10">
          <button
            onClick={() => setShowMemberMenu(true)}
            className="text-gray-400 hover:text-gray-600 transition-all p-1 rounded hover:bg-gray-100 bg-white shadow-sm"
            title="Assign team member"
          >
            <User size={16} />
          </button>
          
          <button
            onClick={() => setShowEditMenu(true)}
            className="text-gray-400 hover:text-gray-600 transition-all p-1 rounded hover:bg-gray-100 bg-white shadow-sm"
            title="Edit block type"
          >
            <Edit size={16} />
          </button>

          <button
            onClick={() => onDelete(block.id)}
            className="text-gray-400 hover:text-red-500 transition-all p-1 rounded hover:bg-gray-100 bg-white shadow-sm"
            title="Delete block"
          >
            <Trash2 size={16} />
          </button>
        </div>
        
        {/* Show assigned members if exist */}
        {block.assignedMembers && block.assignedMembers.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {block.assignedMembers.map((member) => (
              <button
                key={member.id}
                onClick={(e) => {
                  e.stopPropagation();
                  removeMember(member.id);
                }}
                className={`px-2 py-1 rounded-full text-xs font-medium hover:opacity-75 transition-opacity cursor-pointer ${member.color}`}
                title="Click to remove"
              >
                {member.name} ×
              </button>
            ))}
          </div>
        )}
        
        {renderContent()}
      </div>

      {/* Member assignment popup */}
      {showMemberMenu && (
        <TeamMemberPopup
          currentMembers={block.assignedMembers || []}
          onSelect={handleMemberSelect}
          onClose={() => setShowMemberMenu(false)}
        />
      )}

      {/* Edit popup */}
      {showEditMenu && (
        <BlockTypePopup
          onSelect={handleTypeChange}
          onClose={() => setShowEditMenu(false)}
        />
      )}
    </div>
  );
};

// PDF Export functionality
const exportToPDF = async (blocks) => {
  try {
    // Load jsPDF from CDN if not already loaded
    if (!window.jsPDF && !window.jspdf) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script.onload = () => {
        // Give it a moment to initialize
        setTimeout(() => generatePDF(blocks), 100);
      };
      script.onerror = () => {
        alert('Failed to load PDF library. Please check your internet connection and try again.');
      };
      document.head.appendChild(script);
      return;
    }
    
    generatePDF(blocks);
  } catch (error) {
    console.error('Error loading jsPDF:', error);
    alert('Error loading PDF library. Please try again.');
  }
};

const generatePDF = (blocks) => {
  // Access jsPDF from the global window object
  const jsPDF = window.jsPDF || window.jspdf?.jsPDF;
  
  if (!jsPDF) {
    alert('PDF library not loaded properly. Please try again.');
    return;
  }
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let currentY = 60; // Start below header
  
  // Company logo (favicon) - placeholder for now
  const addHeader = (doc, pageNumber) => {
    // Add favicon/logo placeholder
    doc.setFillColor(59, 130, 246); // Blue color
    doc.circle(25, 20, 8, 'F'); // Simple circle as logo placeholder
    
    // Company name
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Company Name', 40, 20);
    
    // Document title
    doc.setFontSize(14);
    doc.setFont(undefined, 'normal');
    doc.text('Standard Operating Procedure', 40, 30);
    
    // Date
    doc.setFontSize(10);
    doc.text(new Date().toLocaleDateString(), pageWidth - margin - 30, 20);
    
    // Page number
    doc.text(`Page ${pageNumber}`, pageWidth - margin - 20, pageHeight - 10);
    
    // Header line
    doc.setLineWidth(0.5);
    doc.line(margin, 40, pageWidth - margin, 40);
  };
  
  // Add first page header
  let pageNumber = 1;
  addHeader(doc, pageNumber);
  
  // Helper function to check if we need a new page
  const checkNewPage = (doc, currentY, neededHeight = 15) => {
    if (currentY + neededHeight > pageHeight - 20) {
      doc.addPage();
      pageNumber++;
      addHeader(doc, pageNumber);
      return 35; // Reset Y position below smaller header
    }
    return currentY;
  };
  
  // Helper function to wrap text
  const wrapText = (text, maxWidth) => {
    return doc.splitTextToSize(text, maxWidth);
  };
  
  // Process each block
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    
    // Check if we need a new page for this block
    currentY = checkNewPage(doc, currentY, 30);
    
    // Add assigned members if any
    if (block.assignedMembers && block.assignedMembers.length > 0) {
      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      const memberNames = block.assignedMembers.map(m => m.name).join(', ');
      doc.text(`Assigned to: ${memberNames}`, margin, currentY);
      currentY += 12;
    }
    
    // Add content based on block type
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    
    if (block.type === 'text' && block.content) {
      const wrappedText = wrapText(block.content, contentWidth);
      for (let j = 0; j < wrappedText.length; j++) {
        currentY = checkNewPage(doc, currentY);
        doc.text(wrappedText[j], margin, currentY);
        currentY += 6;
      }
    } else if (block.type === 'image') {
      currentY = checkNewPage(doc, currentY);
      if (block.content) {
        doc.text('[Image: Embedded content]', margin, currentY);
      } else {
        doc.text('[Image placeholder]', margin, currentY);
      }
      currentY += 10;
    } else if (block.type === 'video') {
      currentY = checkNewPage(doc, currentY);
      if (block.content) {
        doc.text('[Video: Embedded content]', margin, currentY);
      } else {
        doc.text('[Video placeholder]', margin, currentY);
      }
      currentY += 10;
    } else if (block.type === 'two-column' || block.type === 'three-column') {
      const columns = block.content || [];
      
      for (let colIndex = 0; colIndex < columns.length; colIndex++) {
        const column = columns[colIndex];
        currentY = checkNewPage(doc, currentY);
        
        // Add column assigned members
        if (column.assignedMembers && column.assignedMembers.length > 0) {
          doc.setFontSize(8);
          doc.setFont(undefined, 'bold');
          const colMemberNames = column.assignedMembers.map(m => m.name).join(', ');
          doc.text(`Assigned to: ${colMemberNames}`, margin + 10, currentY);
          currentY += 8;
        }
        
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        
        if (column.type === 'text' && column.content) {
          const wrappedText = wrapText(column.content, contentWidth - 20);
          for (let j = 0; j < wrappedText.length; j++) {
            currentY = checkNewPage(doc, currentY);
            doc.text(wrappedText[j], margin + 10, currentY);
            currentY += 6;
          }
        } else if (column.type === 'image') {
          currentY = checkNewPage(doc, currentY);
          if (column.content) {
            doc.text('[Image: Embedded content]', margin + 10, currentY);
          } else {
            doc.text('[Image placeholder]', margin + 10, currentY);
          }
          currentY += 8;
        } else if (column.type === 'video') {
          currentY = checkNewPage(doc, currentY);
          if (column.content) {
            doc.text('[Video: Embedded content]', margin + 10, currentY);
          } else {
            doc.text('[Video placeholder]', margin + 10, currentY);
          }
          currentY += 8;
        } else if (!column.type || column.type === '') {
          // Skip empty columns entirely
          continue;
        }
        
        // Add space between columns if there's content
        if (column.type && (column.content || column.assignedMembers?.length > 0)) {
          currentY += 5;
        }
      }
    }
    
    currentY += 15; // Space between blocks
  }
  
  // If no blocks, add a message
  if (blocks.length === 0) {
    doc.text('No content blocks have been created yet.', margin, currentY);
  }
  
  // Save the PDF
  doc.save(`SOP-${new Date().toISOString().split('T')[0]}.pdf`);
};

// Main BlockSystem component
const BlockSystem = () => {
  const [blocks, setBlocks] = useState([]);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const addBlock = (type) => {
    let content = '';
    if (type === BLOCK_TYPES.TWO_COLUMN) {
      content = [{ type: '', content: '' }, { type: '', content: '' }];
    } else if (type === BLOCK_TYPES.THREE_COLUMN) {
      content = [
        { type: '', content: '' },
        { type: '', content: '' },
        { type: '', content: '' }
      ];
    }

    const newBlock = {
      id: Date.now(),
      type,
      content
    };
    setBlocks([...blocks, newBlock]);
    setShowAddMenu(false);
  };

  const updateBlock = (id, updates) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    ));
  };

  const deleteBlock = (id) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const handleExportPDF = () => {
    exportToPDF(blocks);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">SOP Builder</h1>
          <p className="text-gray-600">Create your Standard Operating Procedure using blocks</p>
        </div>
        <button
          onClick={handleExportPDF}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Download size={16} />
          <span>Export PDF</span>
        </button>
      </div>

      {blocks.map((block) => (
        <Block
          key={block.id}
          block={block}
          onUpdate={updateBlock}
          onDelete={deleteBlock}
        />
      ))}

      <div className="relative">
        <button
          onClick={() => setShowAddMenu(true)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors p-3 bg-white rounded-lg hover:bg-gray-50 w-full justify-center"
        >
          <Plus size={20} />
          <span>Add new block</span>
        </button>

        {showAddMenu && (
          <BlockTypePopup
            onSelect={addBlock}
            onClose={() => setShowAddMenu(false)}
          />
        )}
      </div>

      {/* Debug/Preview section (remove in production) */}
      {blocks.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Data Structure (for debugging)</h3>
          <pre className="text-xs text-gray-600 overflow-auto">
            {JSON.stringify(blocks, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default BlockSystem;