import { HttpTransportType, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { create } from "zustand";

type appData = {
  token: string;
  username: string;
  currentRoom: any;
  currentUser: string;
  messages: any[];
  connection: any;
  roomList: any[];
  isLoading: boolean;
  setAuth: (username:string, token: string) => void;
  setRoomList: (roomList: any[]) => void;
  setConnection: (connection: any) => void;
  setLoading: (isLoading: boolean) => void;
  setRoomId: (currentRoom: any) => void;
  setMessage: (messages: any[]) => void;
  setNewMessage: (messages: any[]) => void;
  setUser: (currentUser: string) => void;
  authenticate: (username: string, token: string) => void;
  getRooms:()=>void;
  createConnection:(token:string)=>void;
};

export const useUserStore = create<appData>((set) => ({
  token: "",
  username: "",
  currentRoom: null,
  currentUser: "",
  messages: [],
  connection: null,
  roomList: [],
  isLoading: true,

  setAuth: (username, token) =>
    set((state) => ({
      ...state,
      username,
      token,
    })),
  setRoomList: (roomList) =>
    set((state) => ({
      ...state,
      roomList,
    })),
  setConnection: (connection) =>
    set((state) => ({
      ...state,
      connection,
    })),
  setLoading: (isLoading) =>
    set((state) => ({
      ...state,
      isLoading,
    })),
  setRoomId: (currentRoom) =>
    set((state) => ({
      ...state,
      currentRoom,
    })),
  setMessage: (messages) =>
    set((state) => ({
      ...state,
      messages,
    })),
  setNewMessage: (messages) =>
    set((state) => ({
      ...state,
      messages: [...state.messages],
    })),
  setUser: (currentUser) =>
    set((state) => ({
      ...state,
      currentUser,
    })),
    authenticate: (username, token) => {
      const {setAuth} = useUserStore();
      localStorage.setItem('PoznajmySie', JSON.stringify({ username, token }));
      setAuth(username, token);
      console.log('Authentication successful:', username);
      console.log('Token:', token);
    },
    getRooms:async()=>
    {
      set((state)=>({...state, isLoading:true}));
      const connection = useUserStore.getState().connection;
      await connection.invoke('GetRoomList')
      .then((rooms:any)=>{
        set((state)=>({...state, roomList:rooms}))
      })
      .catch((error: any)=>{
        console.log(error)
      })
    },
    createConnection: async (key) => {
      const {getRooms, setRoomList, setMessage, setNewMessage, setConnection} = useUserStore();
      const currentRoom = useUserStore.getState().currentRoom;
      const user = JSON.parse(localStorage.getItem("PoznajmySie") || "{}");
      console.log("Mój token",user.token)
      const {login, token} = user;
      const connection = new HubConnectionBuilder()
        .withUrl("https://letsmeetapp.azurewebsites.net/chatter",{
          accessTokenFactory: () => {
            console.log("Cokolwiek")
            console.log("Header token", token);
            return token;
          },
          withCredentials: false,
          transport: HttpTransportType.LongPolling,
        })
        .configureLogging(LogLevel.Information)
        .build();
        
      connection.on("ReceiveCurrentAgentRoomList", (rooms) => {
        setRoomList(rooms);
      });
      
      console.log("naklejka",useUserStore.getState().roomList)
      connection.on("ReceiveMessage", (message) => {
        if (typeof message === "string") {
          return;
        }
        if (Array.isArray(message)) {
          setMessage(message);
        } else {
          if (message?.roomId === currentRoom) {
            setNewMessage(message);
          }
        }
        getRooms();
      });
      
      connection.start().then(() => {
        setConnection(connection);
        getRooms();
      });
    },
  }));

export default useUserStore;


