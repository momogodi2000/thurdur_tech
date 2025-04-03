import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaLaptopMedical, FaVrCardboard, FaUsers, FaHandshake, FaChartLine, FaCode, FaMobileAlt, 
  FaBrain, FaHospital, FaGraduationCap, FaCheckCircle,FaStethoscope, FaUserMd, FaRegLightbulb,FaRegComments
} from 'react-icons/fa';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button'; // Adjust the path as needed


const Services = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [selectedService, setSelectedService] = useState(null);
    const [showPolicy, setShowPolicy] = useState(false);
    const [policyType, setPolicyType] = useState('terms'); // 'terms', 'privacy', or 'partnership'
  
    // Policy modal functions
    const openPolicy = (type) => {
      setPolicyType(type);
      setShowPolicy(true);
      document.body.style.overflow = 'hidden';
    };
  
    const closePolicy = () => {
      setShowPolicy(false);
      document.body.style.overflow = 'auto';
    };
  
  useEffect(() => {
    setIsVisible(true);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Check if there's a hash in the URL to scroll to specific section
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, []);

  // Animation variants
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
  
  // Services data
  const services = [
    {
      id: "mobile-web",
      category: "applications",
      title: "Mobile & Web Applications",
      shortDesc: "Custom healthcare applications for appointment booking, telehealth, patient record management, and medical data analysis.",
      icon: <FaLaptopMedical className="text-4xl text-blue-500 mb-4" />,
      description: "Our specialized team develops secure, compliant, and user-friendly digital solutions tailored to healthcare needs across Africa. We focus on creating applications that solve real problems in the African healthcare context.",
      features: [
        {
          title: "Patient Management Systems",
          desc: "Secure platforms for tracking patient visits, medical history, treatment plans, and follow-ups that work effectively even in low-bandwidth environments.",
          icon: <FaUserMd />
        },
        {
          title: "Telemedicine Platforms",
          desc: "Connect patients with healthcare providers remotely through secure video consultations, messaging, and medical data sharing to overcome geographical barriers.",
          icon: <FaStethoscope />
        },
        {
          title: "Health Records Management",
          desc: "Digital solutions for creating and managing electronic health records with strict privacy controls and interoperability with existing systems.",
          icon: <FaHospital />
        },
        {
          title: "Healthcare Data Analytics",
          desc: "Tools for collecting, analyzing, and visualizing healthcare data to improve clinical decision-making and resource allocation.",
          icon: <FaChartLine />
        }
      ],
      caseStudy: {
        title: "Central Hospital Appointment System",
        description: "We developed a bilingual mobile application for a major hospital in Yaoundé that reduced patient wait times by 60% and increased appointment adherence by 45%. The system works offline and syncs when connectivity is available, addressing local infrastructure challenges.",
        results: ["60% reduction in wait times", "45% increase in appointment adherence", "87% patient satisfaction rate", "Successful integration with legacy systems"]
      }
    },
    {
      id: "vr-ar",
      category: "immersive",
      title: "VR/AR Solutions",
      shortDesc: "Innovative virtual and augmented reality tools for medical training, therapy, rehabilitation programs, and medical data visualization.",
      icon: <FaVrCardboard className="text-4xl text-blue-500 mb-4" />,
      description: "We harness the power of immersive technologies to transform medical education, patient care, and therapeutic interventions. Our VR/AR solutions are designed to work on accessible hardware and address Africa-specific healthcare challenges.",
      features: [
        {
          title: "Medical Training Simulations",
          desc: "Immersive environments for healthcare professionals to practice procedures and emergency responses without risk to patients.",
          icon: <FaGraduationCap />
        },
        {
          title: "Patient Education Experiences",
          desc: "Interactive AR/VR experiences that help patients understand their conditions and treatment plans through visual demonstrations.",
          icon: <FaRegLightbulb />
        },
        {
          title: "Therapeutic VR Applications",
          desc: "Virtual reality applications for pain management, physical therapy, mental health treatment, and cognitive rehabilitation.",
          icon: <FaBrain />
        },
        {
          title: "Medical Visualization Tools",
          desc: "Advanced visualization of medical imaging and data through augmented reality to assist in diagnosis and surgical planning.",
          icon: <FaMobileAlt />
        }
      ],
      caseStudy: {
        title: "VR Surgical Training Program",
        description: "We created a VR surgical training program for medical students at a leading university, allowing students to practice surgical techniques in a risk-free environment. The program resulted in 40% improved competency scores compared to traditional training methods.",
        results: ["40% improvement in surgical competency scores", "32% reduction in training time", "Successful implementation across 5 medical schools", "Adaptable to low-cost VR headsets for broader accessibility"]
      }
    },
    {
      id: "promotion",
      category: "education",
      title: "Technology Promotion & Education",
      shortDesc: "Specialized workshops, training sessions, and awareness campaigns designed to help healthcare professionals adapt to new medical technologies.",
      icon: <FaUsers className="text-4xl text-blue-500 mb-4" />,
      description: "We bridge the knowledge gap between cutting-edge technology and healthcare practitioners through comprehensive education programs designed for the African context, focusing on practical applications and local challenges.",
      features: [
        {
          title: "Digital Literacy Workshops",
          desc: "Hands-on training sessions that help healthcare professionals build confidence and competence with digital healthcare tools.",
          icon: <FaGraduationCap />
        },
        {
          title: "Technology Adoption Programs",
          desc: "Structured programs that guide healthcare organizations through the implementation and integration of new technologies.",
          icon: <FaRegLightbulb />
        },
        {
          title: "Community Health Tech Education",
          desc: "Initiatives that educate communities about available health technologies and how to access and benefit from digital health services.",
          icon: <FaUsers />
        },
        {
          title: "Health Tech Conference Organization",
          desc: "Planning and execution of conferences, seminars, and events focused on healthcare innovation and technology adoption.",
          icon: <FaRegComments />
        }
      ],
      caseStudy: {
        title: "Rural Telehealth Adoption Program",
        description: "We developed and implemented a comprehensive training program for rural healthcare workers across three provinces in Cameroon, enabling them to effectively use telehealth platforms. The program included context-specific training materials in local languages and ongoing support.",
        results: ["Trained over 200 rural healthcare workers", "Established 15 telehealth centers", "Connected 45 remote villages to specialist care", "Reduced referral travel by 65%"]
      }
    },
    {
      id: "consultation",
      category: "consulting",
      title: "Healthcare Consultation Services",
      shortDesc: "Expert guidance for healthcare organizations on digital transformation, technology integration, and innovation strategy.",
      icon: <FaHandshake className="text-4xl text-blue-500 mb-4" />,
      description: "Our consulting team helps healthcare organizations navigate the complex journey of digital transformation, providing strategic guidance and implementation support tailored to the unique challenges of the African healthcare ecosystem.",
      features: [
        {
          title: "Digital Transformation Strategy",
          desc: "Development of comprehensive roadmaps for healthcare organizations to successfully navigate the transition to digital operations.",
          icon: <FaChartLine />
        },
        {
          title: "Technology Assessment & Selection",
          desc: "Expert evaluation of healthcare technology options and guidance on selecting solutions that best meet organizational needs and constraints.",
          icon: <FaCheckCircle />
        },
        {
          title: "Implementation & Integration Support",
          desc: "Hands-on assistance with deploying new technologies and integrating them with existing systems and workflows.",
          icon: <FaCode />
        },
        {
          title: "Change Management & Training",
          desc: "Structured approaches to managing organizational change and developing staff capabilities to maximize technology adoption.",
          icon: <FaUsers />
        }
      ],
      caseStudy: {
        title: "National Health System Digitization",
        description: "We provided consultation services for a national health ministry's digitization initiative, developing a phased implementation strategy that addressed connectivity challenges, training needs, and budget constraints while ensuring interoperability across systems.",
        results: ["Successful digitization of 35 district hospitals", "Created scalable model for nationwide implementation", "Secured additional international funding", "Developed sustainable local capacity for ongoing management"]
      }
    }
  ];

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

  // Process categories for filtering
  const categories = [
    { id: "all", name: "All Services" },
    { id: "applications", name: "Digital Applications" },
    { id: "immersive", name: "AR/VR Solutions" },
    { id: "education", name: "Education & Training" },
    { id: "consulting", name: "Consultation Services" }
  ];

  // Additional case studies for display in carousel
  const additionalCaseStudies = [
    {
      title: "Maternal Health Monitoring App",
      category: "Mobile Applications",
      description: "A mobile application that enables community health workers to monitor pregnant women in remote areas, providing timely intervention recommendations and connecting to emergency services when needed.",
      results: ["Reduced maternal mortality by 28%", "Increased prenatal visit compliance by 45%", "Successfully deployed in 65 rural communities"]
    },
    {
      title: "Medical Inventory Management System",
      category: "Web Applications",
      description: "An inventory management system for medical supplies that tracks stock levels, predicts shortages, and optimizes procurement processes for healthcare facilities with limited resources.",
      results: ["Reduced stock-outs by 72%", "Decreased procurement costs by 18%", "Implemented in 23 healthcare facilities"]
    },
    {
      title: "AR-Assisted Diagnosis Tool",
      category: "AR/VR Solutions",
      description: "An augmented reality application that assists healthcare workers in remote areas with diagnosis by overlaying diagnostic guidance on patient examination through a tablet or smartphone.",
      results: ["Improved diagnostic accuracy by 34%", "Reduced referral necessity by 28%", "Cost-effective implementation on existing devices"]
    }
  ];

  // Testimonials related to services
  const testimonials = [
    {
      quote: "Thunder Technology transformed our patient management system, making it easier for our staff to provide care even with limited internet connectivity. Their understanding of local challenges was invaluable.",
      author: "Dr. Ngono Francis",
      position: "Medical Director, Central Hospital Yaoundé"
    },
    {
      quote: "The VR training platform developed by Thunder Technology has revolutionized how we prepare our medical students for surgical procedures, providing hands-on experience without risk to patients.",
      author: "Prof. Ayuk Josephine",
      position: "Dean, Faculty of Medicine, University of Yaoundé"
    },
    {
      quote: "Thunder's consultation services guided us through our entire digital transformation journey. Their team understood both the technology and the unique healthcare environment in Cameroon.",
      author: "Dr. Samuel Mbarga",
      position: "CEO, Regional Medical Center"
    }
  ];

  // Partners logos (placeholder data)
  const partners = [
    { name: "Ministry of Health", logo: "/assets/images/Ministry of Health.jpeg" },
    { name: "African Medical Association", logo: "/assets/images/1.png" },
    { name: "IAI Cameroun", logo: "/assets/images/iai.jpeg" },
    { name: "Health Tech Africa", logo: "/assets/images/3.jpeg" },
    { name: "Medical Innovation Fund", logo: "/assets/images/2.png" }
  ];

  // Function to filter services by category
  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(service => service.category === activeTab);

  // Function to handle service detail modal
  const openServiceDetail = (service) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };

  const closeServiceDetail = () => {
    setSelectedService(null);
    document.body.style.overflow = 'auto';
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
          <div className="max-w-3xl">
            <motion.h1 
              variants={fadeIn}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Healthcare Technology Solutions
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              className="text-lg md:text-xl mb-8 text-blue-100"
            >
              We provide innovative digital solutions tailored for African healthcare challenges to transform care delivery and improve patient outcomes across the continent.
            </motion.p>
            <motion.div 
              variants={fadeIn}
              className="flex flex-wrap gap-4"
            >
              <a href="#service-overview" className="bg-white text-blue-800 hover:bg-blue-50 transition duration-300 font-semibold rounded-lg px-6 py-3 flex items-center justify-center">
                Explore Our Services
                <FaArrowRight className="ml-2" />
              </a>
              <Link to="/contact" className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 transition duration-300 text-white font-semibold rounded-lg px-6 py-3 flex items-center justify-center">
                Request Consultation
              </Link>
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

      {/* Our Approach Section */}
      <motion.section 
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={staggerChildren}
        className="py-16 md:py-24 bg-white"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
              Our Approach
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Transforming African Healthcare</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We combine technological innovation with deep understanding of local healthcare challenges to create solutions that truly make a difference in the African context.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-6">
                <FaRegLightbulb className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Context-Specific Innovation</h3>
              <p className="text-gray-600">
                We design solutions specifically for the African healthcare context, accounting for infrastructure limitations, resource constraints, and local needs.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-6">
                <FaUsers className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Human-Centered Design</h3>
              <p className="text-gray-600">
                We put healthcare providers and patients at the center of our design process, ensuring solutions that are intuitive, accessible, and genuinely helpful.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-6">
                <FaHandshake className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Collaborative Implementation</h3>
              <p className="text-gray-600">
                We work closely with healthcare organizations to ensure smooth technology adoption, providing training, support, and change management guidance.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Service Overview Section */}
      <motion.section 
        id="service-overview"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={staggerChildren}
        className="py-16 md:py-24 bg-gray-50"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={fadeIn} className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
              Our Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Healthcare Solutions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From mobile applications to augmented reality, we offer a complete range of digital solutions to address healthcare challenges.
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                  activeTab === category.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeIn}
                id={service.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
              >
                <div className="p-8">
                  <div className="flex items-center justify-center h-16 mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">{service.title}</h3>
                  <p className="text-gray-600 mb-6 text-center">{service.shortDesc}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {service.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="text-blue-500 mt-1 mr-3">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">{feature.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => openServiceDetail(service)}
                    className="w-full mt-auto bg-blue-50 hover:bg-blue-100 text-blue-700 transition duration-300 font-semibold rounded-lg px-6 py-3 flex items-center justify-center"
                  >
                    Learn More
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Case Studies Section */}
      <motion.section 
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={staggerChildren}
        className="py-16 md:py-24 bg-white"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
              Success Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact in Healthcare</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover how our solutions have transformed healthcare operations and improved patient outcomes across Africa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalCaseStudies.map((study, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl overflow-hidden shadow-lg p-8"
              >
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-4">
                  {study.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{study.title}</h3>
                <p className="text-gray-700 mb-6">{study.description}</p>
                
                <h4 className="font-semibold text-gray-900 mb-3">Key Results:</h4>
                <ul className="space-y-2">
                  {study.results.map((result, idx) => (
                    <li key={idx} className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{result}</span>
                    </li>
                  ))}
                </ul>
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
              Client Feedback
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white p-8 rounded-xl shadow-lg relative"
              >
                <div className="text-blue-500 mb-6">
                  <svg className="w-12 h-12 opacity-20 absolute top-6 left-6" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zM10 26c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"></path>
                    <path d="M22 8c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zM22 26c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"></path>
                  </svg>
                </div>
                
                <p className="text-gray-700 italic mb-6 relative z-10">"{testimonial.quote}"</p>
                
                <div>
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Partners Section */}
      <motion.section 
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-16 md:py-20 bg-white"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
              Our Partners
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Trusted by Healthcare Leaders</h2>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-12 md:max-h-16"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-16 md:py-24 bg-gradient-to-r from-blue-700 to-blue-900 text-white"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Healthcare Operations?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Contact us to discuss how our innovative solutions can address your healthcare challenges and improve patient outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="#" className="bg-white text-blue-800 hover:bg-blue-50 transition duration-300 font-semibold rounded-lg px-8 py-4 text-lg">
                Request Consultation
              </Link>
              <Link to="/event" className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 transition duration-300 text-white font-semibold rounded-lg px-8 py-4 text-lg">
                Attend Innovation Hub
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

     {/* Service Detail Modal */}
{selectedService && (
  <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
    >
      <button 
        onClick={closeServiceDetail}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition p-2 bg-white rounded-full shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-8 py-8 rounded-t-xl">
        <div className="flex items-center">
          {selectedService.icon}
          <h2 className="text-2xl md:text-3xl font-bold ml-4">{selectedService.title}</h2>
        </div>
      </div>
      
      <div className="p-8">
        <p className="text-gray-700 mb-8">{selectedService.description}</p>
        
        <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {selectedService.features.map((feature, index) => (
            <div key={index} className="flex items-start bg-gray-50 p-4 rounded-lg">
              <div className="text-blue-500 mt-1 mr-3">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Case Study: {selectedService.caseStudy.title}</h3>
          <p className="text-gray-700 mb-4">{selectedService.caseStudy.description}</p>
          
          <h4 className="font-semibold text-gray-900 mb-3">Results:</h4>
          <ul className="space-y-2">
            {selectedService.caseStudy.results.map((result, idx) => (
              <li key={idx} className="flex items-start">
                <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{result}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex justify-center">
          <Link 
            to="/contact" 
            className="bg-blue-600 hover:bg-blue-700 text-white transition duration-300 font-semibold rounded-lg px-8 py-3 flex items-center justify-center"
          >
            Request a Consultation
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </motion.div>
  </div>
)}

      {/* FAQ Section */}
      <motion.section 
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4">
              Common Questions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our healthcare technology solutions and implementation process.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {/* FAQ Items */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">How do your solutions address connectivity challenges in rural areas?</h3>
                <p className="text-gray-700">Our applications are designed with offline functionality that syncs when connectivity is available. We also optimize data usage and implement progressive loading to ensure functionality even in low-bandwidth environments.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">What security measures do you implement for patient data?</h3>
                <p className="text-gray-700">We adhere to international healthcare data protection standards with end-to-end encryption, role-based access controls, and regular security audits. Our systems are designed to comply with both local regulations and global best practices.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">How long does typical implementation take for your healthcare solutions?</h3>
                <p className="text-gray-700">Implementation timelines vary based on solution complexity and organizational readiness, typically ranging from 2-6 months. We provide clear project plans with milestones and ensure staff training and support throughout the process.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Can your systems integrate with our existing healthcare infrastructure?</h3>
                <p className="text-gray-700">Yes, we design our solutions with interoperability in mind. We support standard healthcare data exchange protocols and can develop custom integration layers for legacy systems to ensure seamless data flow across your organization.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

        {/* Footer with navigation */}
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

export default Services;