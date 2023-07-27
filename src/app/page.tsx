"use client";
import { Button, Group } from "@mantine/core";
import styles from "./page.module.css";
import girlGraphic from "../../public/startpagegraphic.png";
import Image from "next/image";

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
      <Image
        className={styles.girlObject}
        src={girlGraphic}
        alt="Dziewczyna z plecakiem"
      />
      <div className={styles.left}></div>
      <div className={styles.right}></div>
    </main>
  );
}
