"use client";
import {
  Autocomplete,
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
import { getCities } from "../localcrud/getCities";
import { getUniByCity } from "../localcrud/getUniByCity";
import { getMajorByUni } from "../localcrud/getMajorByUni";
import { useForm } from "@mantine/form";

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
  const [cities, setCities] = useState<{ [key: string]: { name: string } }>({});
  const [unis, setUnis] = useState<{ [key: string]: { name: string } }>({});
  const [majors, setMajors] = useState<{ [key: string]: { name: string } }>({});
  const [token, setToken] = useState();
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [value, setValue] = useState<any>();
  const [opened, { open, close }] = useDisclosure(false);
  const [refresh, setRefresh] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    userName: "",
    bio: "",
    city: "",
    university: "",
    major: "",
  });
  const form = useForm({
    initialValues: userData,
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
    getCities()
      .then((resp) => setCities(resp.data.cities))
      .catch((err) => console.log(err));
    const selectedCity =
      form.values.city === "" ? userData.city : form.values.city;
    getUniByCity(selectedCity)
      .then((resp) => {
        setUnis(resp.data.uni);
      })
      .catch((err) => console.log(err));
    const getMajors = {
      city: form.values.city === "" ? userData.city : form.values.city,
      university:
        form.values.university === ""
          ? userData.university
          : form.values.university,
    };
    getMajorByUni(getMajors)
      .then((resp) => {
        setMajors(resp.data.major);
      })
      .catch((err) => console.log(err));
  }, [refresh, form.values]);

  const handleUpdateData = (values: any) => {
    let newData = {
      userName: userData.userName,
      bio: values.bio,
      city: values.city,
      university: values.university,
      major: values.major,
    };
    updateUserData(newData, token)
      .then(() => {
        console.log("weszło", newData);
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
    const formData = new FormData();
    formData.append("Photo", value);
    changeUserPhoto(formData)
      .then((resp) => {
        console.log(resp);
        setRefresh(!refresh);
        setServerError(false);
      })
      .catch((err) => {
        console.log(err);
        setServerError(true);
      });
  };
  const citiesList = Object.keys(cities)?.map(
    (city, i) => `${cities[city].name}`
  );
  const unisList =
    unis && Object.keys(unis).length > 0
      ? Object.keys(unis).map((uni, i) => {
          return unis[uni].name;
        })
      : [];
  const majorsList =
    majors && Object.keys(majors).length > 0
      ? Object.keys(majors).map((major, i) => {
          return majors[major].name;
        })
      : [];
  return (
    <div className={styles.page}>
      <Modal opened={opened} onClose={close} title="Zmień zdjęcie profilowe">
        <FileInput
          radius="xs"
          label="Wybierz nowe zdjęcie"
          description="Kliknij w pole"
          placeholder="Wybierz z komputera..."
          error={serverError === true ? "Zbyt duży rozmiar pliku! :( " : null}
          icon={<IconUpload size={14} />}
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
        <form>
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
              placeholder={userData.bio}
              {...form.getInputProps("bio")}
            />

            <Autocomplete
              className={styles.input}
              label="Miasto"
              placeholder={userData.city}
              radius="xs"
              size="md"
              data={citiesList}
              {...form.getInputProps("city")}
            />
            <Autocomplete
              className={styles.input}
              label="Uczelnia"
              placeholder={userData.university}
              radius="xs"
              size="md"
              data={unisList}
              {...form.getInputProps("university")}
            />
            <Autocomplete
              className={styles.input}
              label="Kierunek"
              placeholder={userData.major}
              radius="xs"
              size="md"
              data={majorsList}
              {...form.getInputProps("major")}
            />
          </Flex>
        </form>
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
          onClick={() => handleUpdateData(form.values)}
        >
          Zapisz zmiany
        </Button>
      </Group>
    </div>
  );
}

export default withAuth(Edit);
