import axios from 'axios';
import API_URL  from './localApi';

export const addCity = (name : string) => {
console.log("addcity",name)
  return axios({
    method: 'POST',
    url: `${API_URL}/cities`,
    data: {name:name},
  })
};