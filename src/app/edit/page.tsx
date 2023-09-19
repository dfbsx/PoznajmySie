"use client";
import {
  Avatar,
  Button,
  FileInput,
  Flex,
  Group,
  Indicator,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import styles from "../edit/page.module.css";
import { IconPencil, IconUpload } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getUserData } from "@/crud/getUserData";
import { updateUserData } from "@/crud/updateUserData";
import { useRouter } from "next/navigation";
//@ts-ignore
import withAuth from "@/components/withAuth";
import { useDisclosure } from "@mantine/hooks";
import { changeUserPhoto } from "@/crud/changeUserPhoto";

export interface UserData {
  userName: string;
  bio: string;
  city: string;
  university: string;
  major: string;
}
function Edit() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState();
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [value, setValue] = useState<any>();
  const [opened, { open, close }] = useDisclosure(false);
  const [refresh, setRefresh] = useState(false);
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
        setUserPhoto(`data:image/png;base64,${resp.data.photo}`);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        alert(
          err.response.data.title
            ? err.response.data.title
            : "Wystąpił nieznany błąd"
        );
      });
  }, [refresh]);

  const handleUpdateData = () => {
    updateUserData(userData, token)
      .then(() => {
        router.back();
      })
      .catch((error: any) => {
        console.log(error.response.data.title);
        alert(
          error.response.data.title
            ? error.response.data.title
            : "Wystąpił nieznany błąd"
        );
      });
  };

  const handleUpdatePhoto = () => {
    console.log("ohto",value)
    const formData = new FormData();
    formData.append('Photo', value);
    changeUserPhoto(formData)
      .then((resp) => {
        console.log(resp);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.page}>
      <Modal opened={opened} onClose={close} title="Zmień zdjęcie profilowe">
        <FileInput
          radius="xs"
          label="Wybierz nowe zdjęcie"
          description="Kliknij w pole"
          placeholder="Wybierz z komputera..."
          icon={<IconUpload size={14}/>}
          value={value}
          onChange={setValue}
        />
        <Button
          variant="filled"
          color="dark"
          radius="xs"
          mt="md"
          onClick={handleUpdatePhoto}
        >
          Zmień
        </Button>
      </Modal>
      <div className={styles.data}>
        <div className={styles.avatarColumn}>
          <Group position="center">
            <Indicator
              className={styles.indicator}
              inline
              label={<IconPencil size={20} strokeWidth={1.5} color={"white"} />}
              color="#68AEFF"
              size={30}
              offset={28}
              radius="xl"
              onClick={open}
              withBorder
            >
              <Avatar size={200} radius={200} src={`${userPhoto}`} />
            </Indicator>
          </Group>
          <Text fz={36} fw={600}>
            {userData.userName}
          </Text>
        </div>
        <Flex
          className={styles.dataColumn}
          align="flex-start"
          justify="space-between"
          gap="xl"
        >
          <TextInput
            className={styles.input}
            label="Bio"
            size="md"
            value={userData.bio}
            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
          />
          <TextInput
            className={styles.input}
            label="Miasto"
            size="md"
            value={userData.city}
            onChange={(e) => setUserData({ ...userData, city: e.target.value })}
          />
          <TextInput
            className={styles.input}
            label="Uczelnia"
            size="md"
            value={userData.university}
            onChange={(e) =>
              setUserData({ ...userData, university: e.target.value })
            }
          />
          <TextInput
            className={styles.input}
            label="Kierunek"
            size="md"
            value={userData.major}
            onChange={(e) =>
              setUserData({ ...userData, major: e.target.value })
            }
          />
        </Flex>
      </div>
      <Group className={styles.buttons} position="right" spacing="xl">
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
          onClick={handleUpdateData}
        >
          Zapisz zmiany
        </Button>
      </Group>
    </div>
  );
}

export default withAuth(Edit);
