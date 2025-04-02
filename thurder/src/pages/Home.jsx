import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt, FaUsers, FaLaptopMedical, FaVrCardboard, FaMapMarkerAlt, FaPhone, FaEnvelope,
     FaFacebook, FaTwitter, FaLinkedin, FaInstagram,FaCheck
} from 'react-icons/fa';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button'; // Adjust the path as needed


const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [policyType, setPolicyType] = useState('terms'); // 'terms', 'privacy', or 'partnership'
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Scroll to top when component mounts
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

  const openPolicy = (type) => {
    setPolicyType(type);
    setShowPolicy(true);
    document.body.style.overflow = 'hidden';
  };

  const closePolicy = () => {
    setShowPolicy(false);
    document.body.style.overflow = 'auto';
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    // Simulate subscription process
    setTimeout(() => {
      setSubscribed(true);
      setEmail('');
    }, 1000);
  };

  // Services data
  const services = [
    {
      id: 1,
      title: "Mobile & Web Apps",
      description: "Custom healthcare applications for appointment booking, telehealth, patient record management, and medical data analysis. We build secure, compliant, and user-friendly solutions.",
      icon: <FaLaptopMedical className="text-4xl text-blue-500 mb-4" />
    },
    {
      id: 2,
      title: "VR/AR Solutions",
      description: "Innovative virtual and augmented reality tools for medical training, therapy, rehabilitation programs, and medical data visualization to improve treatment outcomes and patient care.",
      icon: <FaVrCardboard className="text-4xl text-blue-500 mb-4" />
    },
    {
      id: 3,
      title: "Technology Promotion",
      description: "Specialized workshops, training sessions, and awareness campaigns designed to help healthcare professionals adapt to and maximize the benefits of new medical technologies.",
      icon: <FaUsers className="text-4xl text-blue-500 mb-4" />
    }
  ];

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Emmanuelle Nkouyo",
      position: "Founder & CEO",
      bio: "Healthcare innovation expert with 10+ years of experience in digital health solutions."
    },
    {
      id: 2,
      name: "Marcel Tamba",
      position: "CTO",
      bio: "Technology leader specializing in medical software development and data security."
    },
    {
      id: 3,
      name: "Sarah Ngando",
      position: "Head of Operations",
      bio: "Operations specialist with expertise in healthcare project management and implementation."
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      text: "Thunder Technology has revolutionized our patient management system, improving our efficiency by over 40%.",
      author: "Dr. Ngono Francis",
      role: "Medical Director, Central Hospital"
    },
    {
      id: 2,
      text: "The VR training platform developed by Thunder Technology has transformed how we train our medical students.",
      author: "Prof. Ayuk Josephine",
      role: "Dean, Medical Faculty"
    }
  ];

  // Policies content
  const policyContent = {
    terms: {
      title: "Terms of Service",
      content: [
        {
          heading: "1. Acceptance of Terms",
          text: "By accessing or using Thunder Technology services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services."
        },
        {
          heading: "2. Description of Services",
          text: "Thunder Technology provides digital healthcare solutions including mobile applications, web platforms, VR/AR solutions, and technology consultation services as described on our website."
        },
        {
          heading: "3. User Responsibilities",
          text: "Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. You agree to notify Thunder Technology immediately of any unauthorized use of your account."
        },
        {
          heading: "4. Intellectual Property",
          text: "All content, features, and functionality of Thunder Technology services, including but not limited to text, graphics, logos, icons, and software, are the exclusive property of Thunder Technology and are protected by international copyright, trademark, and other intellectual property laws."
        },
        {
          heading: "5. Limitation of Liability",
          text: "Thunder Technology shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the services."
        }
      ]
    },
    privacy: {
      title: "Privacy Policy",
      content: [
        {
          heading: "1. Information Collection",
          text: "We collect personal information that you voluntarily provide to us when you register for our services, express interest in obtaining information about us or our products, or otherwise contact us."
        },
        {
          heading: "2. Use of Information",
          text: "We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent."
        },
        {
          heading: "3. Information Sharing",
          text: "We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations."
        },
        {
          heading: "4. Information Security",
          text: "We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards, no system is completely secure."
        },
        {
          heading: "5. User Rights",
          text: "You have the right to access, correct, update, or request deletion of your personal information. You can object to processing of your personal information, request portability of your personal information, and withdraw your consent."
        }
      ]
    },
    partnership: {
      title: "Partnership & Collaboration Policy",
      content: [
        {
          heading: "1. Partnership Principles",
          text: "Thunder Technology seeks partnerships based on shared values, mutual benefits, and a commitment to improving healthcare through innovation and technology."
        },
        {
          heading: "2. Collaboration Types",
          text: "We engage in strategic partnerships, technology collaborations, research partnerships, distribution arrangements, and investment opportunities that align with our mission."
        },
        {
          heading: "3. Partner Selection Criteria",
          text: "We select partners based on their reputation, complementary expertise, financial stability, cultural fit, and commitment to healthcare improvement."
        },
        {
          heading: "4. Intellectual Property",
          text: "All partnerships include clear agreements on intellectual property rights, including ownership, licensing, and usage rights for all created or shared technology and content."
        },
        {
          heading: "5. Conflict Resolution",
          text: "We are committed to resolving any partnership disputes through open communication, mediation, and fair conflict resolution procedures as outlined in our partnership agreements."
        }
      ]
    }
  };

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
            {/* Background pattern */}
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
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <motion.h1 
                variants={fadeIn}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                Transforming Healthcare Through Technology
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-lg md:text-xl mb-8 text-blue-100"
              >
                Thunder Technology is pioneering innovative digital solutions to improve healthcare access and efficiency across Cameroon and beyond. Based in Yaoundé, we're committed to advancing patient care through cutting-edge technology.
              </motion.p>
              <motion.div 
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/event" className="bg-white text-blue-800 hover:bg-blue-50 transition duration-300 font-semibold rounded-lg px-6 py-3 flex items-center justify-center">
                  <span>Healthcare Innovation Hub</span>
                  <FaArrowRight className="ml-2" />
                </Link>
                <Link to="/services" className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 transition duration-300 text-white font-semibold rounded-lg px-6 py-3 flex items-center justify-center">
                  Our Services
                </Link>
              </motion.div>
            </div>
            <motion.div 
              variants={fadeIn}
              className="mt-12 md:mt-0 md:w-1/2"
            >
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Healthcare Technology" 
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900 to-transparent p-4">
                  <p className="text-white font-medium">Innovative healthcare solutions for Cameroon's healthcare challenges</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#ffffff">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </motion.section>

      {/* Event Promotion Section */}
      <motion.section 
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={staggerChildren}
        className="py-16 md:py-24 bg-white"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
              Upcoming Event
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Digital Healthcare Innovation Hub</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join healthcare professionals, startups, and tech experts in Yaoundé to explore the future of digital healthcare in Africa
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl overflow-hidden shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="flex items-center mb-6">
                  <FaCalendarAlt className="text-blue-600 mr-3 text-xl" />
                  <span className="text-lg font-semibold text-gray-700">July 15-17, 2025 • TKC Yaoundé</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Transform Healthcare with Innovation</h3>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start">
                    <span className="bg-blue-500 rounded-full p-1 text-white mr-3 mt-1">✓</span>
                    <span>Expert speakers from across Africa and Europe</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 rounded-full p-1 text-white mr-3 mt-1">✓</span>
                    <span>Networking with healthcare innovators and investors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 rounded-full p-1 text-white mr-3 mt-1">✓</span>
                    <span>Innovation showcases and technology demonstrations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 rounded-full p-1 text-white mr-3 mt-1">✓</span>
                    <span>Hands-on workshops and collaborative sessions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 rounded-full p-1 text-white mr-3 mt-1">✓</span>
                    <span>Pitch competition with funding opportunities</span>
                  </li>
                </ul>
                <Link to="/event/registration" className="inline-block bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold rounded-lg px-6 py-3">
                  Register Now
                </Link>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="/api/placeholder/600/500" 
                  alt="Digital Healthcare Innovation Hub" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={staggerChildren}
        className="py-16 md:py-24 bg-gray-50"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
              Our Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Healthcare Technology Solutions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We specialize in creating innovative digital solutions tailored for African healthcare challenges to transform care delivery and improve patient outcomes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeIn}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="flex items-center justify-center h-16">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{service.title}</h3>
                <p className="text-gray-600 mb-6 text-center flex-grow">{service.description}</p>
                <Link to={`/services#${service.id}`} className="mt-auto text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center">
                  Learn More <FaArrowRight className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={staggerChildren}
        className="py-16 md:py-24 bg-white"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet the Innovators</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our diverse team of healthcare and technology experts is dedicated to transforming healthcare across Africa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={fadeIn}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <div className="h-56 bg-blue-100">
                  <img 
                    src={`/api/placeholder/400/${300 + member.id * 10}`} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-16 md:py-24 bg-gray-50"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={fadeIn}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section 
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeIn}
        className="bg-blue-900 text-white py-16"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">3+</div>
              <div className="text-blue-200">Years Experience</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-blue-200">Projects Completed</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">12+</div>
              <div className="text-blue-200">Healthcare Partners</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-blue-200">Patients Served</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Animated Contact Section */}
      <motion.section 
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={staggerChildren}
        className="py-16 md:py-24 bg-white"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about our services or interested in collaboration? Reach out to our team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <form>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholder="What's this about?"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            <motion.div variants={fadeIn} className="space-y-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Our Location</h3>
                    <p className="text-gray-700">TKC District, Yaoundé, Cameroon</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaPhone className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-700">+237 675 123 456</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaEnvelope className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-700">contact@thundertech.cm</p>
                  </div>
                </div>
              </div>
                
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="https://facebook.com" className="bg-blue-100 hover:bg-blue-200 transition duration-300 p-3 rounded-full" target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="text-blue-600 text-xl" />
                  </a>
                  <a href="https://twitter.com" className="bg-blue-100 hover:bg-blue-200 transition duration-300 p-3 rounded-full" target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="text-blue-600 text-xl" />
                  </a>
                  <a href="https://linkedin.com" className="bg-blue-100 hover:bg-blue-200 transition duration-300 p-3 rounded-full" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-blue-600 text-xl" />
                  </a>
                  <a href="https://instagram.com" className="bg-blue-100 hover:bg-blue-200 transition duration-300 p-3 rounded-full" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-blue-600 text-xl" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section 
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with Healthcare Innovation</h3>
            <p className="text-blue-100 mb-8">Subscribe to our newsletter for the latest updates on healthcare technology advancements, events, and insights</p>
            
            {subscribed ? (
              <div className="bg-blue-800 rounded-lg p-6 inline-flex items-center">
                <FaCheck className="text-green-400 mr-3 text-xl" />
                <span>Thank you for subscribing to our newsletter!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow">
                  <input 
                    type="email" 
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 focus:ring focus:ring-blue-200" 
                    placeholder="Your email address"
                  />
                  {emailError && <p className="mt-2 text-red-300 text-sm">{emailError}</p>}
                </div>
                <button 
                  type="submit"
                  className="bg-white text-blue-800 hover:bg-blue-50 transition duration-300 font-semibold rounded-lg px-6 py-3 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer openPolicy={openPolicy} />

      {/* Policy Modals */}
      {showPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{policyContent[policyType].title}</h2>
              <button 
                onClick={closePolicy}
                className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-6">
              {policyContent[policyType].content.map((section, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{section.heading}</h3>
                  <p className="text-gray-700">{section.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;