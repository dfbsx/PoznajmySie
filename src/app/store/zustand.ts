import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { create, useStore } from "zustand";

type appData = {
  token: string;
  username: string;
  currentRoom: any;
  currentUser: string;
  messages: any[];
  connection: any;
  roomList: any[];
  isLoading: boolean;
};

interface UserActions {
  setAuth: (username: string, token: string) => void;
  setRoomList: (roomList: any[]) => void;
  setConnection: (connection: any) => void;
  setLoading: (isLoading: boolean) => void;
  setRoomId: (currentRoom: any) => void;
  setMessage: (messages: any[]) => void;
  setNewMessage: (messages: any[]) => void;
  setUser: (currentUser: string) => void;
  authenticate: (username: string, token: string) => void;
  getRooms: () => void;
  join: (roomId: any) => void;
  create: (id: any) => void;
  sendMessage: (content: any) => void;
  newRoom: (roomId: any) => void;
  leaveRoom: () => void;
  setThisUser: (username: string) => void;
  createConnection: (token: string) => void;
}

export const useUserStore = create<appData & { actions: UserActions }>(
  (set, get) => ({
    token: "",
    username: "",
    currentRoom: null,
    currentUser: "",
    messages: [],
    connection: null,
    roomList: [],
    isLoading: true,
    actions: {
      setAuth: (username, token) =>
        set({
          username,
          token,
        }),
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
        localStorage.setItem(
          "PoznajmySie",
          JSON.stringify({ username, token })
        );
        get().actions.setAuth(username, token);
      },
      getRooms: async () => {
        get().actions.setLoading(true);
        const connection = get().connection;
        if (connection) {
          await connection
            .invoke("GetRoomsList")
            .then((rooms: any) => {})
            .catch((error: any) => {
              console.log(error);
            });
        }
      },
      leaveRoom: async () => {
        const connection = get().connection;
        await connection.connection
          .send("LeaveRoom", { room: connection.currentRoom })
          .then(() => {
            get().actions.setRoomId(null);
          });
      },
      setThisUser: async (userName) => {
        get().actions.setUser(userName);
      },
      join: async (roomId) => {
        get().actions.setLoading(true);
        const current = get().currentRoom;
        if (current !== null) {
          console.log("teraz", current)
          await get().actions.leaveRoom();
        }
        const connection = get().connection;
        await connection.stop();
        await connection.start();
        await connection
          .invoke("JoinRoom", { roomId: roomId })
          .then(() => {
            get().actions.setRoomId(roomId);
            get().actions.setLoading(false);
          })
          .catch((error: any) => {
            console.log(error);
            get().actions.setLoading(false);
          });
      },
      create: async (id) => {
        get().actions.setLoading(true);
        const connection = get().connection;
        await connection
          .invoke("CreateRoom", { id: id })
          .then(() => {
            get().actions.setLoading(false);
          })
          .catch((error: any) => {
            console.log(error);
            get().actions.setLoading(false);
          });
      },
      sendMessage: async (content) => {
        const connection = get().connection;
        const room = get().currentRoom;
        connection.invoke("SendMessage", { room, content });
      },
      newRoom: async (roomId) => {
        const current = get().roomList;
        get().actions.setRoomList([...current, roomId]);
      },
      createConnection: async (token) => {
        const connection = new HubConnectionBuilder()
          .withUrl("https://letsmeetapp.azurewebsites.net/chat", {
            accessTokenFactory: () => {
              return token;
            },
            withCredentials: false,
          })
          .configureLogging(LogLevel.Information)
          .build();
        connection.on("ReceiveRooms", (rooms) => {
          get().actions.setRoomList(rooms);
        });
        connection.on("ReceiveMessage", (message) => {
          if (typeof message === "string") {
            return;
          }
          if (Array.isArray(message)) {
            get().actions.setMessage(message);
          } else {
            if (message?.roomId === get().currentRoom) {
              get().actions.setNewMessage(message);
            }
          }
          get().actions.getRooms();
        });

        connection.start().then(() => {
          get().actions.setConnection(connection);
          get().actions.getRooms();
        });
      },
    },
  })
);

export default useUserStore;
export const useStoreActions = () => useUserStore.getState().actions;
