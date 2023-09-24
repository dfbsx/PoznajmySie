import axios from 'axios';
import API_URL  from './localApi';

export const getUnis = () => {
  return axios({
    method: 'GET',
    url: `${API_URL}/cities/uni`,
  })
};