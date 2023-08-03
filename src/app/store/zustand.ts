import { create } from "zustand";
import {
  TOKEN,
  ROOM_LIST,
  CONNECTION,
  LOADING,
  MESSAGES,
  ROOM_ID,
  NEW_MESSAGE,
  SET_USER,
} from "../signalRActions/actions";

interface States {
  token: string;
  username: string;
  currentRoom: any;
  currentUser: string;
  messages: [];
  connection: any;
  roomList: [];
  isLoading: boolean;
}

const useStates = create<States>()((set) => ({
  token: "",
  username: "",
  currentRoom: null,
  currentUser: "",
  messages: [],
  connection: null,
  roomList: [],
  isLoading: true,
}));

export default (
  state = useStates(),
  action: { type: any; data: { token: any; userName: any } }
) => {
  switch (action.type) {
    case TOKEN:
      return {
        ...state,
        token: action.data.token,
        userName: action.data.userName,
      };
    case ROOM_LIST:
      return {
        ...state,
        roomList: action.data,
      };
    case CONNECTION:
      return {
        ...state,
        connection: action.data,
      };
    case LOADING:
      return {
        ...state,
        isLoading: action.data,
      };
    case ROOM_ID:
      return {
        ...state,
        currentRoom: action.data,
      };
    case MESSAGES:
      return {
        ...state,
        messages: action.data,
      };
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.data],
      };
    case SET_USER:
      return {
        ...state,
        currentUser: action.data,
      };
    default:
      return state;
  }
};
