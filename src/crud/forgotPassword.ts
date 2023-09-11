import axios from 'axios';
import API_URL  from './configuration';

export const forgotPassword = (data:string) => {
  return axios({
    method: 'POST',
    url: `${API_URL}/api/Accounts/forgot-password`,
    data: {email: data}
  })
};