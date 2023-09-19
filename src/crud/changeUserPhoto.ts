import axios from 'axios';
import API_URL  from './configuration';

export const changeUserPhoto = (data: any) => {
  return axios({
    method: 'PATCH',
    url: `${API_URL}/api/Users/change-user-photo`,
    data:data,
  })
};