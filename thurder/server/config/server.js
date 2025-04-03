const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const env = require('./env');

// Initialize express app
const initializeServer = () => {
  const app = express();

  // Apply middleware
  app.use(express.json()); // Parse JSON request body
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request body
  
  // Configure CORS
  app.use(cors({
    origin: env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
  // Security with helmet
  app.use(helmet());
  
  // Logging
  if (env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
  }

  return app;
};

module.exports = { initializeServer };