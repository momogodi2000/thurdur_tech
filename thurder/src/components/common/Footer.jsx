import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = ({ openPolicy }) => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Thunder Technology</h4>
            <p className="mb-4">Transforming healthcare through innovative digital solutions across Cameroon and Africa.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" className="hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" className="hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://instagram.com" className="hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition duration-300">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition duration-300">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition duration-300">Services</Link></li>
              <li><Link to="/event" className="hover:text-white transition duration-300">Innovation Hub</Link></li>
              <li><Link to="/contact" className="hover:text-white transition duration-300">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services#mobile-web" className="hover:text-white transition duration-300">Mobile & Web Apps</Link></li>
              <li><Link to="/services#vr-ar" className="hover:text-white transition duration-300">VR/AR Solutions</Link></li>
              <li><Link to="/services#promotion" className="hover:text-white transition duration-300">Technology Promotion</Link></li>
              <li><Link to="/services#consultation" className="hover:text-white transition duration-300">Healthcare Consultation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-3 mt-1" />
                <span>TKC District, Yaoundé, Cameroon</span>
              </li>
              <li className="flex items-start">
                <FaPhone className="mr-3 mt-1" />
                <span>+237 675 123 456</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="mr-3 mt-1" />
                <span>contact@thundertech.cm</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 Thunder Technology. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <button onClick={() => openPolicy('terms')} className="hover:text-white transition duration-300">Terms of Service</button>
            <button onClick={() => openPolicy('privacy')} className="hover:text-white transition duration-300">Privacy Policy</button>
            <button onClick={() => openPolicy('partnership')} className="hover:text-white transition duration-300">Partnership Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;