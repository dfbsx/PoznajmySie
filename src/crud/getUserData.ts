import axios from 'axios';
import API_URL  from './configuration';

export const getUserData = (token:any) => {
  return axios({
    method: 'GET',
    url: `${API_URL}/api/Users/me`,
    headers: {
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json',
    },
  })
};