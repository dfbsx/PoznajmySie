import axios from 'axios';
import API_URL  from './localApi';

export const addMajor = (data:any) => {
  return axios({
    method: 'POST',
    url: `${API_URL}/cities/${data.City}/${data.Uni}`,
    data: data,
  })
};