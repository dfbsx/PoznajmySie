import useUserStore from "@/app/store/zustand";
import { deleteRoom } from "@/crud/deleteRoom";
import { getUserDataFromNick } from "@/crud/getUserDataFromNick";
import {
  Avatar,
  Flex,
  Group,
  Text,
  Space,
  createStyles,
  Button,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBuildingBank,
  IconMapPinFilled,
  IconBooks,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  page: {
    width: "100%",
    boxSizing: "border-box",
    marginTop: "16px",
  },
  textFlex: {
    boxSizing: "border-box",
    alignSelf: "flex-start",
    borderTop: "1px solid #D9D9D9",
    paddingTop: "16px",
    paddingLeft: "24px",
    paddingRight: "24px",
    width: "100%",
  },
  mainFlex: {
    height: "90%",
    boxSizing: "border-box",
  },
  deleteButton: {
    alignSelf: "flex-end",
    marginTop: "16px",
  },
}));

export default function UserDesc({ roomId }: any) {
  const user = useUserStore((state) => state.currentUser);
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [isRefreshing, setRefreshing] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null | undefined>("");
  interface UserData {
    userName: string;
    bio: string;
    city: string;
    major: string;
    university: string;
  }
  const [userInfo, setUserInfo] = useState<UserData | null>(null);

  useEffect(() => {
    if (user !== "") {
      setRefreshing(false);
      console.log(isRefreshing)
      getUserDataFromNick(user)
        .then((resp) => {
          console.log(resp);
          setUserInfo(resp.data);
          setUserPhoto(`data:image/png;base64,${resp.data.photo}`);
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.title) {
            console.log("Błąd:", err.response.data.title);
          } else {
            console.log("Wystąpił nieznany błąd:", err);
          }
        });
    }
  }, [user,isRefreshing]);

  const deleteConversation = () => {
    deleteRoom(roomId)
      .then((resp) => {
        setRefreshing(true);
        //window.location.reload();
        router.refresh();
        close();
      })
      .catch((err) => console.log(err));
  };

  const { classes } = useStyles();

  if (!userInfo) {
    return <></>;
  }

  return (
    <div className={classes.page}>
      <Modal
        opened={opened}
        onClose={close}
        centered
        title="Czy na pewno chcesz usunąć konwersację?"
      >
        <Group grow>
          <Button variant="outline" color="dark">
            Anuluj
          </Button>
          <Button
            variant="filled"
            color="red"
            onClick={() => deleteConversation()}
          >
            Usuń
          </Button>
        </Group>
      </Modal>
      <Flex
        gap="md"
        align="center"
        direction="column"
        wrap="wrap"
        justify="flex-start"
        className={classes.mainFlex}
      >
        <Avatar size={120} radius={120} src={`${userPhoto}`} />
        <Space h="xl" />
        <Flex
          direction="column"
          wrap="wrap"
          gap="md"
          align="flex-start"
          className={classes.textFlex}
        >
          <Text fz="xl" fw={600}>
            O {user}
          </Text>
          <Text fz="sm" fw={400}>
            {userInfo.bio}
          </Text>
          <Group spacing="xs">
            <IconMapPinFilled />
            <Text fz="sm" fw={400}>
              {userInfo.city}
            </Text>
          </Group>
          <Group spacing="xs">
            <IconBooks />
            <Text fz="sm" fw={400}>
              {userInfo.major}
            </Text>
          </Group>
          <Group spacing="xs">
            <IconBuildingBank />
            <Text fz="sm" fw={400}>
              {userInfo.university}
            </Text>
          </Group>
        </Flex>
      </Flex>
      <Button
        fullWidth
        color="red"
        radius="xs"
        onClick={open}
        className={classes.deleteButton}
      >
        Usuń konwersację
      </Button>
    </div>
  );
}
