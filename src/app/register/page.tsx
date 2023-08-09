"use client";
import { Button, Flex, Group, PasswordInput, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import styles from "../register/page.module.css";
import { useState } from "react";
import { matches, useForm } from "@mantine/form";
import { register } from "@/crud/register";
import { useUserStore } from "../store/zustand"

export default function Login() {
  const {authenticate} = useUserStore();
  const router = useRouter();
  const [isRegisterError, setIsRegisterError] = useState(false);
  const [registerError, setRegisterError] = useState("");
  type RegisterForm = {
    email: string;
    username: string;
    password: string;
    reapetedPassword: string;
    bio: string;
    city: string;
    uni: string;
    major: string;
    gender: string;
  };
  const [registerData, setRegisterData] = useState<RegisterForm>({
    email: "",
    username: "",
    password: "",
    reapetedPassword: "",
    bio: "",
    city: "",
    uni: "",
    major: "",
    gender: "",
  });

  const form = useForm<RegisterForm>({
    initialValues: registerData,
    validateInputOnChange: true,
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Niepoprawny format adresu e-mail",
      username: (value) =>
        value.length < 4 ? "Login powinien zawierać co najmniej 4 znaki" : null,
        password: (value) =>
        !/^.*(?=.{8,})(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/g.test(value)
          ? "Hasło powinno zawierać co najmniej 8 znaków, jedną dużą literę, jedną cyfrę i jeden znak specjalny"
          : null,
      reapetedPassword: (value, values) =>
        value !== values.password ? "Podane hasła się różnią" : null,
    },
  });
  

  const handleRegister = (values: RegisterForm) => {
    setRegisterData({
      email: values.email,
      username: values.username,
      password: values.password,
      reapetedPassword: values.reapetedPassword,
      bio: registerData.bio,
      city: registerData.city,
      uni: registerData.uni,
      major: registerData.major,
      gender: registerData.gender,
    });
    register(values)
    .then((resp)=>{
        console.log("Resp",resp)
        authenticate(resp.data.userName,resp.data.token)
        router.push("home")
        console.log("register data",registerData)
    })
    .catch((error)=>{
        alert(error.response.data.title?error.response.data.title:"Wystąpił nieznany błąd")
    })
  };
  

  const [nextStep, setNextStep] = useState(false);
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
                {...form.getInputProps('email')}
                
              />
              <TextInput
                placeholder="Login"
                label="Login"
                radius="xs"
                size="md"
                withAsterisk
                {...form.getInputProps('username')}
              />
              <PasswordInput
                placeholder="*****"
                label="Hasło"
                size="md"
                radius="xs"
                withAsterisk
                {...form.getInputProps('password')}
              />
              <PasswordInput
                placeholder="*****"
                label="Powtórz Hasło"
                size="md"
                radius="xs"
                withAsterisk
                {...form.getInputProps('reapetedPassword')}
              />
              <Button
                color="dark"
                radius="xs"
                size="md"
                onClick={() => setNextStep(true)}
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
            <form className={styles.formLayout} onSubmit={form.onSubmit((values) => handleRegister(values))}>
              <TextInput
                placeholder="Lubię jazdę na rowerze"
                label="Bio"
                radius="xs"
                size="md"
                withAsterisk
                {...form.getInputProps('bio')}
              />
              <TextInput
                placeholder="Rzeszów"
                label="Miasto"
                radius="xs"
                size="md"
                withAsterisk
                {...form.getInputProps('city')}
              />
              <TextInput
                placeholder="Politechnika Rzeszowska"
                label="Uczelnia"
                size="md"
                radius="xs"
                withAsterisk
                {...form.getInputProps('uni')}
              />
              <TextInput
                placeholder="Informatyka"
                label="Kierunek"
                size="md"
                radius="xs"
                withAsterisk
                {...form.getInputProps('major')}
              />
              <TextInput
                placeholder="K"
                label="Płeć"
                size="md"
                radius="xs"
                withAsterisk
                {...form.getInputProps('gender')}
              />
              <Button color="dark" radius="xs" size="md"  type="submit">
                Zarejestruj
              </Button>
            </form>
          </Flex>
        </div>
      )}
    </main>
  );
}
