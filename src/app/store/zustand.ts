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
  join:(roomId: any) => void;
  create:(id: any)=> void;
  sendMessage:(content:any)=>void;
  newRoom:(roomId:any)=>void;
  leaveRoom:()=>void;
  setThisUser:(username:string)=>void;
  createConnection:(token:string)=>void;
};

export const useUserStore = create<appData>((set,get) => ({
  token: "",
  username: "",
  currentRoom: null,
  currentUser: "",
  messages: [],
  connection: null,
  roomList: [],
  isLoading: true,
  setAuth: (username, token) =>
    set({
      username,
      token,
    })
    ,
  setRoomList: (roomList) =>
    set({
      roomList,
    }),
  setConnection: (connection) =>
    set({
      connection,
    }),
  setLoading: (isLoading) =>
    set({
      isLoading,
    }),
  setRoomId: (currentRoom) =>
    set({
      currentRoom,
    }),
  setMessage: (messages) =>
    set({
      messages,
    }),
    setNewMessage: (newMessage) =>
    set((state) => ({
      ...state,
      messages: [...state.messages, newMessage],
    })),
  setUser: (currentUser) =>
    set({
      currentUser,
    }),
    authenticate: (username, token) => {
      localStorage.setItem('PoznajmySie', JSON.stringify({ username, token }));
      get().setAuth(username, token);
    },
    getRooms:async()=>
    {
      get().setLoading(true);
      const connection = get().connection;
      if (connection) {
        await connection.invoke('GetRoomsList')
        .then((rooms:any)=>{
          
        })
        .catch((error: any)=>{
          console.log(error)
        })
      } 
    },
    leaveRoom: async()=>{
      const connection = get().connection;
      await connection.connection.send("LeaveRoom",{room: connection.currentRoom})
      .then(()=>{
        get().setRoomId(null);
      })
    },
    setThisUser:async(userName)=>{
      get().setUser(userName);
    },
    join: async(roomId)=>{
      get().setLoading(true);
      const current = get().currentRoom;
      if(current!==null){
        await get().leaveRoom();
      }
      const connection = get().connection;
      await connection.stop();
      await connection.start();
      await connection.invoke("JoinRoom",  {roomId: roomId})
      .then(()=>{
        get().setRoomId(roomId);
        get().setLoading(false);
      })
      .catch((error: any)=>{
        console.log(error)
        get().setLoading(false);
      })
    },
    create: async(id)=>{
      get().setLoading(true);
      const connection = get().connection;
      await connection.invoke("CreateRoom",{id:id})
      .then(()=>{
        get().setLoading(false);
      })
      .catch((error: any)=>{
        console.log(error)
        get().setLoading(false);
      })
    },
    sendMessage:async(content)=>{
      const connection = get().connection;
      const room = get().currentRoom;
      connection.invoke("SendMessage", {room, content});
    },
    newRoom:async(roomId)=>{
      const current = get().roomList;
      get().setRoomList([...current, roomId]);
    },
    createConnection: async (token) => {
      console.log("tworzenie połączenia1")
      const connection = new HubConnectionBuilder()
        .withUrl("https://letsmeetapp.azurewebsites.net/chat",{
          accessTokenFactory: () => {
            return token;
          },
          withCredentials: false,
        })
        .configureLogging(LogLevel.Information)
        .build();
      connection.on("ReceiveRooms", (rooms) => {
        get().setRoomList(rooms);
      });
      connection.on("ReceiveMessage", (message) => {
        if (typeof message === "string") {
          return;
        }
        if (Array.isArray(message)) {
          get().setMessage(message);
        } else {
          if (message?.roomId === get().currentRoom) {
            get().setNewMessage(message);
          }
        }
        get().getRooms();
      });
      
      connection.start().then(() => {
        get().setConnection(connection);
        get().getRooms();
      });
    },
  }));

export default useUserStore;



