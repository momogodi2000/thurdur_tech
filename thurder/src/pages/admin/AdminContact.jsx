import React, { useState, useEffect } from 'react';
import { Search, Mail, Trash2, Archive, Loader, Star, Reply, Filter, Download, X, Check, Eye, AlertCircle } from 'lucide-react';
import AdminLayout from '../layout/AdminLayout';
import { motion, AnimatePresence } from 'framer-motion';

const AdminContact = () => {
  // State for contacts/messages
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // all, unread, starred, archived
  
  // State for viewing message
  const [viewingMessage, setViewingMessage] = useState(null);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Mock data - replace with actual API call
  useEffect(() => {
    setTimeout(() => {
      const mockData = Array(30).fill().map((_, i) => ({
        id: i + 1,
        name: `Contact ${i + 1}`,
        email: `contact${i + 1}@example.com`,
        subject: `Inquiry about ${['product', 'service', 'pricing', 'support', 'partnership'][i % 5]} #${i+100}`,
        message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl. Nullam auctor, nunc vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.`,
        date: new Date(2025, 3, Math.floor(Math.random() * 30) + 1).toISOString(),
        isRead: Math.random() > 0.3,
        isStarred: Math.random() > 0.7,
        isArchived: Math.random() > 0.9,
        priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
        category: ['general', 'sales', 'support', 'billing', 'technical'][Math.floor(Math.random() * 5)],
      }));
      setMessages(mockData);
      setFilteredMessages(mockData);
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Filter and search functionality
  useEffect(() => {
    let filtered = [...messages];
    
    // Apply active filter
    if (activeFilter === 'unread') {
      filtered = filtered.filter(msg => !msg.isRead);
    } else if (activeFilter === 'starred') {
      filtered = filtered.filter(msg => msg.isStarred);
    } else if (activeFilter === 'archived') {
      filtered = filtered.filter(msg => msg.isArchived);
    } else if (activeFilter === 'not-archived') {
      filtered = filtered.filter(msg => !msg.isArchived);
    }
    
    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(msg => 
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredMessages(filtered);
  }, [searchTerm, messages, activeFilter]);
  
  // Handle select all messages
  const handleSelectAll = () => {
    if (selectedMessages.length === filteredMessages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(filteredMessages.map(msg => msg.id));
    }
  };
  
  // Handle individual message selection
  const handleSelectMessage = (id) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages(selectedMessages.filter(msgId => msgId !== id));
    } else {
      setSelectedMessages([...selectedMessages, id]);
    }
  };
  
  // Handle mark as read/unread
  const handleMarkRead = (read = true) => {
    const updatedMessages = messages.map(msg => {
      if (selectedMessages.includes(msg.id)) {
        return { ...msg, isRead: read };
      }
      return msg;
    });
    
    setMessages(updatedMessages);
    setSelectedMessages([]);
  };
  
  // Handle star/unstar messages
  const handleToggleStar = (id) => {
    const updatedMessages = messages.map(msg => {
      if (msg.id === id) {
        return { ...msg, isStarred: !msg.isStarred };
      }
      return msg;
    });
    
    setMessages(updatedMessages);
  };
  
  // Handle archive messages
  const handleArchive = () => {
    const updatedMessages = messages.map(msg => {
      if (selectedMessages.includes(msg.id)) {
        return { ...msg, isArchived: true };
      }
      return msg;
    });
    
    setMessages(updatedMessages);
    setSelectedMessages([]);
  };
  
  // Handle delete messages
  const handleDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedMessages.length} messages?`)) {
      setIsLoading(true);
      // Simulating API call
      setTimeout(() => {
        const remainingMessages = messages.filter(msg => !selectedMessages.includes(msg.id));
        setMessages(remainingMessages);
        setFilteredMessages(remainingMessages);
        setSelectedMessages([]);
        setIsLoading(false);
      }, 800);
    }
  };
  
  // View message details
  const handleViewMessage = (message) => {
    // If message is unread, mark as read
    if (!message.isRead) {
      const updatedMessages = messages.map(msg => {
        if (msg.id === message.id) {
          return { ...msg, isRead: true };
        }
        return msg;
      });
      setMessages(updatedMessages);
    }
    
    setViewingMessage(message);
  };
  
  // Handle send reply
  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyContent) {
      alert("Please enter a reply message.");
      return;
    }
    
    setIsSending(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsSending(false);
      setIsReplying(false);
      setReplyContent('');
      setViewingMessage(null);
      setShowSuccessMessage(true);
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }, 1500);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const messageDate = new Date(dateString);
    const now = new Date();
    
    // If today, show time only
    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    
    // If this year, show month and day
    if (messageDate.getFullYear() === now.getFullYear()) {
      return messageDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    
    // Otherwise show full date
    return messageDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  // Get priority badge color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get category badge color
  const getCategoryColor = (category) => {
    switch (category) {
      case 'sales':
        return 'bg-blue-100 text-blue-800';
      case 'support':
        return 'bg-purple-100 text-purple-800';
      case 'billing':
        return 'bg-orange-100 text-orange-800';
      case 'technical':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <AdminLayout>
      <div className="h-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Contact Messages</h1>
          <p className="text-gray-600">Manage and respond to incoming contact form messages</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-4 shadow border border-gray-100"
          >
            <h3 className="text-gray-500 text-sm font-medium">Total Messages</h3>
            <p className="text-2xl font-bold text-gray-800">{messages.length}</p>
            <div className="mt-2 text-xs text-green-600 flex items-center">
              <span className="mr-1">↑ 12%</span>
              <span>since last month</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-4 shadow border border-gray-100"
          >
            <h3 className="text-gray-500 text-sm font-medium">Unread Messages</h3>
            <p className="text-2xl font-bold text-gray-800">
              {messages.filter(msg => !msg.isRead).length}
            </p>
            <div className="mt-2 text-xs text-red-600 flex items-center">
              <span className="mr-1">↑ 5%</span>
              <span>since last week</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg p-4 shadow border border-gray-100"
          >
            <h3 className="text-gray-500 text-sm font-medium">Response Rate</h3>
            <p className="text-2xl font-bold text-gray-800">
              92%
            </p>
            <div className="mt-2 text-xs text-green-600 flex items-center">
              <span className="mr-1">↑ 3%</span>
              <span>since last month</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg p-4 shadow border border-gray-100"
          >
            <h3 className="text-gray-500 text-sm font-medium">Avg. Response Time</h3>
            <p className="text-2xl font-bold text-gray-800">5.2 hrs</p>
            <div className="mt-2 text-xs text-green-600 flex items-center">
              <span className="mr-1">↓ 15%</span>
              <span>since last quarter</span>
            </div>
          </motion.div>
        </div>
        
        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow border border-gray-100 mb-6">
          <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button 
                  className={`px-3 py-2 text-sm ${activeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => setActiveFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`px-3 py-2 text-sm ${activeFilter === 'unread' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => setActiveFilter('unread')}
                >
                  Unread
                </button>
                <button 
                  className={`px-3 py-2 text-sm ${activeFilter === 'starred' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => setActiveFilter('starred')}
                >
                  Starred
                </button>
                <button 
                  className={`px-3 py-2 text-sm ${activeFilter === 'archived' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => setActiveFilter('archived')}
                >
                  Archived
                </button>
              </div>
            </div>
          </div>
          
          {selectedMessages.length > 0 && (
            <div className="border-t border-gray-200 p-4 flex flex-wrap gap-2">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg flex items-center shadow hover:bg-blue-700 transition-colors text-sm"
                onClick={() => handleMarkRead(true)}
              >
                <Eye className="h-4 w-4 mr-1" />
                Mark Read
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg flex items-center shadow hover:bg-gray-200 transition-colors text-sm"
                onClick={() => handleMarkRead(false)}
              >
                <AlertCircle className="h-4 w-4 mr-1" />
                Mark Unread
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg flex items-center shadow hover:bg-gray-200 transition-colors text-sm"
                onClick={handleArchive}
              >
                <Archive className="h-4 w-4 mr-1" />
                Archive
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 bg-red-600 text-white rounded-lg flex items-center shadow hover:bg-red-700 transition-colors text-sm"
                onClick={handleDeleteSelected}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </motion.button>
            </div>
          )}
        </div>
        
        {/* Success Message */}
        <AnimatePresence>
          {showSuccessMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow-md flex items-center justify-between"
            >
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2" />
                <div>
                  <p className="font-medium">Success!</p>
                  <p className="text-sm">Reply sent successfully.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSuccessMessage(false)}
                className="text-green-700 hover:text-green-900"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Messages Table */}
        <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={selectedMessages.length === filteredMessages.length && filteredMessages.length > 0}
                        onChange={handleSelectAll}
                      />
                    </div>
                  </th>
                  <th scope="col" className="w-8"></th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Loader className="h-8 w-8 text-blue-500 animate-spin mb-2" />
                        <p className="text-gray-500">Loading messages...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredMessages.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Mail className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-gray-500">No messages found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredMessages.map((message, index) => (
                    <motion.tr 
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`hover:bg-gray-50 cursor-pointer ${!message.isRead ? 'font-semibold bg-blue-50' : ''}`}
                      onClick={() => handleViewMessage(message)}
                    >
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            checked={selectedMessages.includes(message.id)}
                            onChange={() => handleSelectMessage(message.id)}
                          />
                        </div>
                      </td>
                      <td className="w-8 text-center" onClick={(e) => e.stopPropagation()}>
                        <button 
                          className={`text-yellow-400 hover:text-yellow-600`}
                          onClick={() => handleToggleStar(message.id)}
                        >
                          <Star className={`h-5 w-5 ${message.isStarred ? 'fill-current' : ''}`} />
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className={`text-sm ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>{message.name}</div>
                            <div className="text-xs text-gray-500">{message.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`text-sm ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>{message.subject}</div>
                        <div className="text-xs text-gray-500 truncate w-48">{message.message}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(message.category)}`}>
                          {message.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(message.priority)}`}>
                          {message.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(message.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          Reply
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer */}
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden mb-3 sm:mb-0">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredMessages.length}</span> of{' '}
                  <span className="font-medium">{messages.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    10
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
        
        {/* Message View Modal */}
        <AnimatePresence>
          {viewingMessage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-hidden flex flex-col"
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Message Details</h2>
                  <button 
                    onClick={() => setViewingMessage(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="mb-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                      <h3 className="text-lg font-semibold text-gray-800">{viewingMessage.subject}</h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <span className="mr-2">From: {viewingMessage.name} &lt;{viewingMessage.email}&gt;</span>
                          <span className="mr-2">•</span>
                          <span>{new Date(viewingMessage.date).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(viewingMessage.category)}`}>
                          {viewingMessage.category}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(viewingMessage.priority)}`}>
                          {viewingMessage.priority}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-line">
                      {viewingMessage.message}
                    </div>
                  </div>
                  
                  {!isReplying ? (
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setIsReplying(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <Reply className="h-5 w-5 mr-2" />
                        Reply
                      </button>
                      <button
                        onClick={() => {
                          handleToggleStar(viewingMessage.id);
                          setViewingMessage({
                            ...viewingMessage,
                            isStarred: !viewingMessage.isStarred
                          });
                        }}
                        className={`px-4 py-2 rounded-lg border flex items-center ${
                          viewingMessage.isStarred 
                            ? 'bg-yellow-50 border-yellow-200 text-yellow-600' 
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Star className={`h-5 w-5 mr-2 ${viewingMessage.isStarred ? 'fill-current' : ''}`} />
                        {viewingMessage.isStarred ? 'Starred' : 'Star'}
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteSelected([viewingMessage.id]);
                          setViewingMessage(null);
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                      >
                        <Trash2 className="h-5 w-5 mr-2" />
                        Delete
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSendReply}>
                      <div className="mb-4">
                        <label htmlFor="replyContent" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Reply
                        </label>
                        <textarea
                          id="replyContent"
                          rows={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Type your reply here..."
                        />
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setIsReplying(false)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSending}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-70"
                        >
                          {isSending ? (
                            <>
                              <Loader className="h-5 w-5 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Mail className="h-5 w-5 mr-2" />
                              Send Reply
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default AdminContact;