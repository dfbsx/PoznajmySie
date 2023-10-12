import axios from 'axios';
import API_URL  from './localApi';

export const getMajors = () => {
  return axios({
    method: 'GET',
    url: `${API_URL}/cities/uni/major`,
  })
};