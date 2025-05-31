const config = {
  development: {
    API_URL: 'http://localhost:8080'
  },
  production: {
    // Option 1: Use Render backend (current setup)
    API_URL: 'https://bookmyshow-backendcapstone.onrender.com'
    
    // Option 2: Use Vercel serverless functions 
    // (uncomment line below, comment line above)
    // API_URL: ''
  }
};

const environment = process.env.NODE_ENV || 'development';

export default config[environment]; 