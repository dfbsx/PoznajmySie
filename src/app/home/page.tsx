"use client";
import {
  Text,
  Avatar,
  Flex,
  Header,
  Menu,
  Input,
  Button,
  Group,
  UnstyledButton,
} from "@mantine/core";
import styles from "../home/page.module.css";
import {
  IconBooks,
  IconBuildingBank,
  IconChevronRight,
  IconGenderBigender,
  IconLogout,
  IconMapPinFilled,
  IconSettings,
} from "@tabler/icons-react";
import { forwardRef, useEffect, useState } from "react";
import { getUserData } from "@/crud/getUserData";
import Conversation from "@/components/Conversation";
import useUserStore from "../store/zustand";
export default function Home() {
  const [userBio, setUserBio] = useState();
  const [userN, setUserN] = useState();
  const roomList = useUserStore((state) => state.roomList);
  const userName = useUserStore((state) => state.username);
  const token = useUserStore((state) => state.token);
  useEffect(() => {
    const userJSON = localStorage.getItem("PoznajmySie");
    const user = userJSON ? JSON.parse(userJSON) : null;
    console.log("home", token)
    console.log("lista", rooms)
    getUserData(user?.token)
      .then((resp) => {
        setUserBio(resp.data.bio);
        setUserN(resp.data.userName);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.title) {
          console.log('Błąd:', err.response.data.title);
        } else {
          console.log('Wystąpił nieznany błąd:', err);
        }})
  }, [userBio, roomList]);

  const rooms = useUserStore((state) => state.roomList);

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
                image="https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=383&q=80"
                name={userN}
              />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Aplikacja</Menu.Label>
              <Menu.Item icon={<IconSettings size={14} />}>
                Edytuj profil
              </Menu.Item>

              <Menu.Divider />
              <Menu.Label>Inne</Menu.Label>
              <Menu.Item color="red" icon={<IconLogout size={14} />}>
                Wyloguj się
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Group spacing="sm">
          <Input
            className={styles.input}
            icon={<IconMapPinFilled className={styles.icon} />}
            variant="unstyled"
            placeholder="Miejscowość"
            radius="xs"
            size="sm"
          />
          <Input
            className={styles.input}
            icon={<IconBuildingBank className={styles.icon} />}
            placeholder="Uczelnia"
            radius="xs"
            size="sm"
            variant="unstyled"
          />
          <Input
            className={styles.input}
            icon={<IconBooks className={styles.icon} />}
            placeholder="Kierunek"
            radius="xs"
            size="sm"
            variant="unstyled"
          />
          <Input
            className={styles.input}
            icon={<IconGenderBigender className={styles.icon} />}
            placeholder="Płeć"
            radius="xs"
            size="sm"
            variant="unstyled"
          />

          <Button color="dark" radius="xs">
            Losuj nowy czat
          </Button>
        </Group>
      </Header>
      <Flex
        className={styles.back}
        gap="xl"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
        p="lg"
      >
        <div className={styles.messagesBox}>
          Twoje wiadomości:
          {rooms?.map((room, index) => (
            <Conversation key={index} room={room} />
          ))}
        </div>
        <div className={styles.messageField}>ulahula</div>
        <div className={styles.userDescription}>ulahula</div>
      </Flex>
    </>
  );
}
