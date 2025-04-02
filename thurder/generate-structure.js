import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

// Define the folder structure
const structure = {
  'api': [
    'apiService.js',
    'authApi.js',
    'eventApi.js',
    'contentApi.js',
    'contactApi.js'
  ],
  'components': {
    'common': [
      'Header.jsx',
      'Footer.jsx',
      'Navbar.jsx',
      'LanguageSwitcher.jsx',
      'Button.jsx'
    ],
    'home': [],
    'about': [],
    'services': [],
    'event': [
      'EventCard.jsx',
      'SpeakerCard.jsx',
      'PartnerLogo.jsx',
      'RegistrationForm.jsx'
    ],
    'contact': []
  },
  'controllers': [
    'authController.js',
    'eventController.js',
    'contentController.js',
    'contactController.js'
  ],
  'models': [
    'userModel.js',
    'eventModel.js',
    'speakerModel.js',
    'partnerModel.js',
    'serviceModel.js',
    'contactModel.js'
  ],
  'pages': [
    'Home.jsx',
    'About.jsx',
    'Services.jsx',
    'EventMain.jsx',
    'EventSchedule.jsx',
    'Speakers.jsx',
    'Partners.jsx',
    'Registration.jsx',
    'Contact.jsx'
  ],
  'services': [
    'authService.js',
    'eventService.js',
    'localizationService.js',
    'analyticsService.js'
  ],
  'styles': {
    'components': [],
    'global.css': '',
    'variables.css': ''
  },
  'utils': [
    'validation.js',
    'formatting.js',
    'helpers.js'
  ],
  'App.jsx': '',
  'main.jsx': '',
  'routes.jsx': '',
  'tests': {
    'unit': [],
    'integration': [],
    'e2e': []
  }
};

// Function to create directory if it doesn't exist
function createDir(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
    console.log(`Directory created: ${dirPath}`);
  }
}

// Function to create file if it doesn't exist
function createFile(filePath, content = '') {
  if (!existsSync(filePath)) {
    writeFileSync(filePath, content);
    console.log(`File created: ${filePath}`);
  }
}

// Recursive function to process the structure
function processStructure(basePath, obj) {
  for (const key in obj) {
    const currentPath = join(basePath, key);
    
    if (Array.isArray(obj[key])) {
      // It's a directory with files
      createDir(currentPath);
      obj[key].forEach(file => {
        createFile(join(currentPath, file));
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
const baseDir = './src'; // You can change this to your preferred base directory
createDir(baseDir);
processStructure(baseDir, structure);

console.log('Folder structure generation complete!');