import useUserStore from "@/app/store/zustand";
import { Paper, Avatar, Text, createStyles } from "@mantine/core";

function Conversation({ room }: any) {
  const useStyles = createStyles((theme) => ({
    paper:{
      display:"flex",
      alignItems:"center",
      gap: "8px",
      padding:"4px"
    },
    text:{
      display:'flex',
      flexDirection:"column",
    }
  }));
  const { classes } = useStyles();
  const {join, setUser} = useUserStore();
  return (
    <Paper className={classes.paper}
      onClick={() => {
        join(room.roomId);
        setUser(room?.roomName);
      }}
    >
        <Avatar
        size="lg"
          radius="xl"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
        />
        <div className={classes.text}>
        <Text fw={500}>{room.roomName ? room.roomName : "Pokój usunięty"}</Text>
        <Text fz="sm">
          {room.lastMessage !== null ? room.lastMessage : "Brak wiadomości"}
        </Text>
        </div>
    </Paper>
  );
}

export default Conversation;
