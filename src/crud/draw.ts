import axios from 'axios';
import API_URL  from './configuration';

export const draw = (uni: boolean,city: boolean,gender: string) => {
    const user = JSON.parse(localStorage.getItem("PoznajmySie") || "{}");
  console.log("URL:", `${API_URL}/api/chat/draw?${uni ? `isUniversity=${uni}${city || gender ? "&" : ''}` : ''}${city ? `isCity=${city}${gender ? "&" : ""}` : ''}${gender ? `gender=${gender}` : ''}`);
  return axios({
    method: 'GET',
    url: `${API_URL}/api/chat/draw?${uni?`isUniversity=${uni}${city||gender ? "&" :''}`:``}${city? `isCity=${city}${gender?"&":""}`:''}${gender?`gender=${gender}`:``}`,
    headers: {
      'Authorization': `Bearer ${user.token}`, 
      'Content-Type': 'application/json',
    },
  },
  )
};