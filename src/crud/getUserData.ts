import axios from 'axios';
import API_URL  from './configuration';
import useAuthStore from '@/app/store/zustand';


export const getUserData = (token:any) => {
  return axios({
    method: 'GET',
    url: `${API_URL}/User/info`,
    headers: {
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json',
    },
  })
};