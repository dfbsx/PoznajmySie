"use client";
import {
  Text,
  Avatar,
  Flex,
  Header,
  Menu,
  Group,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import styles from "../home/page.module.css";
import {
  IconChevronRight,
  IconLogout,
  IconSettings,
} from "@tabler/icons-react";
import { forwardRef, useEffect, useState } from "react";
import { getUserData } from "@/crud/getUserData";
import Conversation from "@/components/Conversation";
import useUserStore from "../store/zustand";
import NoMessages from "@/components/NoMessages";
import MessageField from "@/components/MessageField";
import UserDesc from "@/components/UserDesc";
import DrawBar from "@/components/DrawBar";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mantine/hooks";
import DrawModal from "@/components/DrawModal";
import MesagesDrawer from "@/components/MessagesDrawer";
import withAuth from "@/components/withAuth";

const useStyles = createStyles((theme) => ({
  page: {
    background: "#FFFFFD",
    height: "calc(100vh - 100px)",
    overflow: "auto",
  },
}));

function Home() {
  const [userBio, setUserBio] = useState();
  const [userN, setUserN] = useState();
  const [roomId,setRoomId]=useState();
  const rooms = useUserStore((state) => state.roomList);
  const currentUser = useUserStore((state) => state.currentUser);
  const router = useRouter();
  const matches = useMediaQuery("(max-width: 1201px)");
  const small = useMediaQuery("(max-width: 550px)");
  const { classes } = useStyles();
  const [userPhoto, setUserPhoto] = useState<string | null | undefined>("home");  
  useEffect(() => {
    const userJSON = localStorage.getItem("PoznajmySie");
    const roomsFilter = rooms?.find(room => room.roomName === currentUser);
    setRoomId(roomsFilter?.roomId)
    const user = userJSON ? JSON.parse(userJSON) : null;
    getUserData(user?.token)
      .then((resp) => {
        setUserBio(resp.data.bio);
        setUserN(resp.data.userName);
        setUserPhoto(`data:image/png;base64,${resp.data.photo}`);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.title) {
          console.log("Błąd:", err.response.data.title);
        } else {
          console.log("Wystąpił nieznany błąd:", err);
        }
      });
  }, [userBio, rooms]);


  const logout = () =>{
    localStorage.removeItem("PoznajmySie");
    router.push("/")
  };

  interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    image: string;
    name: string | undefined;
    icon?: React.ReactNode;
  }

  const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
    ({ image, name, icon, ...others }: UserButtonProps, ref) => (
      <UnstyledButton
        ref={ref}
        sx={(theme) => ({
          display: "block",
          width: "100%",
          padding: theme.spacing.md,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
        {...others}
      >
        <Group>
          <Avatar src={image} radius="xl" />
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {name}
            </Text>
          </div>
          {icon || <IconChevronRight size="1rem" />}
        </Group>
      </UnstyledButton>
    )
  );

  return (
    <>
      <Header className={styles.header} height={60} p="md">
        <Group position="center">
          <Menu withArrow>
            <Menu.Target>
              <UserButton
                image={`${userPhoto}`}
                name={userN}
              />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Aplikacja</Menu.Label>
              <Menu.Item
                onClick={() => router.push("/edit")}
                icon={<IconSettings size={14} />}
              >
                Edytuj profil
              </Menu.Item>

              <Menu.Divider />
              <Menu.Label>Inne</Menu.Label>
              <Menu.Item color="red" onClick={()=>logout()} icon={<IconLogout size={14} />}>
                Wyloguj się
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Group>
          {small ? <MesagesDrawer rooms={rooms} /> : null}
          {matches ? <DrawModal /> : <DrawBar />}
        </Group>
      </Header>
      <Flex
        className={classes.page}
        gap="xl"
        justify="center"
        direction="row"
        wrap="wrap"
        p="lg"
      >
        {small ? null : (
          <div className={styles.messagesBox}>
            <p>Twoje wiadomości:</p>
            {rooms?.map((room, index) => (
              <Conversation key={index} room={room} />
            ))}
          </div>
        )}
        <div className={styles.messageField}>
          {rooms?.length === 0 ? <NoMessages /> : <MessageField />}
        </div>
        {currentUser == "" || matches ? null : (
          <div className={styles.userDescription}>
            <UserDesc roomId={roomId}/>
          </div>
        )}
      </Flex>
    </>
  );
}

export default withAuth(Home);
