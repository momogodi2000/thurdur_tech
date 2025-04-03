require('dotenv').config();
const { initializeServer } = require('./config/server');
const { testConnection } = require('./config/database');
const env = require('./config/env');
const Contact = require('./models/Contact');
const Newsletter = require('./models/Newsletter');

// Import routes
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('Failed to connect to database. Exiting application...');
      process.exit(1);
    }

    // Initialize database tables
    await Contact.createTable();
    await Newsletter.createTable();

    // Initialize Express app
    const app = initializeServer();

    // API routes
    app.use('/api/contacts', contactRoutes);
    app.use('/api/newsletter', newsletterRoutes);

    // Health check route
    app.get('/api/health', (req, res) => {
      res.status(200).json({ 
        status: 'success',
        message: 'Server is running' 
      });
    });

    // Handle undefined routes
    app.use('*', (req, res) => {
      res.status(404).json({
        status: 'error',
        message: `Route ${req.originalUrl} not found`
      });
    });

    // Start the server
    const PORT = env.PORT;
    app.listen(PORT, () => {
      console.log(`⚡️ Server running on port ${PORT} in ${env.NODE_ENV} mode`);
      console.log(`🔗 Frontend URL: ${env.FRONTEND_URL}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();