"use client";
import { Button, Group, Flex } from "@mantine/core";
import styles from "./page.module.css";
import girlGraphic from "../../public/startpagegraphic.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <main>
      <Group position="right" spacing="md">
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
      <Flex
        className={styles.siteDescription}
        gap="xs"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <div className={styles.container}>
          <div className={styles.flip}>
            <div>
              <div>Jesteś studentem?</div>
            </div>
            <div>
              <div>Masz ochotę na wyjście?</div>
            </div>
            <div>
              <div>Potrzebujesz pomocy w nauce?</div>
            </div>
          </div>
        </div>
        <p className={styles.appName}>Poznajmy się!</p>
        <p className={styles.appDescription}>
          Aplikacja stworzona przez studentów, dla studentów
        </p>
      </Flex>

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
