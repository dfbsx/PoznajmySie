import useUserStore from "@/app/store/zustand";
import { getUserDataFromNick } from "@/crud/getUserDataFromNick";
import { Flex, Group, HoverCard, Text, createStyles } from "@mantine/core";
import { IconBooks, IconBuildingBank, IconInfoCircle, IconMapPinFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function HoverInfo() {
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
    <Group position="center">
      <HoverCard width={280} shadow="md">
        <HoverCard.Target>
          <IconInfoCircle size={28} strokeWidth={1.5} color={"black"}/>
        </HoverCard.Target>
        <HoverCard.Dropdown>
        <Flex
          direction="column"
          wrap="wrap"
          gap="md"
          align="flex-start"
          className={classes.textFlex}
        >
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
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}
