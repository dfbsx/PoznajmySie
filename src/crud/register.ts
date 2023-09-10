import axios from 'axios';
import API_URL  from './configuration';

export const register = (data: {}) => {
  return axios({
    method: 'POST',
    url: `${API_URL}/api/Accounts/signUp`,
    data:data,
  })
};