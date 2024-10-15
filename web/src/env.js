const env = {
    apiUrl: process.env.NODE_ENV === 'production' ? '/prod-api' : 'http://localhost:9991',
    debug: true
  };
  
export default env;