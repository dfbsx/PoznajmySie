import axios from 'axios';
import API_URL  from './configuration';

export const login = (data:{}) => {
  return axios({
    method: 'POST',
    url: `${API_URL}/api/Account/signIn`,
    data:data,
  })
};