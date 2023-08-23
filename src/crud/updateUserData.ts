import axios from 'axios';
import API_URL  from './configuration';
import { UserData } from '@/app/edit/page';

export const updateUserData = (data: UserData, token: any) => {
  return axios({
    method: 'PATCH',
    url: `${API_URL}/User/update`,
    data:data,
    headers: {
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json',
    },
  })
};