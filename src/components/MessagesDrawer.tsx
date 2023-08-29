import { useDisclosure } from "@mantine/hooks";
import {
  Avatar,
  Drawer,
  Group,
  Paper,
  createStyles,
  Text,
} from "@mantine/core";
const useStyles = createStyles((theme) => ({
  paper: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "4px",
  },
  text: {
    display: "flex",
    flexDirection: "column",
  },
}));
import { IconMessages } from "@tabler/icons-react";
import useUserStore from "@/app/store/zustand";
export default function MesagesDrawer({ rooms }: any) {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();
  const { join, setThisUser, setUser } = useUserStore();
  return (
    <>
      <Drawer opened={opened} onClose={close} title="Twoje wiadomości">
        {rooms?.map((room: any) => (
          <Paper
            className={classes.paper}
            onClick={() => {
              join(room?.roomId);
              setThisUser(room?.roomName);
              setUser(room?.roomName);
              close();
            }}
          >
            <Avatar
              size="lg"
              radius="xl"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            />
            <div className={classes.text}>
              <Text fw={500}>
                {room.roomName ? room.roomName : "Pokój usunięty"}
              </Text>
              <Text fz="sm">
                {room.lastMessage !== null
                  ? room.lastMessage.length > 20
                    ? `${room.lastMessage.slice(0, 17)}...`
                    : room.lastMessage
                  : "Brak wiadomości"}
              </Text>
            </div>
          </Paper>
        ))}
      </Drawer>

      <Group position="center">
        <IconMessages
          onClick={open}
          size={32}
          strokeWidth={1.5}
          color={"black"}
        />
      </Group>
    </>
  );
}
