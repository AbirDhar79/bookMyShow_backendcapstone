const config = {
  development: {
    API_URL: 'http://localhost:8080'
  },
  production: {
    API_URL: 'https://bookmyshow-backendcapstone.onrender.com'
  }
};

const environment = process.env.NODE_ENV || 'development';

export default config[environment]; 