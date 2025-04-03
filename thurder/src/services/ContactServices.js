import BackendService from './backend_connection';

const ContactService = {
  /**
   * Send a contact message
   * @param {Object} contactData - Contact form data
   * @param {string} contactData.name - User's name
   * @param {string} contactData.email - User's email
   * @param {string} contactData.subject - Message subject
   * @param {string} contactData.message - Message content
   * @returns {Promise} - Response from server
   */
  sendContactMessage: async (contactData) => {
    try {
      return await BackendService.post('/contacts', contactData);
    } catch (error) {
      console.error('Error sending contact message:', error);
      throw error;
    }
  },

  /**
   * Subscribe to newsletter
   * @param {string} email - User's email address
   * @returns {Promise} - Response from server
   */
  subscribeToNewsletter: async (email) => {
    try {
      return await BackendService.post('/newsletter/subscribe', { email });
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  },

  /**
   * Unsubscribe from newsletter
   * @param {string} email - User's email address
   * @returns {Promise} - Response from server
   */
  unsubscribeFromNewsletter: async (email) => {
    try {
      return await BackendService.post('/newsletter/unsubscribe', { email });
    } catch (error) {
      console.error('Error unsubscribing from newsletter:', error);
      throw error;
    }
  },

  /**
   * Get all contact messages (admin functionality)
   * @returns {Promise} - List of contact messages
   */
  getAllContactMessages: async () => {
    try {
      return await BackendService.get('/contacts');
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      throw error;
    }
  },

  /**
   * Get all newsletter subscribers (admin functionality)
   * @returns {Promise} - List of newsletter subscribers
   */
  getAllNewsletterSubscribers: async () => {
    try {
      return await BackendService.get('/newsletter/subscribers');
    } catch (error) {
      console.error('Error fetching newsletter subscribers:', error);
      throw error;
    }
  }
};

export default ContactService;