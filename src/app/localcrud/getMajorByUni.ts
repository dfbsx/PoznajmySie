import axios from "axios";
import API_URL from './localApi';

export const getMajorByUni = (data:any) => {
  return axios({
    method: "GET",
    url: `${API_URL}/cities/${data.city}/${data.university}`, 
  });
};
