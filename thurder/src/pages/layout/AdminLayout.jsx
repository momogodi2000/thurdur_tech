import React, { useState } from 'react';
import {Users,Calendar,BarChart3,MessageSquare,Settings,Bell,Search,Menu,X,ChevronDown,Mail,Newspaper
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();
  
  const activeTab = location.pathname.split('/')[2] || 'dashboard';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateTo = (path) => {
    navigate(`/admin/${path}`);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">Thunder Technology</h1>
          <p className="text-sm text-gray-500">Admin Dashboard</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => navigateTo('admin')} 
            className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <BarChart3 className="mr-3 h-5 w-5" />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => navigateTo('events')} 
            className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${activeTab === 'events' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <Calendar className="mr-3 h-5 w-5" />
            <span>Events</span>
          </button>
          
          <button 
            onClick={() => navigateTo('contacts')} 
            className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${activeTab === 'contacts' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <Mail className="mr-3 h-5 w-5" />
            <span>Contact Messages</span>
          </button>
          
          <button 
            onClick={() => navigateTo('newsletter')} 
            className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${activeTab === 'newsletter' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <Newspaper className="mr-3 h-5 w-5" />
            <span>Newsletter</span>
          </button>
          
          <button 
            onClick={() => navigateTo('settings')} 
            className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <Settings className="mr-3 h-5 w-5" />
            <span>Settings</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">AT</div>
            <div className="ml-3">
              <p className="text-sm font-medium">Admin Team</p>
              <p className="text-xs text-gray-500">admin@thundertech.com</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button onClick={toggleMenu} className="md:hidden mr-4 text-gray-600">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <h1 className="text-xl font-semibold md:hidden">Thunder Tech</h1>
            </div>
            
            <div className="hidden md:flex items-center flex-1 px-4 mx-4">
              <div className="relative flex-1 max-w-md">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                className="relative text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setNotifications(0)}
              >
                <Bell className="h-6 w-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>
              
              <div className="hidden md:flex items-center">
                <img 
                  src="/assets/avarta/avarta.webp" 
                  alt="Admin" 
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="ml-2 font-medium">Admin</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </div>
            </div>
          </div>
        </header>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-50">
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h1 className="text-xl font-bold text-blue-600">Thunder Technology</h1>
                <button onClick={toggleMenu} className="text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <nav className="p-4 space-y-1">
                <button 
                  onClick={() => navigateTo('dashboard')} 
                  className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <BarChart3 className="mr-3 h-5 w-5" />
                  <span>Dashboard</span>
                </button>
                
                <button 
                  onClick={() => navigateTo('users')} 
                  className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${activeTab === 'users' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <Users className="mr-3 h-5 w-5" />
                  <span>Users</span>
                </button>
                
                <button 
                  onClick={() => navigateTo('events')} 
                  className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${activeTab === 'events' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <Calendar className="mr-3 h-5 w-5" />
                  <span>Events</span>
                </button>
                
                <button 
                  onClick={() => navigateTo('messages')} 
                  className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${activeTab === 'messages' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <MessageSquare className="mr-3 h-5 w-5" />
                  <span>Messages</span>
                  <span className="ml-auto bg-blue-100 text-blue-600 rounded-full px-2 py-1 text-xs">New</span>
                </button>
                
                <button 
                  onClick={() => navigateTo('contacts')} 
                  className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${activeTab === 'contacts' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <Mail className="mr-3 h-5 w-5" />
                  <span>Contact Messages</span>
                </button>
                
                <button 
                  onClick={() => navigateTo('newsletter')} 
                  className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${activeTab === 'newsletter' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <Newspaper className="mr-3 h-5 w-5" />
                  <span>Newsletter</span>
                </button>
                
                <button 
                  onClick={() => navigateTo('settings')} 
                  className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  <span>Settings</span>
                </button>
              </nav>
            </div>
          </div>
        )}
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>© 2025 Thunder Technology. All rights reserved.</div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Help Center</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;