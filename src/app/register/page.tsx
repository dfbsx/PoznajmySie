"use client";
import {
  Autocomplete,
  Button,
  Flex,
  Group,
  PasswordInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import styles from "../register/page.module.css";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { register } from "@/crud/register";
import { useStoreActions } from "../store/zustand";
import { getCities } from "../localcrud/getCities";
import { addCity } from "../localcrud/addCity";
import { getUniByCity } from "../localcrud/getUniByCity";
import { addUni } from "../localcrud/addUni";
import { getMajorByUni } from "../localcrud/getMajorByUni";
import { addMajor } from "../localcrud/addMajor";

export default function Register() {
  const { authenticate } = useStoreActions();
  const [cities, setCities] = useState<{ [key: string]: { name: string } }>({});
  const [unis, setUnis] = useState<{ [key: string]: { name: string } }>({});
  const [majors, setMajors] = useState<{ [key: string]: { name: string } }>({});
  const [registerData, setRegisterData] = useState<RegisterForm>({
    email: "",
    userName: "",
    password: "",
    repeatedPassword: "",
    bio: "",
    city: "",
    university: "",
    major: "",
    gender: 3,
  });
  const form = useForm<RegisterForm>({
    initialValues: registerData,
    validateInputOnChange: true,
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Niepoprawny format adresu e-mail",
      userName: (value) =>
        value.length < 4 ? "Login powinien zawierać co najmniej 4 znaki" : null,
      password: (value) =>
        !/^.*(?=.{8,})(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/g.test(value)
          ? "Hasło powinno zawierać co najmniej 8 znaków, jedną dużą literę, jedną cyfrę i jeden znak specjalny"
          : null,
      repeatedPassword: (value, values) =>
        value !== values.password ? "Podane hasła się różnią" : null,
    },
  });
  const majorsList =
    majors && Object.keys(majors).length > 0
      ? Object.keys(majors).map((major, i) => {
          return majors[major].name;
        })
      : [];
  useEffect(() => {
    getCities()
      .then((resp) => {
        setCities(resp.data.cities);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.title) {
          console.log("Błąd:", err.response.data.title);
        } else {
          console.log("Wystąpił nieznany błąd:", err);
        }
      });

    if (form.values.city) {
      getUniByCity(form.values.city)
        .then((resp) => {
          setUnis(resp.data.uni);
        })
        .catch((err) => {
          console.log(err);
        });
      const getMajors = {
        city: form.values.city,
        university: form.values.university,
      };
      if (form.values.university) {
        getMajorByUni(getMajors)
          .then((resp) => {
            setMajors(resp.data.major);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [form.values.city, form.values.university, form.values.gender]);
  const router = useRouter();
  type RegisterForm = {
    email: string;
    userName: string;
    password: string;
    repeatedPassword: string;
    bio: string;
    city: string;
    university: string;
    major: string;
    gender: number;
  };

  const handleRegister = (values: RegisterForm) => {
    setRegisterData({
      email: values.email,
      userName: values.userName,
      password: values.password,
      repeatedPassword: values.repeatedPassword,
      bio: registerData.bio,
      city: registerData.city,
      university: registerData.university,
      major: registerData.major,
      gender: registerData.gender,
    });
    const newUni = {
      name: form.values.university,
      City: form.values.city,
    };
    const newMajor = {
      name: form.values.major,
      Uni: form.values.university,
      City: form.values.city,
    };
    if (!citiesList.includes(registerData.city)) {
      addCity(form.values.city)
        .then((resp: any) => console.log(resp))
        .catch((err: any) => console.log(err));
    }
    if (!unisList.includes(registerData.university)) {
      addUni(newUni)
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err));
    }
    majorsList.includes(newMajor.name) === false
      ? addMajor(newMajor)
          .then((resp) => console.log(resp))
          .catch((err) => console.log(err))
      : null;
    register(values)
      .then((resp) => {
        authenticate(resp.data.userName, resp.data.token);
        router.push("home");
      })
      .catch((error) => {
        alert(
          error.response.data.title
            ? error.response.data.title
            : "Wystąpił nieznany błąd"
        );
      });
  };

  const [nextStep, setNextStep] = useState(false);
  const citiesList = Object.keys(cities)?.map(
    (city, i) => `${cities[city].name}`
  );
  const unisList =
    unis && Object.keys(unis).length > 0
      ? Object.keys(unis).map((uni, i) => {
          return unis[uni].name;
        })
      : [];

  return (
    <main className={styles.mainLayout}>
      <Group position="right" spacing="md" className={styles.buttons}>
        <Button
          variant="subtle"
          color="dark"
          radius="xs"
          onClick={() => router.push("/login")}
        >
          Zaloguj się
        </Button>
        <Button
          color="dark"
          radius="xs"
          onClick={() => router.push("/register")}
        >
          Zarejestruj się
        </Button>
      </Group>
      {nextStep === false ? (
        <div className={styles.columnLayout}>
          <div className={styles.loginImage}></div>
          <Flex
            className={styles.loginForm}
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
          >
            <div className={styles.text}>
              <h1 className={styles.headerText}>Dołącz do nas!</h1>
              <p>I poznaj najlepszą społeczność</p>
            </div>
            <form className={styles.formLayout}>
              <TextInput
                placeholder="email@example.com"
                label="Email"
                radius="xs"
                size="md"
                withAsterisk
                {...form.getInputProps("email")}
              />
              <TextInput
                placeholder="Login"
                label="Login"
                radius="xs"
                size="md"
                withAsterisk
                {...form.getInputProps("userName")}
              />
              <PasswordInput
                placeholder="*****"
                label="Hasło"
                size="md"
                radius="xs"
                withAsterisk
                {...form.getInputProps("password")}
              />
              <PasswordInput
                placeholder="*****"
                label="Powtórz Hasło"
                size="md"
                radius="xs"
                withAsterisk
                {...form.getInputProps("repeatedPassword")}
              />
              <Button
                color="dark"
                radius="xs"
                size="md"
                onClick={() =>
                  form.isValid() === true ? setNextStep(true) : null
                }
              >
                Jeszcze tylko jeden krok
              </Button>
            </form>
          </Flex>
        </div>
      ) : (
        <div className={styles.columnLayout}>
          <div className={styles.loginImagept2}></div>
          <Flex
            className={styles.loginForm}
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
          >
            <div className={styles.text}>
              <h1 className={styles.headerText}>Powiedz coś o sobie</h1>
              <p>Aby lepiej można było Cię poznać</p>
            </div>
            <form
              className={styles.formLayout}
              onSubmit={form.onSubmit((values) => handleRegister(values))}
            >
              <TextInput
                placeholder="Lubię jazdę na rowerze"
                label="Bio"
                radius="xs"
                size="md"
                {...form.getInputProps("bio")}
              />
              <Autocomplete
                label="Miasto"
                placeholder="Rzeszów"
                radius="xs"
                size="md"
                data={citiesList}
                {...form.getInputProps("city")}
              />
              <Autocomplete
                label="Uczelnia"
                placeholder="Politechnika Rzeszowska"
                radius="xs"
                size="md"
                data={unisList}
                {...form.getInputProps("university")}
              />
              <Autocomplete
                label="Kierunek"
                placeholder="Informatyka"
                radius="xs"
                size="md"
                data={majorsList}
                {...form.getInputProps("major")}
              />
              <Select
                label="Płeć"
                placeholder="Wybierz z listy"
                size="md"
                radius="xs"
                data={[
                  { value: 0, label: "Mężczyzna" },
                  { value: 1, label: "Kobieta" },
                ]}
                {...form.getInputProps("gender")}
              />
              <Button color="dark" radius="xs" size="md" type="submit">
                Zarejestruj
              </Button>
            </form>
          </Flex>
        </div>
      )}
    </main>
  );
}
