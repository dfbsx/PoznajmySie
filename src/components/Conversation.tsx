import useUserStore from "@/app/store/zustand";
import { getUserDataFromNick } from "@/crud/getUserDataFromNick";
import { Paper, Avatar, Text, createStyles } from "@mantine/core";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  paper: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "4px",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#EDF3FA",
    },
  },
  text: {
    display: "flex",
    flexDirection: "column",
  },
}));

function Conversation({ room }: any) {
  const [userPhoto, setUserPhoto] = useState<string | null | undefined>("");  
  useEffect(() => {
    getUserDataFromNick(room?.roomName)
    .then((resp)=> setUserPhoto(`data:image/png;base64,${resp.data.photo}`))
    .catch((err)=>console.log(err))
  }, [room?.roomName]);
  const { classes } = useStyles();
  const { join, setThisUser, setUser } = useUserStore();
  const user = useUserStore((state)=>state.currentUser)
  return (
    <Paper
      className={classes.paper}
      onClick={() => {
        join(room?.roomId);
        setThisUser(room?.roomName);
        setUser(room?.roomName)
      }}
    >
      <Avatar
        size="md"
        radius="xl"
        src={`${userPhoto}`}
      />
      <div className={classes.text}>
        <Text fw={500}>{room.roomName ? room.roomName : "Pokój usunięty"}</Text>
        <Text fz="sm">
          {room.lastMessage !== null
            ? room.lastMessage.length > 20
              ? `${room.lastMessage.slice(0, 17)}...`
              : room.lastMessage
            : "Brak wiadomości"}
        </Text>
      </div>
    </Paper>
  );
}

export default Conversation;
