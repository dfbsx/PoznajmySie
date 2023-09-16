import axios from 'axios';
import API_URL  from './configuration';

export const changePassword = (data:{newPassword:string, confirmNewPassword:string}, token:string | null) => {
  return axios({
    method: 'POST',
    url: `${API_URL}/api/Accounts/change-password`,
    data: {newPassword:data.newPassword, confirmNewPassword:data.confirmNewPassword, token:token }
  })
};