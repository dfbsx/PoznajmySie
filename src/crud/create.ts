import axios from 'axios';
import API_URL  from './configuration';

export const draw = () => {
  return axios({
    method: 'POST',
    url: `${API_URL}/api/Rooms/create`,
  },
  )
};