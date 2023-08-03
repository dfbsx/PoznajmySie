"use client";
import { Button, Flex, Group, PasswordInput, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import styles from "../register/page.module.css";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { register } from "@/crud/register";
import { authenticate } from "../signalRActions/actions";

export default function Login() {
  const router = useRouter();
  const [isRegisterError, setIsRegisterError] = useState(false);
  const [registerError, setRegisterError] = useState("");
  type RegisterForm = {
    email: string;
    username: string;
    password: string;
    repeatedPassword: string;
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
    repeatedPassword: "",
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
        value.length < 8 ? "Hasło powinno zawierać co najmniej 8 znaków" : null,
      repeatedPassword: (value, values) =>
        value !== values.password ? "Podane hasła się różnią" : null,
    },
  });

  const handleRegister = () => { 
    const data = form.values;
    setRegisterData({
      email: data.email,
      username: data.username,
      password: data.password,
      repeatedPassword: data.repeatedPassword,
      bio: registerData.bio,
      city: registerData.city,
      uni: registerData.uni,
      major: registerData.major,
      gender: registerData.gender,
    });
    register(registerData)
    .then((resp)=>{
        console.log("Resp",resp)
        //authenticate(resp.data.userName,resp.data.token)
        //router.push("home")
        console.log("register data",registerData)
    })
    .catch((error)=>{
        alert(error.response.data.title?error.response.data.title:"Wystąpił nieznany błąd")
    })
  }

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
                {...form.getInputProps('repeatedPassword')}
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
            <form className={styles.formLayout}>
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
              <Button color="dark" radius="xs" size="md" onClick={handleRegister}>
                Zarejestruj
              </Button>
            </form>
          </Flex>
        </div>
      )}
    </main>
  );
}
