import axios from 'axios';
// import jwt_decode from 'jwt-decode';
const isDevelopment = process.env.NODE_ENV !== 'production';


const request = axios.create({
  // baseURL: '', // Replace with your API base URL
  baseURL: isDevelopment? '' : process.env.REACT_APP_API_HOST,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*'
  }
});

//요청 타임아웃 설정
request.defaults.timeout = 5000;
request.defaults.withCredentials = true; 
// request.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

//요청 인터셉터 추가
request.interceptors.request.use(
  (config) => {
    //요청을 보내기 전에 수행할 로직
    return config;
  },
  (error) => {
    //요청 에러가 발생했을 때 수행할 로직
    console.log(error); //디버깅
    return Promise.reject(error);
  }
);

//응답 인터셉터 추가
request.interceptors.response.use(
  (response) => {
    //응답에 대한 로직 작성
    //const res = response.data
    //return res
    return response;
  },

  (error) => {
    //응답 에러가 발생했을 때 수행할 로직
    console.log(error); //디버깅
    return Promise.reject(error);
  }
);

export default request; //axios 인스턴스를 내보낸다.
