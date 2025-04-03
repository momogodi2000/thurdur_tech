import React, { useState, useEffect } from 'react';
import AdminLayout from './layout/AdminLayout';
import { Users, Calendar, BarChart3, PlusCircle, Edit, Trash2, ArrowUpRight, UserPlus, Award, MessageSquare
} from 'lucide-react';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalRegistrations: 0,
    totalSpeakers: 0
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setStats({
        totalUsers: 1248,
        totalEvents: 3,
        totalRegistrations: 856,
        totalSpeakers: 24
      });
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Dummy data for event stats
  const eventData = [
    { id: 1, name: "Digital Healthcare Innovation Hub", date: "2025-05-15", registrations: 423, capacity: 500 },
    { id: 2, name: "Health Tech Startup Meetup", date: "2025-06-22", registrations: 189, capacity: 250 },
    { id: 3, name: "VR in Medical Training Workshop", date: "2025-07-10", registrations: 244, capacity: 300 }
  ];

  // Dummy data for recent users
  const recentUsers = [
    { id: 1, name: "Dr. Sophie Martin", email: "sophie.m@medcenter.com", role: "Healthcare Professional", registeredFor: "Digital Healthcare Innovation Hub" },
    { id: 2, name: "Thomas Wilson", email: "t.wilson@techstartup.co", role: "Startup Founder", registeredFor: "Health Tech Startup Meetup" },
    { id: 3, name: "Elisa Chen", email: "elisa.c@research.edu", role: "Researcher", registeredFor: "VR in Medical Training Workshop" },
    { id: 4, name: "Jean Dubois", email: "j.dubois@investor.net", role: "Investor", registeredFor: "Digital Healthcare Innovation Hub" }
  ];

  // Dummy data for notifications
  const notificationItems = [
    { id: 1, message: "New registration for Digital Healthcare Innovation Hub", time: "10 minutes ago" },
    { id: 2, message: "Speaker profile updated: Dr. Robert Johnson", time: "1 hour ago" },
    { id: 3, message: "Partnership request from MedTech Solutions", time: "3 hours ago" },
    { id: 4, message: "Content update required for VR Workshop page", time: "5 hours ago" },
    { id: 5, message: "New contact form submission from potential investor", time: "Yesterday" }
  ];

  // Activity timeline data
  const activityItems = [
    {
      id: 1,
      icon: <UserPlus className="h-4 w-4 text-white" />,
      iconBgColor: "bg-blue-500",
      message: "New registration from",
      person: "Jean Dubois",
      time: "10 minutes ago"
    },
    {
      id: 2,
      icon: <Edit className="h-4 w-4 text-white" />,
      iconBgColor: "bg-green-500",
      message: "Content updated for",
      item: "Digital Healthcare Innovation Hub",
      time: "1 hour ago"
    },
    {
      id: 3,
      icon: <MessageSquare className="h-4 w-4 text-white" />,
      iconBgColor: "bg-purple-500",
      message: "New message from",
      person: "Dr. Robert Johnson",
      time: "2 hours ago"
    },
    {
      id: 4,
      icon: <Calendar className="h-4 w-4 text-white" />,
      iconBgColor: "bg-yellow-500",
      message: "Event scheduled:",
      item: "Healthcare AI Implementation Webinar",
      time: "Yesterday"
    }
  ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <div className="flex space-x-2">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            April 2, 2025
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Item
          </button>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="space-y-6 animate-fadeIn">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transform transition-all hover:scale-105 hover:shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                  <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-lg text-xs">+12% ↑</span>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Active accounts</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transform transition-all hover:scale-105 hover:shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">Total Events</h3>
                  <span className="bg-green-100 text-green-800 py-1 px-2 rounded-lg text-xs">Active</span>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-lg bg-green-50 flex items-center justify-center mr-4">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.totalEvents}</p>
                    <p className="text-xs text-gray-500">Scheduled events</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transform transition-all hover:scale-105 hover:shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">Registrations</h3>
                  <span className="bg-purple-100 text-purple-800 py-1 px-2 rounded-lg text-xs">+24% ↑</span>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-lg bg-purple-50 flex items-center justify-center mr-4">
                    <UserPlus className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.totalRegistrations.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Across all events</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transform transition-all hover:scale-105 hover:shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">Speakers</h3>
                  <span className="bg-yellow-100 text-yellow-800 py-1 px-2 rounded-lg text-xs">Confirmed</span>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-lg bg-yellow-50 flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.totalSpeakers}</p>
                    <p className="text-xs text-gray-500">Industry experts</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Event & User Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Event Status */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Event Status</h3>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors flex items-center">
                      View All 
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {eventData.map(event => (
                      <div key={event.id} className="animate-fadeIn">
                        <div className="flex justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{event.name}</h4>
                            <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800" title="Edit">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-800" title="Delete">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Registrations</span>
                            <span className="font-medium">{event.registrations}/{event.capacity}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                              style={{ width: `${(event.registrations / event.capacity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Recent Users & Notifications */}
              <div className="space-y-6">
                {/* Recent Users */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold">Recent Registrations</h3>
                  </div>
                  <div className="p-4">
                    <ul className="divide-y divide-gray-200">
                      {recentUsers.map((user, index) => (
                        <li key={user.id} className={`py-3 ${index === 0 ? 'animate-pulse' : ''}`}>
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            </div>
                            <div className="ml-3 overflow-hidden">
                              <p className="text-sm font-medium truncate">{user.name}</p>
                              <p className="text-xs text-gray-500 truncate">{user.registeredFor}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button className="mt-3 text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors w-full text-center">
                      View All Users
                    </button>
                  </div>
                </div>
                
                {/* Notifications */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Notifications</h3>
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full animate-pulse">
                        5 new
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <ul className="divide-y divide-gray-200">
                      {notificationItems.map((item, index) => (
                        <li key={item.id} className={`py-3 ${index < 5 ? 'animate-fadeIn' : ''}`}>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                              <div className={`w-3 h-3 rounded-full ${index < 5 ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                            </div>
                            <div className="ml-3 overflow-hidden">
                              <p className={`text-sm ${index < 5 ? 'font-medium' : 'text-gray-600'}`}>{item.message}</p>
                              <p className="text-xs text-gray-500">{item.time}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button className="mt-3 text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors w-full text-center">
                      Mark All as Read
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Activity Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Recent Activity</h3>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
                    View Activity Log
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flow-root">
                  <ul className="ml-6 -mb-8">
                    {activityItems.map((item, index) => (
                      <li key={item.id} className="relative pb-6">
                        {index < activityItems.length - 1 && (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        )}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full ${item.iconBgColor} flex items-center justify-center`}>
                              {item.icon}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-800">
                                {item.message} {item.person && <span className="font-medium">{item.person}</span>}
                                {item.item && <span className="font-medium">{item.item}</span>}
                              </p>
                            </div>
                            <div className="text-right text-xs text-gray-500">
                              <span>{item.time}</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;