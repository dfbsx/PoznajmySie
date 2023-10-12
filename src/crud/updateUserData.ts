import axios from 'axios';
import API_URL  from './configuration';
import { UserData } from '@/app/edit/page';

export const updateUserData = (data: any, token: any) => {
  return axios({
    method: 'PATCH',
    url: `${API_URL}/api/Users/change-informations`,
    data:data,
    headers: {
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json',
    },
  })
};