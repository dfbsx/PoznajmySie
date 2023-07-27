"use client";
import { Button, Group } from "@mantine/core";
import styles from "./page.module.css"

export default function Page() {
  return (
    <main>
      <Group position="right" spacing="md">
        <Button variant="subtle" color="dark" radius="xs">
          Zaloguj się
        </Button>
        <Button color="dark" radius="xs">
          Zarejestruj się
        </Button>
      </Group>
      <h1>Hello, Next.js!</h1>;
      <div className={styles.left}></div>
      <div className={styles.right}></div>
    </main>
  );
}
