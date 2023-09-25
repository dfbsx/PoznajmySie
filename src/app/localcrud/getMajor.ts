import axios from 'axios';
import API_URL  from './localApi';

export const getMajor = (city:string) => {
  return axios({
    method: 'GET',
    url: `${API_URL}/cities/${city}/major`,
  })
};