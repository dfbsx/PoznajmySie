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
    set((state) => ({
      ...state,
      username,
      token,
    }))
    ,
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
      localStorage.setItem('PoznajmySie', JSON.stringify({ username, token }));
      get().setAuth(username, token);
      console.log('Authentication successful:', get().username);
      console.log('Token:', get().token);
    },
    getRooms:async()=>
    {
      get().setLoading(true);
      const connection = get().connection;
      await connection.invoke('GetRoomsList')
      .then((rooms:any)=>{
        get().setRoomList(rooms);
      })
      .catch((error: any)=>{
        console.log(error)
      })
    },
    leaveRoom: async()=>{
      const connection = get().connection;
      await connection.connection.send("LeaveRoom",{room: connection.currentRoom})
      .then(()=>{
        console.log('leave', get().currentRoom)
        get().setRoomId(null);
        console.log('leave2', get().currentRoom)
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
      console.log("po ifie", current);
      const connection = get().connection;
      await connection.stop();
      await connection.start();
      console.log("connection", connection)
      await connection.invoke("JoinRoom",  {roomId: roomId})
      .then(()=>{
        get().setRoomId(roomId);
        get().setLoading(false);
        console.log("Join");
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
    createConnection: async (key) => {
      //const currentRoom = useUserStore.getState().currentRoom;
      const user = JSON.parse(localStorage.getItem("PoznajmySie") || "{}");
      console.log("Mój token",user.token)
      const {login, token} = user;
      const connection = new HubConnectionBuilder()
        .withUrl("https://letsmeetapp.azurewebsites.net/chatter",{
          accessTokenFactory: () => {
            console.log("Header token", token);
            return token;
          },
          withCredentials: false,
          
        })
        .configureLogging(LogLevel.Information)
        .build();
        
      connection.on("ReceiveCurrentAgentRoomList", (rooms) => {
        get().setRoomList(rooms);
      });
      connection.on("ReceiveMessage", (message) => {
        console.log("wiadomosc", message)
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



