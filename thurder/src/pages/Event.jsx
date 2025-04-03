import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {  FaArrowRight, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers, FaChalkboardTeacher, FaHeartbeat, 
  FaBrain, FaMobileAlt, FaHandshake, FaCheck, FaTimes, FaStar, FaQuoteLeft, 
  FaEnvelope
} from 'react-icons/fa';
import Button from '../components/common/Button'; // Adjust the path as needed


const Event = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    profession: '',
    dietary: '',
    experience: '',
    expectations: '',
    hearAbout: '',
    workshop: 'none'
  });
  const [formErrors, setFormErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');


  useEffect(() => {
    if (window.location.hash === '#register') {
      setShowRegistrationModal(true);
      // Remove the hash from URL
      window.history.pushState(null, null, ' ');
    }
  }, []);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationForm({
      ...registrationForm,
      [name]: value
    });
    
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!registrationForm.fullName.trim()) errors.fullName = 'Full name is required';
    if (!registrationForm.email.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(registrationForm.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }
    if (!registrationForm.phone.trim()) errors.phone = 'Phone number is required';
    if (!registrationForm.profession.trim()) errors.profession = 'Profession is required';
    
    return errors;
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setTimeout(() => {
      setRegistrationSuccess(true);
      setRegistrationForm({
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        profession: '',
        dietary: '',
        experience: '',
        expectations: '',
        hearAbout: '',
        workshop: 'none'
      });
    }, 1000);
  };

  const closeModal = () => {
    setShowRegistrationModal(false);
    setRegistrationSuccess(false);
    setFormErrors({});
  };

  const upcomingEvent = {
    title: "Digital Healthcare Innovation Hub",
    date: "July 15-17, 2025",
    location: "TKC Yaoundé, Cameroon",
    description: "Join healthcare professionals, startups, and tech experts to explore the future of digital healthcare in Africa. This three-day event will feature expert speakers, networking opportunities, innovation showcases, hands-on workshops, and a pitch competition with funding opportunities.",
    agenda: [
      {
        day: "Day 1 - July 15",
        theme: "Digital Healthcare Landscape",
        sessions: [
          { time: "08:00 - 09:00", title: "Registration and Welcome Coffee" },
          { time: "09:00 - 10:00", title: "Opening Ceremony" },
          { time: "10:00 - 11:30", title: "Keynote: The Future of Healthcare in Africa" },
          { time: "11:30 - 13:00", title: "Panel Discussion: Challenges and Opportunities in Digital Health" },
          { time: "13:00 - 14:00", title: "Networking Lunch" },
          { time: "14:00 - 16:00", title: "Technology Showcase and Demonstrations" },
          { time: "16:00 - 17:30", title: "Breakout Sessions: Regional Healthcare Needs" },
          { time: "17:30 - 19:00", title: "Welcome Reception and Networking" }
        ]
      },
      {
        day: "Day 2 - July 16",
        theme: "Innovation and Implementation",
        sessions: [
          { time: "08:30 - 09:00", title: "Morning Coffee" },
          { time: "09:00 - 10:30", title: "Keynote: Successful Digital Health Implementations" },
          { time: "10:30 - 12:30", title: "Workshop Sessions (Mobile Health, VR/AR in Medicine, AI Diagnostics)" },
          { time: "12:30 - 13:30", title: "Lunch" },
          { time: "13:30 - 15:00", title: "Innovation Pitch Competition (Round 1)" },
          { time: "15:00 - 16:30", title: "Panel: Funding Healthcare Innovation in Africa" },
          { time: "16:30 - 18:00", title: "Collaborative Problem-Solving Sessions" },
          { time: "19:00 - 21:00", title: "Gala Dinner (Optional - Additional Registration)" }
        ]
      },
      {
        day: "Day 3 - July 17",
        theme: "Future Directions and Collaborative Action",
        sessions: [
          { time: "08:30 - 09:00", title: "Morning Coffee" },
          { time: "09:00 - 10:30", title: "Keynote: Building Sustainable Healthcare Solutions" },
          { time: "10:30 - 12:00", title: "Innovation Pitch Competition (Finals)" },
          { time: "12:00 - 13:00", title: "Lunch" },
          { time: "13:00 - 14:30", title: "Workshop: Creating Collaborative Healthcare Ecosystems" },
          { time: "14:30 - 16:00", title: "Panel: The Next Decade of Healthcare Innovation" },
          { time: "16:00 - 17:00", title: "Award Ceremony and Closing Remarks" },
          { time: "17:00 - 18:30", title: "Farewell Networking Reception" }
        ]
      }
    ],
    speakers: [
      { name: "Dr. Emmanuelle Nkouyo", role: "Founder & CEO, Thunder Technology", topic: "Digital Healthcare Transformation in Cameroon" },
      { name: "Prof. Samuel Eto'o", role: "Director of Digital Health, University of Yaoundé", topic: "Medical Education in the Digital Age" },
      { name: "Dr. Aisha Mwangi", role: "Health Innovation Lead, African Development Bank", topic: "Funding Healthcare Innovation" },
      { name: "Marcel Tamba", role: "CTO, Thunder Technology", topic: "Technical Implementation of Healthcare Solutions" },
      { name: "Dr. François Ngannou", role: "Chief Digital Officer, Central Hospital", topic: "Hospital Digitalization Success Stories" },
      { name: "Sarah Ngando", role: "Head of Operations, Thunder Technology", topic: "Operational Excellence in Healthcare Innovation" }
    ],
    workshops: [
      { title: "Mobile Health Applications Development", facilitator: "Marcel Tamba, CTO", capacity: 25 },
      { title: "VR/AR in Medical Training", facilitator: "Dr. Josephine Mbarga, Medical VR Specialist", capacity: 20 },
      { title: "AI for Medical Diagnostics", facilitator: "Prof. Laurent Ekame, AI Researcher", capacity: 25 },
      { title: "Telehealth Implementation Strategies", facilitator: "Sarah Ngando, Head of Operations", capacity: 30 }
    ]
  };

  const pastEvents = [
    {
      id: 1,
      title: "Healthcare Digitalization Conference",
      date: "May 10-11, 2024",
      location: "Yaoundé, Cameroon",
      image: "/assets/avarta/avarta1 (1).png",
      description: "A two-day conference focused on healthcare digitalization strategies and implementation challenges in Central Africa. The event brought together healthcare administrators, technology providers, and policy makers.",
      stats: {
        participants: 215,
        speakers: 12,
        countries: 8,
        satisfaction: 92
      },
      highlights: [
        "Launch of the Central African Digital Health Alliance",
        "Showcase of 8 innovative healthcare startups",
        "Publication of the 'Digital Health Roadmap for Cameroon' report",
        "Partnership agreements signed between 3 hospitals and technology providers"
      ],
      testimonials: [
        {
          quote: "This conference provided practical insights into healthcare digitalization that we're already implementing at our hospital.",
          author: "Dr. Jean Tsanga",
          role: "Medical Director, Regional Hospital Bertoua"
        },
        {
          quote: "The networking opportunities were invaluable. We've established partnerships that will help advance digital health across the region.",
          author: "Marie Nguele",
          role: "Health Policy Advisor, Ministry of Health"
        }
      ]
    },
    {
      id: 2,
      title: "Medical Technology Workshop Series",
      date: "October 5-7, 2024",
      location: "Douala, Cameroon",
      image: "/assets/images/3.jpeg",
      description: "A series of hands-on workshops designed to help healthcare professionals adopt and effectively use new medical technologies in their practice. The workshops covered telehealth systems, electronic medical records, and diagnostic technologies.",
      stats: {
        participants: 150,
        workshops: 6,
        institutions: 24,
        satisfaction: 96
      },
      highlights: [
        "Hands-on training for 150 healthcare professionals",
        "Distribution of implementation toolkits to 24 healthcare facilities",
        "Live demonstration of telehealth consultations with remote specialists",
        "Certification program for digital health champions"
      ],
      testimonials: [
        {
          quote: "The practical nature of these workshops made all the difference. Our staff now feel confident implementing these technologies.",
          author: "Dr. Esther Mbatchou",
          role: "Chief Nurse, Laquintinie Hospital"
        },
        {
          quote: "I appreciated the focus on technologies that are actually feasible in our resource-constrained settings. Very relevant training.",
          author: "Dr. Paul Ntamack",
          role: "Physician, St. Martin Catholic Hospital"
        }
      ]
    }
  ];

  return (
    <div className="relative overflow-hidden bg-white">
    {/* Add the Button component here */}
    <Button />
          {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeIn}
        className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 md:py-32"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-blue-800 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span 
              variants={fadeIn}
              className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4"
            >
              Healthcare Innovation
            </motion.span>
            <motion.h1 
              variants={fadeIn}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Digital Healthcare Innovation Hub
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              className="text-lg md:text-xl mb-8 text-blue-100"
            >
              Join us for transformative events that bring together healthcare professionals, technologists, 
              and innovators to shape the future of healthcare in Africa
            </motion.p>
            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button 
                onClick={() => setShowRegistrationModal(true)} 
                className="bg-white text-blue-800 hover:bg-blue-50 transition duration-300 font-semibold rounded-lg px-6 py-3 flex items-center justify-center"
              >
                <span>Register for July 2025 Event</span>
                <FaArrowRight className="ml-2" />
              </button>
              <a 
                href="#past-events" 
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 transition duration-300 text-white font-semibold rounded-lg px-6 py-3 flex items-center justify-center"
              >
                View Past Events
              </a>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#ffffff">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </motion.section>

      {/* Event Navigation Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
            <button 
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 font-medium rounded-lg transition duration-300 ${
                activeTab === 'upcoming' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Upcoming Events
            </button>
            <button 
              onClick={() => setActiveTab('past')}
              className={`px-6 py-3 font-medium rounded-lg transition duration-300 ${
                activeTab === 'past' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Event Details Section */}
      {activeTab === 'upcoming' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          {/* Main Event Information */}
          <motion.section variants={fadeIn} className="py-16 bg-white">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
                    Upcoming Event
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{upcomingEvent.title}</h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-blue-600 mr-3 text-xl" />
                      <span className="text-lg text-gray-700">{upcomingEvent.date}</span>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-blue-600 mr-3 text-xl" />
                      <span className="text-lg text-gray-700">{upcomingEvent.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-8">{upcomingEvent.description}</p>
                  <button 
                    onClick={() => setShowRegistrationModal(true)} 
                    className="bg-blue-600 hover:bg-blue-700 text-white transition duration-300 font-semibold rounded-lg px-6 py-3 flex items-center"
                  >
                    <span>Register Now</span>
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src="/assets/logo/LOGO DHIH CAMEROUN Plan de travail 1.png" 
                    alt="Healthcare Innovation Hub" 
                    className="w-full h-auto rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex flex-wrap gap-3">
                      <span className="bg-white bg-opacity-90 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        <FaUsers className="inline mr-1" /> 300+ Attendees
                      </span>
                      <span className="bg-white bg-opacity-90 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        <FaChalkboardTeacher className="inline mr-1" /> 20+ Speakers
                      </span>
                      <span className="bg-white bg-opacity-90 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        <FaHandshake className="inline mr-1" /> Networking
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Event Themes and Topics */}
          <motion.section variants={fadeIn} className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
                  Event Focus
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Themes and Topics</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <FaHeartbeat className="text-blue-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-3">Digital Health Solutions</h3>
                  <p className="text-gray-600 text-center">Exploring innovative digital tools and platforms transforming healthcare delivery and patient experience.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <FaBrain className="text-blue-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-3">AI in Healthcare</h3>
                  <p className="text-gray-600 text-center">Leveraging artificial intelligence and machine learning to improve diagnostics, treatment, and healthcare management.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <FaMobileAlt className="text-blue-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-3">Mobile Health</h3>
                  <p className="text-gray-600 text-center">Creating and implementing mobile solutions to extend healthcare access to underserved populations.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <FaHandshake className="text-blue-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-3">Cross-Sector Collaboration</h3>
                  <p className="text-gray-600 text-center">Building effective partnerships between healthcare providers, tech companies, and government agencies.</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Event Agenda */}
          <motion.section variants={fadeIn} className="py-16 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
                  Program
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Event Agenda</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Three days of inspiring keynotes, interactive workshops, and collaborative sessions
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {upcomingEvent.agenda.map((day, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100">
                    <div className="bg-blue-600 text-white p-4 rounded-t-xl">
                      <h3 className="text-xl font-bold">{day.day}</h3>
                      <p className="text-blue-100">{day.theme}</p>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-4">
                        {day.sessions.map((session, idx) => (
                          <li key={idx} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                            <div className="flex items-start">
                              <div className="bg-blue-100 text-blue-800 rounded px-2 py-1 text-sm font-medium min-w-24 text-center">
                                {session.time}
                              </div>
                              <div className="ml-4">
                                <span className="text-gray-900 font-medium">{session.title}</span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Speakers Section */}
          <motion.section variants={fadeIn} className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
                  Featured Speakers
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Experts</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Learn from thought leaders and innovators in healthcare and technology
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvent.speakers.map((speaker, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="h-48 bg-blue-100">
                      <img 
                        src="/assets/avarta/avarta1 (1).png" 
                        alt={speaker.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{speaker.name}</h3>
                      <p className="text-blue-600 font-medium mb-3">{speaker.role}</p>
                      <p className="text-gray-600 mb-4">Speaking on: <span className="font-medium">{speaker.topic}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Workshops Section */}
          <motion.section variants={fadeIn} className="py-16 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
                  Interactive Sessions
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Hands-On Workshops</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Gain practical skills and knowledge in small, focused workshop sessions
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {upcomingEvent.workshops.map((workshop, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{workshop.title}</h3>
                    <div className="mb-4">
                      <span className="text-blue-800 font-medium">Facilitated by: </span>
                      <span className="text-gray-700">{workshop.facilitator}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium">
                        Limited to {workshop.capacity} participants
                      </span>
                      <button 
                        onClick={() => {
                          setRegistrationForm({...registrationForm, workshop: workshop.title});
                          setShowRegistrationModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Reserve a spot
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section variants={fadeIn} className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to be part of African healthcare innovation?</h2>
                <p className="text-lg text-blue-100 mb-8">
                  Join us for three days of learning, networking, and collaboration that will shape the future of healthcare across the continent
                </p>
                <button 
                  onClick={() => setShowRegistrationModal(true)} 
                  className="bg-white text-blue-800 hover:bg-blue-50 transition duration-300 font-semibold rounded-lg px-8 py-4 text-lg"
                >
                  Register Now
                </button>
                <p className="mt-4 text-blue-200">
                  <FaCalendarAlt className="inline-block mr-2" />
                  July 15-17, 2025 • TKC Yaoundé, Cameroon
                </p>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}

      {/* Past Events Section */}
      {activeTab === 'past' && (
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          id="past-events"
          className="py-16 bg-white"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
                Our Impact
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Past Events</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See how our previous events have made an impact in the healthcare innovation space
              </p>
            </div>

            <div className="grid grid-cols-1 gap-16">
              {pastEvents.map((event, index) => (
                <motion.div 
                  key={event.id}
                  variants={fadeIn}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                          <div className="flex items-center text-gray-600 mb-4">
                            <FaCalendarAlt className="mr-2 text-blue-600" />
                            <span className="mr-4">{event.date}</span>
                            <FaMapMarkerAlt className="mr-2 text-blue-600" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {event.stats.satisfaction}% Satisfaction
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6">{event.description}</p>
                      
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Event Highlights</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {event.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start">
                              <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                              <span className="text-gray-700">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600">{event.stats.participants}</div>
                          <div className="text-sm text-gray-600">Participants</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600">{event.stats.speakers || event.stats.workshops}</div>
                          <div className="text-sm text-gray-600">{event.stats.speakers ? 'Speakers' : 'Workshops'}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600">{event.stats.countries || event.stats.institutions}</div>
                          <div className="text-sm text-gray-600">{event.stats.countries ? 'Countries' : 'Institutions'}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600">{event.stats.satisfaction}%</div>
                          <div className="text-sm text-gray-600">Satisfaction</div>
                        </div>
                      </div>
                      
                      {event.testimonials && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">What Participants Said</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {event.testimonials.map((testimonial, idx) => (
                              <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-start mb-3">
                                  <FaQuoteLeft className="text-blue-200 text-xl mr-2 mt-1" />
                                  <p className="text-gray-700 italic">{testimonial.quote}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {!registrationSuccess ? (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Register for {upcomingEvent.title}</h3>
                  <button 
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>
                
                <form onSubmit={handleRegistrationSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="fullName">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={registrationForm.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${formErrors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="John Doe"
                      />
                      {formErrors.fullName && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.fullName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={registrationForm.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="john@example.com"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={registrationForm.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="+237 6XX XXX XXX"
                      />
                      {formErrors.phone && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="profession">
                        Profession <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="profession"
                        name="profession"
                        value={registrationForm.profession}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${formErrors.profession ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g. Doctor, Developer, Student"
                      />
                      {formErrors.profession && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.profession}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="organization">
                        Organization/Institution
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={registrationForm.organization}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="Company or University"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="workshop">
                        Workshop Preference
                      </label>
                      <select
                        id="workshop"
                        name="workshop"
                        value={registrationForm.workshop}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      >
                        <option value="none">No workshop preference</option>
                        {upcomingEvent.workshops.map((workshop, index) => (
                          <option key={index} value={workshop.title}>{workshop.title}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="dietary">
                        Dietary Requirements
                      </label>
                      <input
                        type="text"
                        id="dietary"
                        name="dietary"
                        value={registrationForm.dietary}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="Any allergies or dietary restrictions?"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="experience">
                        Your Experience in Digital Healthcare
                      </label>
                      <textarea
                        id="experience"
                        name="experience"
                        value={registrationForm.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        rows="3"
                        placeholder="Briefly describe your background and experience in digital healthcare"
                      ></textarea>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="expectations">
                        What do you hope to gain from this event?
                      </label>
                      <textarea
                        id="expectations"
                        name="expectations"
                        value={registrationForm.expectations}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        rows="3"
                        placeholder="Your goals and expectations"
                      ></textarea>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="hearAbout">
                        How did you hear about this event?
                      </label>
                      <select
                        id="hearAbout"
                        name="hearAbout"
                        value={registrationForm.hearAbout}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      >
                        <option value="">Select an option</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Email">Email</option>
                        <option value="Colleague/Friend">Colleague/Friend</option>
                        <option value="Website">Website</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      required
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                      I agree to the event <a href="#" className="text-blue-600 hover:underline">terms and conditions</a> and 
                      <a href="#" className="text-blue-600 hover:underline"> privacy policy</a>
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                  >
                    Complete Registration
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="flex justify-end mb-4">
                  <button 
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>
                
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                  <FaCheck className="h-8 w-8 text-green-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for registering for {upcomingEvent.title}. We've sent a confirmation email with event details to {registrationForm.email}.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
                  <h4 className="font-semibold text-gray-900 mb-2">Next Steps:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <FaEnvelope className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Check your email for confirmation and payment details (if applicable)</span>
                    </li>
                    <li className="flex items-start">
                      <FaCalendarAlt className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Add the event dates to your calendar</span>
                    </li>
                    <li className="flex items-start">
                      <FaUsers className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Join our community platform to connect with other attendees</span>
                    </li>
                  </ul>
                </div>
                
                <button
                  onClick={closeModal}
                  className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
        
      )}
      
    </div>
  );
};

export default Event;