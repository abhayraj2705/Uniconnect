const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://uniconnect-backend-zd5n.onrender.com'
  : 'http://localhost:3000';

export default API_URL;