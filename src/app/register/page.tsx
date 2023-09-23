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
import { useUserStore } from "../store/zustand";
import { getCities } from "../localcrud/getCities";
import { addCity } from "../localcrud/addCity";

export default function Login() {
  const { authenticate } = useUserStore();
  const [cities, setCities] = useState<{ [key: string]: { name: string } }>({});
  useEffect(() => {
    getCities()
      .then((resp) => {
        setCities(resp.data.cities)
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.title) {
          console.log("Błąd:", err.response.data.title);
        } else {
          console.log("Wystąpił nieznany błąd:", err);
        }
      });
  }, []);
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
    gender: string;
  };
  const [registerData, setRegisterData] = useState<RegisterForm>({
    email: "",
    userName: "",
    password: "",
    repeatedPassword: "",
    bio: "",
    city: "",
    university: "",
    major: "",
    gender: "",
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
    console.log("miasto", form.values.city)
    if(!citiesList.includes(registerData.city)){
      addCity(form.values.city)
      .then((resp :any)=>console.log(resp))
      .catch((err: any)=>console.log(err))
    }
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
  const citiesList = Object.keys(cities)?.map((city, i) => `${cities[city].name}`);

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
              <TextInput
                placeholder="Politechnika Rzeszowska"
                label="Uczelnia"
                size="md"
                radius="xs"
                {...form.getInputProps("university")}
              />
              <TextInput
                placeholder="Informatyka"
                label="Kierunek"
                size="md"
                radius="xs"
                {...form.getInputProps("major")}
              />
              <Select
                label="Płeć"
                placeholder="Wybierz z listy"
                size="md"
                radius="xs"
                data={[
                  { value: "0", label: "Mężczyzna" },
                  { value: "1", label: "Kobieta" },
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
