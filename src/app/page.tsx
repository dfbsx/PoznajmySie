"use client";
import { Button, Group, Flex, MediaQuery, rem } from "@mantine/core";
import styles from "./page.module.css";
import girlGraphic from "../../public/startpagegraphic.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const userJSON = localStorage.getItem("PoznajmySie");
    if(userJSON){
      router.push("/home");
    }
   
  }, []);
  return (
    <main>
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
      <Flex
        className={styles.siteDescription}
        align="center"
        direction="column"
        wrap="wrap"
      >
  
        <div className={styles.container}>
        <MediaQuery
      query="(max-width: 1250px) and (min-width: 500px)"
      styles={{ fontSize: "24px", '&:hover': { backgroundColor: 'silver' } }}
    >
          <div className={styles.flip}>
          
            <div>
              <div className={styles.text}>Jesteś studentem?</div>
            </div>
            <div>
              <div>Masz ochotę na wyjście?</div>
            </div>
            <div>
              <div>Potrzebujesz pomocy w nauce?</div>
            </div>
           
          </div>
          </MediaQuery>
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
