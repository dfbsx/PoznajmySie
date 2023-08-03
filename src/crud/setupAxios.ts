import axios from 'axios';

const setupAxios = (store: { getState: () => { (): any; new(): any; token: string; }; }) => {
  axios.interceptors.request.use(
    (config) => {
      const token = store.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
};

export default setupAxios;
