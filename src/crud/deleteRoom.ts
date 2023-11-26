import axios from 'axios';
import API_URL  from './configuration';

export const deleteRoom = (RoomId:any) => {
  return axios({
    method: 'DELETE',
    url: `${API_URL}/api/Rooms/delete?RoomId=${RoomId}`,
  })
};