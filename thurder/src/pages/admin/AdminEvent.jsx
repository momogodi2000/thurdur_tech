import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, BarChart2, Search, Filter, Edit2, Trash2, Download, ChevronDown, ChevronUp, Users, Clock, Check, X } from 'lucide-react';
import AdminLayout from '../layout/AdminLayout';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    status: 'upcoming',
    capacity: 100,
    registered: 0
  });
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    pastEvents: 0,
    averageAttendance: 0,
    registrationTrend: []
  });

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    const sampleEvents = [
      {
        id: 1,
        title: "Digital Healthcare Innovation Hub",
        date: "2025-07-15",
        endDate: "2025-07-17",
        location: "TKC Yaoundé, Cameroon",
        description: "Join healthcare professionals, startups, and tech experts to explore the future of digital healthcare in Africa.",
        status: "upcoming",
        capacity: 300,
        registered: 187,
        agenda: [
          "Day 1: Digital Healthcare Landscape",
          "Day 2: Innovation and Implementation",
          "Day 3: Future Directions"
        ],
        speakers: [
          "Dr. Emmanuelle Nkouyo",
          "Prof. Samuel Eto'o",
          "Dr. Aisha Mwangi"
        ]
      },
      {
        id: 2,
        title: "Healthcare Digitalization Conference",
        date: "2024-05-10",
        endDate: "2024-05-11",
        location: "Yaoundé, Cameroon",
        description: "Focused on healthcare digitalization strategies and implementation challenges in Central Africa.",
        status: "completed",
        capacity: 250,
        registered: 215,
        agenda: [
          "Day 1: Keynotes and Panel Discussions",
          "Day 2: Workshops and Networking"
        ],
        speakers: [
          "Dr. Jean Tsanga",
          "Marie Nguele"
        ]
      },
      {
        id: 3,
        title: "Medical Technology Workshop Series",
        date: "2024-10-05",
        endDate: "2024-10-07",
        location: "Douala, Cameroon",
        description: "Hands-on workshops to help healthcare professionals adopt new medical technologies.",
        status: "completed",
        capacity: 150,
        registered: 150,
        agenda: [
          "Telehealth Systems",
          "Electronic Medical Records",
          "Diagnostic Technologies"
        ],
        speakers: [
          "Dr. Esther Mbatchou",
          "Dr. Paul Ntamack"
        ]
      },
      {
        id: 4,
        title: "AI in Healthcare Symposium",
        date: "2025-03-20",
        endDate: "2025-03-21",
        location: "Online",
        description: "Exploring artificial intelligence applications in healthcare diagnostics and treatment.",
        status: "upcoming",
        capacity: 500,
        registered: 320,
        agenda: [
          "AI Diagnostics",
          "Machine Learning in Treatment Planning",
          "Ethical Considerations"
        ],
        speakers: [
          "Prof. Laurent Ekame",
          "Dr. Sarah Ngando"
        ]
      }
    ];

    const sampleStats = {
      totalEvents: 8,
      upcomingEvents: 2,
      pastEvents: 6,
      averageAttendance: 78,
      registrationTrend: [
        { month: 'Jan', registrations: 45 },
        { month: 'Feb', registrations: 68 },
        { month: 'Mar', registrations: 72 },
        { month: 'Apr', registrations: 89 },
        { month: 'May', registrations: 112 },
        { month: 'Jun', registrations: 98 }
      ]
    };

    setEvents(sampleEvents);
    setFilteredEvents(sampleEvents);
    setStats(sampleStats);
  }, []);

  // Filter events based on search and status
  useEffect(() => {
    let results = events;
    
    if (searchTerm) {
      results = results.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      results = results.filter(event => event.status === statusFilter);
    }
    
    setFilteredEvents(results);
  }, [searchTerm, statusFilter, events]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const newId = Math.max(...events.map(e => e.id)) + 1;
    const eventToAdd = {
      ...newEvent,
      id: newId,
      registered: 0
    };
    
    setEvents([...events, eventToAdd]);
    setNewEvent({
      title: '',
      date: '',
      location: '',
      description: '',
      status: 'upcoming',
      capacity: 100,
      registered: 0
    });
    setShowAddEventModal(false);
  };

  const toggleEventExpand = (id) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    
    switch(status) {
      case 'upcoming':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Upcoming</span>;
      case 'completed':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Completed</span>;
      case 'cancelled':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Cancelled</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>Unknown</span>;
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Events Management</h1>
            <p className="text-gray-600">Manage all events, registrations, and analytics</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button 
              onClick={() => setShowStatsModal(true)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <BarChart2 className="mr-2 h-4 w-4" />
              View Stats
            </button>
            <button 
              onClick={() => setShowAddEventModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 rounded-lg shadow-sm text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <label htmlFor="status-filter" className="mr-2 text-sm font-medium text-gray-700">Status:</label>
                <select
                  id="status-filter"
                  className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <React.Fragment key={event.id}>
                      <tr 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => toggleEventExpand(event.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{event.title}</div>
                              <div className="text-sm text-gray-500 line-clamp-1">{event.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(event.date)}</div>
                          {event.endDate && (
                            <div className="text-sm text-gray-500">to {formatDate(event.endDate)}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{event.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(event.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full mr-2">
                              <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                  <div>
                                    <span className="text-xs font-semibold inline-block text-blue-600">
                                      {Math.round((event.registered / event.capacity) * 100)}%
                                    </span>
                                  </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                  <div
                                    style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              {event.registered}/{event.capacity}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteEvent(event.id);
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedEvent(expandedEvent === event.id ? null : event.id);
                              }}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              {expandedEvent === event.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedEvent === event.id && (
                        <tr className="bg-gray-50">
                          <td colSpan="6" className="px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-2">Event Details</h3>
                                <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                  <Clock className="mr-2 h-4 w-4" />
                                  <span>{formatDate(event.date)} {event.endDate && `to ${formatDate(event.endDate)}`}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Users className="mr-2 h-4 w-4" />
                                  <span>{event.registered} registered ({event.capacity} capacity)</span>
                                </div>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-2">Agenda</h3>
                                <ul className="space-y-2">
                                  {event.agenda.map((item, index) => (
                                    <li key={index} className="flex items-start text-sm text-gray-600">
                                      <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-2">Speakers</h3>
                                <ul className="space-y-2">
                                  {event.speakers.map((speaker, index) => (
                                    <li key={index} className="text-sm text-gray-600">
                                      {speaker}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="mt-4 flex space-x-3">
                              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                View Registrations
                              </button>
                              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Send Notification
                              </button>
                              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <Download className="mr-2 h-4 w-4" />
                                Export Data
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No events found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Event Modal */}
        {showAddEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Add New Event</h2>
                  <button 
                    onClick={() => setShowAddEventModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={handleAddEvent}>
                  <div className="grid grid-cols-1 gap-6 mb-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Event Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={newEvent.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Digital Healthcare Innovation Hub"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date *
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          required
                          value={newEvent.date}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                          End Date (optional)
                        </label>
                        <input
                          type="date"
                          id="endDate"
                          name="endDate"
                          value={newEvent.endDate}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location *
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        value={newEvent.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="TKC Yaoundé, Cameroon"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows="3"
                        required
                        value={newEvent.description}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Join healthcare professionals, startups, and tech experts to explore the future of digital healthcare in Africa."
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                          Status *
                        </label>
                        <select
                          id="status"
                          name="status"
                          required
                          value={newEvent.status}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="upcoming">Upcoming</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                          Capacity *
                        </label>
                        <input
                          type="number"
                          id="capacity"
                          name="capacity"
                          required
                          min="1"
                          value={newEvent.capacity}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="300"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowAddEventModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Create Event
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {/* Statistics Modal */}
        {showStatsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Events Statistics</h2>
                  <button 
                    onClick={() => setShowStatsModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Events</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalEvents}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Upcoming Events</h3>
                    <p className="text-3xl font-bold text-blue-600">{stats.upcomingEvents}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Past Events</h3>
                    <p className="text-3xl font-bold text-green-600">{stats.pastEvents}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Avg. Attendance</h3>
                    <p className="text-3xl font-bold text-indigo-600">{stats.averageAttendance}%</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Registration Trend</h3>
                  <div className="h-64">
                    {/* In a real app, this would be a chart from a library like Chart.js */}
                    <div className="flex items-end h-48 space-x-2">
                      {stats.registrationTrend.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                            style={{ height: `${(item.registrations / 120) * 100}%` }}
                          ></div>
                          <span className="text-xs text-gray-500 mt-1">{item.month}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
                      <span className="text-sm text-gray-500">Jan</span>
                      <span className="text-sm text-gray-500">Jun</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Most Popular Events</h3>
                    <ul className="space-y-4">
                      {events
                        .sort((a, b) => b.registered - a.registered)
                        .slice(0, 3)
                        .map((event) => (
                          <li key={event.id} className="flex items-start">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                              <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{event.title}</p>
                              <p className="text-sm text-gray-500">{event.registered} registrations</p>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Prediction</h3>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Users className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Next Event</p>
                        <p className="text-lg font-medium text-gray-900">Digital Healthcare Innovation Hub</p>
                        <p className="text-sm text-gray-500">
                          Predicted attendance: <span className="font-medium text-indigo-600">85-95%</span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                              High Demand
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-indigo-600">
                              92% predicted
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                          <div
                            style={{ width: '92%' }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowStatsModal(false)}
                    className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEvents;