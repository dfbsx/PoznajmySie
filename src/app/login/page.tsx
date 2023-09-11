"use client";
import {
  Alert,
  Button,
  Flex,
  Group,
  Modal,
  PasswordInput,
  TextInput,
  Text,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import styles from "../login/page.module.css";
import { useForm } from "@mantine/form";
import { login } from "@/crud/login";
import { useUserStore } from "../store/zustand";
import { useState } from "react";
import { IconAlertCircle, IconAt } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { forgotPassword } from "@/crud/forgotPassword";

export default function Login() {
  const [opened, { open, close }] = useDisclosure(false);
  const { authenticate } = useUserStore();
  const router = useRouter();
  const [isLoginError, setIsLoginError] = useState(false);
  const [LoginError, setLoginError] = useState("");
  const [mail, setMail] = useState("");
  type LoginForm = {
    login: string;
    password: string;
  };
  const [user, setUser] = useState<LoginForm>({
    login: "",
    password: "",
  });
  const form = useForm<LoginForm>({
    initialValues: user,
    validateInputOnChange: true,
    validate: {
      login: (value) =>
        value.length < 4 ? "Login powinien zawierać co najmniej 4 znaki" : null,
      password: (value) =>
        value.length < 8 ? "Hasło powinno zaiwerać co najmniej 8 znaków" : null,
    },
  });

  const handleLogin = (values: LoginForm) => {
    setUser({
      login: values.login,
      password: values.password,
    });
    login(values)
      .then((resp: any) => {
        authenticate(resp.data.userName, resp.data.token);
        router.push("/home");
      })
      .catch((error: any) => {
        setIsLoginError(true);
        console.log(error.response.data.title);
        setLoginError(error.response.data.title);
      });
  };

  const handleForgotPassword = () => {
    forgotPassword(mail)
      .then((resp: any) => {
        console.log(resp);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <main className={styles.mainLayout}>
      <Modal
        opened={opened}
        onClose={close}
        title="Przypominanie hasła"
        centered
      >
        <Flex
          gap="lg"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
        >
          <TextInput
            label="Twój adres email"
            placeholder="email@mail.com"
            icon={<IconAt size="0.8rem" />}
            value={mail}
            onChange={(event) => setMail(event.currentTarget.value)}
          />
          <Button color="dark" radius="xs" onClick={handleForgotPassword}>
            Wyślij
          </Button>
        </Flex>
      </Modal>
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
      <div className={styles.columnLayout}>
        <div className={styles.loginImage}></div>
        <Flex
          className={styles.loginForm}
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
        >
          <div>
            <h1>Dobrze Cię znów widzieć!</h1>
            <p>
              Nie masz jeszcze konta? <strong>Zarejestruj się</strong>
            </p>
          </div>
          <form
            className={styles.formLayout}
            onSubmit={form.onSubmit((values) => handleLogin(values))}
          >
            <TextInput
              placeholder="Login"
              label="Login"
              radius="xs"
              size="md"
              withAsterisk
              {...form.getInputProps("login")}
            />
            <PasswordInput
              placeholder="*****"
              label="Hasło"
              size="md"
              radius="xs"
              withAsterisk
              {...form.getInputProps("password")}
            />
            {isLoginError === true ? (
              <Alert
                icon={<IconAlertCircle size="1rem" />}
                title="Houston, mamy problem!"
                color="red"
                radius="xs"
              >
                {LoginError}
              </Alert>
            ) : null}
            <Button color="dark" radius="xs" size="md" type="submit">
              Zaloguj
            </Button>
          </form>
          <Button variant="subtle" color="dark" onClick={open} mt="sm">
            Nie pamiętasz hasła?
          </Button>
        </Flex>
      </div>
    </main>
  );
}
