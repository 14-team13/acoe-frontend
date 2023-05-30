import axios from 'axios';
const isDevelopment = process.env.NODE_ENV !== 'production';


const request = axios.create({
  baseURL: isDevelopment? '' : process.env.REACT_APP_API_HOST,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'https://acoe.vercel.app'
  }
});

request.defaults.timeout = 5000;
request.defaults.withCredentials = true; 

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default request; 
