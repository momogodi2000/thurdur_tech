import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the folder structure
const structure = {
  'config': [
    'database.js',
    'server.js',
    'env.js'
  ],
  'controllers': [
    'authController.js',
    'userController.js',
    'eventController.js',
    'speakerController.js',
    'partnerController.js',
    'contactController.js'
  ],
  'middleware': [
    'auth.js',
    'validation.js',
    'errorHandler.js',
    'localization.js'
  ],
  'models': [
    'User.js',
    'Event.js',
    'Speaker.js',
    'Partner.js',
    'Contact.js'
  ],
  'routes': [
    'api.js',
    'auth.js',
    'users.js',
    'events.js',
    'contact.js'
  ],
  'services': [
    'emailService.js',
    'fileUploadService.js',
    'analyticsService.js'
  ],
  'utils': [
    'validation.js',
    'formatting.js',
    'logger.js'
  ],
  'uploads': [],
  '.env': '',
  '.gitignore': '',
  'package.json': '',
  'server.js': '',
  'README.md': ''
};

// Function to create directory if it doesn't exist
function createDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Directory created: ${dirPath}`);
  }
}

// Function to create file if it doesn't exist
function createFile(filePath, content = '') {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`File created: ${filePath}`);
  }
}

// Recursive function to process the structure
function processStructure(basePath, obj) {
  for (const key in obj) {
    const currentPath = path.join(basePath, key);
    
    if (Array.isArray(obj[key])) {
      // It's a directory with files
      createDir(currentPath);
      obj[key].forEach(file => {
        createFile(path.join(currentPath, file));
      });
    } else if (typeof obj[key] === 'object') {
      // It's a nested directory
      createDir(currentPath);
      processStructure(currentPath, obj[key]);
    } else {
      // It's a file
      createFile(currentPath, obj[key]);
    }
  }
}

// Start the process
const baseDir = path.join(__dirname, 'thunder-tech-backend');
createDir(baseDir);
processStructure(baseDir, structure);

console.log('Backend folder structure generation complete!');