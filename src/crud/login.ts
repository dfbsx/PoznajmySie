import axios from 'axios';
import API_URL  from './configuration';

export const login = (login:string, password:string) => {
  return axios({
    method: 'POST',
    url: `${API_URL}/login`,
    data:{ "login" : login, "password": password },
  })
};