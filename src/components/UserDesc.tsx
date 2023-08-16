import useUserStore from "@/app/store/zustand";
import { getUserDataFromNick } from "@/crud/getUserDataFromNick";
import { Avatar, Flex, Group, Text, Space, createStyles } from "@mantine/core";
import {
  IconBuildingBank,
  IconMapPinFilled,
  IconBooks,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function UserDesc() {
  const user = useUserStore((state) => state.currentUser);

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
      getUserDataFromNick(user)
        .then((resp) => {
          console.log(resp);
          setUserInfo(resp.data);
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.title) {
            console.log("Błąd:", err.response.data.title);
          } else {
            console.log("Wystąpił nieznany błąd:", err);
          }
        });
    }
  }, [user]);

  const useStyles = createStyles((theme) => ({
    page: {
      width: "100%",
      boxSizing: "border-box",
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
  }));

  const { classes } = useStyles();

  if (!userInfo) {
    return <></>;
  }

  return (
    <div className={classes.page}>
      <Flex gap="md" align="center" direction="column" wrap="wrap">
        <Avatar
          size={120}
          radius={120}
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
        />
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
    </div>
  );
}
