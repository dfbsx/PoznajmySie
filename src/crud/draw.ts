/*import axios from 'axios';
import API_URL  from './configuration';

export const draw = (data:any,connection:string) => {
    const user = JSON.parse(localStorage.getItem("PoznajmySie") || "{}");
    console.log("draw")
    console.log("url",`${API_URL}/api/Rooms/create?ConnectionId=${connection}${data.university?`&University=${data.university}${data.city||data.gender ? "&" :''}`:``}${data.city? `&City=${data.city}${data.gender?"&":""}`:''}${data.major?`&Major=${data.major}`:``}${data.gender?`&Gender=${data.gender}`:``}`)
  return axios({
    method: 'POST',
    //url: `${API_URL}/api/chat/draw?${uni?`isUniversity=${uni}${city||gender ? "&" :''}`:``}${city? `isCity=${city}${gender?"&":""}`:''}${gender?`gender=${gender}`:``}`,
    //url:`${API_URL}/api/Rooms/create?ConnectionId=${connection}${data.university?`&University=${data.university}${data.city||data.gender ? "&" :''}`:``}${data.city? `City=${data.city}${data.gender?"&":""}`:''}${data.gender?`Gender=${data.gender}`:``}`,
    headers: {
      'Authorization': `Bearer ${user.token}`, 
      'Content-Type': 'application/json',
    },
  },
  )
};*/
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
    //url,
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Content-Type': 'application/json',
    },
  });
};
