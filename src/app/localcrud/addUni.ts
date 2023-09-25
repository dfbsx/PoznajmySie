import axios from 'axios';
import API_URL  from './localApi';

export const addUni = (data:any) => {
  return axios({
    method: 'POST',
    url: `${API_URL}/cities/${data.City}`,
    data: data,
  })
};