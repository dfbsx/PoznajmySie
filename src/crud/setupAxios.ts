import axios from 'axios';

const setupAxios = (token : any) => {
  axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
};

export default setupAxios;