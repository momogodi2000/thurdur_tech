import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaSignInAlt } from 'react-icons/fa';

const Button = () => {
  // Animation variants
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="fixed top-4 right-4 z-50 flex flex-col space-y-3 md:space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Home Button */}
      <motion.div variants={itemVariants}>
        <Link to="/">
          <motion.button
            className="flex items-center justify-center p-3 md:p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Go to Home"
          >
            <FaHome className="text-xl md:text-2xl" />
            <span className="ml-2 hidden md:inline-block font-medium">Home</span>
          </motion.button>
        </Link>
      </motion.div>

      {/* Login Button */}
      <motion.div variants={itemVariants}>
        <Link to="/login">
          <motion.button
            className="flex items-center justify-center p-3 md:p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Go to Login"
          >
            <FaSignInAlt className="text-xl md:text-2xl" />
            <span className="ml-2 hidden md:inline-block font-medium">Login</span>
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Button;