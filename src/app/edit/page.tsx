"use client";
import { Avatar, Button, Flex, Group, Indicator, Text, TextInput } from "@mantine/core";
import styles from "../edit/page.module.css";
import { IconPencil } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getUserData } from "@/crud/getUserData";
import { updateUserData } from "@/crud/updateUserData";
import { useRouter } from "next/navigation";
export interface UserData{
    userName: string,
    bio:string,
    city:string,
    university:string,
    major:string,
};

export default function Edit() {
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState();
    const router = useRouter();
    const [userData, setUserData] = useState<UserData>({
      userName: "",
      bio: "",
      city: "",
      university: "",
      major: "",
    });
  
    useEffect(() => {
    const user = JSON.parse(localStorage.getItem("PoznajmySie") || "{}");
      setToken(user.token);
      getUserData(user.token)
        .then((resp) => {
          setUserData(resp.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          alert(err.response.data.title?err.response.data.title:"Wystąpił nieznany błąd")
        });
    }, []);
  
    const handleUpdateData = () => {
      updateUserData(userData,token)
        .then(() => {
          console.log("jej");
          console.log(userData);
        })
        .catch((error:any) => {
          console.log( error.response.data.title);
          alert(error.response.data.title?error.response.data.title:"Wystąpił nieznany błąd")
        });
    };
  return (
    <div className={styles.page}>
      <div className={styles.avatarColumn}>
        <Group position="center">
          <Indicator
            inline
            label={<IconPencil size={20} strokeWidth={1.5} color={"white"} />}
            color="blue"
            size={30}
            offset={28}
            radius="xl"
            withBorder
          >
            <Avatar
              size={200}
              radius={200}
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            />
          </Indicator>
        </Group>
        <Text fz={36} fw={600}>{userData.userName}</Text>
      </div>
      <Flex className={styles.dataColumn}  align="flex-start" justify="space-between" gap="xl">
      <TextInput
          className={styles.input}
      placeholder={userData.bio}
      label="Bio"
      size="md"
    />
     <TextInput
         className={styles.input}
      placeholder={userData.city}
      label="Miasto"
      size="md"
    />
     <TextInput
         className={styles.input}
      placeholder={userData.university}
      label="Uczelnia"
      size="md"
    />
     <TextInput
     className={styles.input}
      placeholder={userData.major}
      label="Kierunek"
      size="md"
    />
     <Group position="right" spacing="xl">
        <Button
        className={styles.button}
          variant="subtle"
          color="dark"
          radius="xs"
          onClick={() => router.push("/home")}
        >
          Wróć do strony głównej
        </Button>
        <Button
        className={styles.button}
          color="dark"
          radius="xs"
          onClick={() => router.push("/register")}
        >
          Zapisz zmiany
        </Button>
      </Group>
      </Flex>
    </div>
  );
}
