import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
// import jwt_decode from 'jwt-decode';


const request = axios.create({
  baseURL: process.env.REACT_APP_API_HOST + ":9090", // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://acoe.co.kr'
  }
});

//요청 타임아웃 설정
request.defaults.timeout = 2500;
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

interface InstanceResponse {
  (url: string, config?: AxiosRequestConfig<unknown> | undefined):
    | Promise<AxiosResponse<any, any>>
    | undefined;
}

interface Instance {
  get: InstanceResponse;
  post: InstanceResponse;
  put: InstanceResponse;
  patch: InstanceResponse;
  delete: InstanceResponse;
}

export const Axios = () => {
  let instance: Instance | null = null;
  let session: AxiosInstance | null = null;

  const init = (): Instance => {
    if (session === null) {
      session = axios.create(
        { baseURL: process.env.REACT_APP_API_HOST,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://acoe.co.kr'
          }       
        }
      );

      session.defaults.timeout = 2500;
      session.defaults.withCredentials = true;

    
    }
    return {
      get: (...params: Parameters<AxiosInstance['get']>) =>
        session?.get(...params),
      post: (...params: Parameters<AxiosInstance['post']>) =>
        session?.post(...params),
      put: (...params: Parameters<AxiosInstance['put']>) =>
        session?.put(...params),
      patch: (...params: Parameters<AxiosInstance['patch']>) =>
        session?.patch(...params),
      delete: (...params: Parameters<AxiosInstance['delete']>) =>
        session?.delete(...params),
    };
  };

  return {
    getInstance: (): Instance => {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
};
