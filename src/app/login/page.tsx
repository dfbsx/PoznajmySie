"use client";
import { Button, Flex, Group, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import styles from "../login/page.module.css";

export default function Login() {
  const router = useRouter();
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
          <form className={styles.formLayout}>
            <TextInput
              placeholder="Login"
              label="Login"
              radius="xs"
              size="md"
              withAsterisk
            />
            <TextInput
              placeholder="*****"
              label="Hasło"
              size="md"
              radius="xs"
              withAsterisk
            />
            <Button color="dark" radius="xs" size="md">
              Zaloguj
            </Button>
          </form>
        </Flex>
      </div>
    </main>
  );
}
