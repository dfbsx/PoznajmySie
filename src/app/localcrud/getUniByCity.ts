import axios from "axios";
import API_URL from './localApi';

export const getUniByCity = (city: string) => {
  return axios({
    method: "GET",
    url: `${API_URL}/cities/${city}`,
    data: city, 
  });
};
