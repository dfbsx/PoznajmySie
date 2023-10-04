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
import { useEffect, useState } from "react";
import { getUserDataFromNick } from "@/crud/getUserDataFromNick";

export default function MessagesDrawer({ rooms }: any) {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();
  const { join, setThisUser, setUser } = useUserStore();
  const [userPhotos, setUserPhotos] = useState<Record<string, string | null>>(
    {}
  );

  useEffect(() => {
    const fetchUserPhotos = async () => {
      const userPhotoPromises = rooms?.map(async (room: any) => {
        try {
          const resp = await getUserDataFromNick(room?.roomName);
          return {
            roomName: room.roomName,
            photo: `data:image/png;base64,${resp.data.photo}`,
          };
        } catch (err) {
          console.log(err);
          return {
            roomName: room.roomName,
            photo: null,
          };
        }
      });

      const userPhotoResults = await Promise.all(userPhotoPromises);
      const userPhotoMap: Record<string, string | null> = {};

      userPhotoResults.forEach((result) => {
        userPhotoMap[result.roomName] = result.photo;
      });

      setUserPhotos(userPhotoMap);
    };

    fetchUserPhotos();
  }, [rooms]);

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
              src={userPhotos[room.roomName] || ""}
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
