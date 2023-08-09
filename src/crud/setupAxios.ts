import axios from 'axios';

const setupAxios = (token : any) => {
  console.log("setup", token)
  axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Token",token)
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
};

export default setupAxios;