"use client";
import { Button, Flex, Group, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import styles from "../register/page.module.css";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
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
      {nextStep === false ? 
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
            <p>
              I poznaj najlepszą społeczność
            </p>
          </div>
          <form className={styles.formLayout}>
            <TextInput
              placeholder="email@example.com"
              label="Email"
              radius="xs"
              size="md"
              withAsterisk
            />
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
             <TextInput
              placeholder="*****"
              label="Powtórz Hasło"
              size="md"
              radius="xs"
              withAsterisk
            />
            <Button color="dark" radius="xs" size="md" onClick={()=>setNextStep(true)}>
              Jeszcze tylko jeden krok
            </Button>
          </form>
        </Flex>
      </div>: <div className={styles.columnLayout}>
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
            <p>
              Aby lepiej można było Cię poznać
            </p>
          </div>
          <form className={styles.formLayout}>
            <TextInput
              placeholder="Lubię jazdę na rowerze"
              label="Bio"
              radius="xs"
              size="md"
              withAsterisk
            />
             <TextInput
              placeholder="Rzeszów"
              label="Miasto"
              radius="xs"
              size="md"
              withAsterisk
            />
            <TextInput
              placeholder="Politechnika Rzeszowska"
              label="Uczelnia"
              size="md"
              radius="xs"
              withAsterisk
            />
             <TextInput
              placeholder="Informatyka"
              label="Kierunek"
              size="md"
              radius="xs"
              withAsterisk
            />
            <TextInput
              placeholder="K"
              label="Płeć"
              size="md"
              radius="xs"
              withAsterisk
            />
            <Button color="dark" radius="xs" size="md">
              Zarejestruj
            </Button>
          </form>
        </Flex>
      </div>}
    </main>
  );
}
