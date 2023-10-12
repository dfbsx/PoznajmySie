import axios from 'axios';
import API_URL from './configuration';

export const draw = (data: any, connection: string) => {
  const user = JSON.parse(localStorage.getItem("PoznajmySie") || "{}");
  console.log("draw");
  
  const queryParams = [];
  
  if (connection) {
    queryParams.push(`ConnectionId=${connection}`);
  }
  
  if (data.university) {
    queryParams.push(`University=${data.university}`);
    if (data.city || data.gender) {
      queryParams.push('');
    }
  }
  
  if (data.city) {
    queryParams.push(`City=${data.city}`);
    if (data.gender) {
      queryParams.push('');
    }
  }
  
  if (data.major) {
    queryParams.push(`Major=${data.major}`);
  }
  
  if (data.gender) {
    queryParams.push(`Gender=${data.gender}`);
  }
  
  const queryString = queryParams.join('&');
  
  const url = `${API_URL}/api/Rooms/create${queryString ? `?${queryString}` : ''}`;
  
  console.log("url", url);

  return axios({
    method: 'POST',
    url,
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    },
  });
};
