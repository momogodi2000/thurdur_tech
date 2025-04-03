import React, { useState, useEffect } from 'react';
import { Search, Mail, Trash2, Plus, Loader, Send, Filter, Download, Upload, X, Check } from 'lucide-react';
import AdminLayout from '../layout/AdminLayout';
import { motion, AnimatePresence } from 'framer-motion';

const AdminNewsletter = () => {
  // State for newsletter subscribers
  const [subscribers, setSubscribers] = useState([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState([]);
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for mass email
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Mock data - replace with actual API call
  useEffect(() => {
    setTimeout(() => {
      const mockData = Array(25).fill().map((_, i) => ({
        id: i + 1,
        email: `user${i + 1}@example.com`,
        dateSubscribed: new Date(2025, 0, Math.floor(Math.random() * 90) + 1).toISOString(),
        status: Math.random() > 0.2 ? 'active' : 'inactive',
        openRate: Math.floor(Math.random() * 100),
        lastOpened: new Date(2025, 2, Math.floor(Math.random() * 30) + 1).toISOString(),
      }));
      setSubscribers(mockData);
      setFilteredSubscribers(mockData);
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Search functionality
  useEffect(() => {
    if (searchTerm) {
      const filtered = subscribers.filter(sub => 
        sub.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSubscribers(filtered);
    } else {
      setFilteredSubscribers(subscribers);
    }
  }, [searchTerm, subscribers]);
  
  // Handle select all subscribers
  const handleSelectAll = () => {
    if (selectedSubscribers.length === filteredSubscribers.length) {
      setSelectedSubscribers([]);
    } else {
      setSelectedSubscribers(filteredSubscribers.map(sub => sub.id));
    }
  };
  
  // Handle individual subscriber selection
  const handleSelectSubscriber = (id) => {
    if (selectedSubscribers.includes(id)) {
      setSelectedSubscribers(selectedSubscribers.filter(subId => subId !== id));
    } else {
      setSelectedSubscribers([...selectedSubscribers, id]);
    }
  };
  
  // Handle delete subscribers
  const handleDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedSubscribers.length} subscribers?`)) {
      setIsLoading(true);
      // Simulating API call
      setTimeout(() => {
        const remainingSubscribers = subscribers.filter(sub => !selectedSubscribers.includes(sub.id));
        setSubscribers(remainingSubscribers);
        setFilteredSubscribers(remainingSubscribers);
        setSelectedSubscribers([]);
        setIsLoading(false);
      }, 800);
    }
  };
  
  // Handle send mass email
  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!emailSubject || !emailContent) {
      alert("Please fill in both subject and content fields.");
      return;
    }
    
    setIsSending(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsSending(false);
      setShowEmailForm(false);
      setEmailSubject('');
      setEmailContent('');
      setShowSuccessMessage(true);
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }, 1500);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <AdminLayout>
      <div className="h-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Newsletter Management</h1>
          <p className="text-gray-600">Manage your subscribers and send mass emails</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-4 shadow border border-gray-100"
          >
            <h3 className="text-gray-500 text-sm font-medium">Total Subscribers</h3>
            <p className="text-2xl font-bold text-gray-800">{subscribers.length}</p>
            <div className="mt-2 text-xs text-green-600 flex items-center">
              <span className="mr-1">↑ 5.3%</span>
              <span>since last month</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-4 shadow border border-gray-100"
          >
            <h3 className="text-gray-500 text-sm font-medium">Active Subscribers</h3>
            <p className="text-2xl font-bold text-gray-800">
              {subscribers.filter(sub => sub.status === 'active').length}
            </p>
            <div className="mt-2 text-xs text-green-600 flex items-center">
              <span className="mr-1">↑ 2.1%</span>
              <span>since last month</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg p-4 shadow border border-gray-100"
          >
            <h3 className="text-gray-500 text-sm font-medium">Average Open Rate</h3>
            <p className="text-2xl font-bold text-gray-800">
              {subscribers.length ? 
                `${Math.round(subscribers.reduce((acc, sub) => acc + sub.openRate, 0) / subscribers.length)}%` : 
                '0%'}
            </p>
            <div className="mt-2 text-xs text-red-600 flex items-center">
              <span className="mr-1">↓ 1.2%</span>
              <span>since last campaign</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg p-4 shadow border border-gray-100"
          >
            <h3 className="text-gray-500 text-sm font-medium">Emails Sent</h3>
            <p className="text-2xl font-bold text-gray-800">12,543</p>
            <div className="mt-2 text-xs text-green-600 flex items-center">
              <span className="mr-1">↑ 7.8%</span>
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
                placeholder="Search subscribers..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center shadow hover:bg-blue-700 transition-colors"
                onClick={() => setShowEmailForm(true)}
                disabled={selectedSubscribers.length === 0}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Email ({selectedSubscribers.length})
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center shadow hover:bg-red-700 transition-colors"
                onClick={handleDeleteSelected}
                disabled={selectedSubscribers.length === 0}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center shadow hover:bg-gray-200 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center shadow hover:bg-gray-200 transition-colors"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center shadow hover:bg-gray-200 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </motion.button>
            </div>
          </div>
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
                  <p className="text-sm">Email sent to {selectedSubscribers.length} subscribers.</p>
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
        
        {/* Subscribers Table */}
        <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={selectedSubscribers.length === filteredSubscribers.length && filteredSubscribers.length > 0}
                        onChange={handleSelectAll}
                      />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Subscribed
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Open Rate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Opened
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Loader className="h-8 w-8 text-blue-500 animate-spin mb-2" />
                        <p className="text-gray-500">Loading subscribers...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredSubscribers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Mail className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-gray-500">No subscribers found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredSubscribers.map((subscriber, index) => (
                    <motion.tr 
                      key={subscriber.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            checked={selectedSubscribers.includes(subscriber.id)}
                            onChange={() => handleSelectSubscriber(subscriber.id)}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{subscriber.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          subscriber.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {subscriber.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(subscriber.dateSubscribed)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{subscriber.openRate}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(subscriber.lastOpened)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          Edit
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
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredSubscribers.length}</span> of{' '}
                  <span className="font-medium">{subscribers.length}</span> results
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
        
        {/* Email Form Modal */}
        <AnimatePresence>
          {showEmailForm && (
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
                className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-full overflow-hidden"
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Send Newsletter Email</h2>
                  <button 
                    onClick={() => setShowEmailForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="px-6 py-4 max-h-96 overflow-y-auto">
                  <form onSubmit={handleSendEmail}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        To
                      </label>
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <div className="text-sm text-gray-700">
                          {selectedSubscribers.length} subscribers selected
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email-subject" className="block text-gray-700 text-sm font-medium mb-2">
                        Subject
                      </label>
                      <input 
                        id="email-subject"
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter email subject..."
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email-content" className="block text-gray-700 text-sm font-medium mb-2">
                        Content
                      </label>
                      <textarea 
                        id="email-content"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="10"
                        placeholder="Write your email content here..."
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                        required
                      ></textarea>
                    </div>
                  </form>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg mr-2 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowEmailForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center shadow hover:bg-blue-700 transition-colors"
                    onClick={handleSendEmail}
                    disabled={isSending}
                  >
                    {isSending ? (
                      <>
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Email
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default AdminNewsletter;