"use client";
import {
  Text,
  Avatar,
  Flex,
  Header,
  Navbar,
  Input,
  Button,
  Group,
} from "@mantine/core";
import styles from "../home/page.module.css";
import {
  IconBooks,
  IconBuildingBank,
  IconGenderBigender,
  IconMapPinFilled,
} from "@tabler/icons-react";
export default function Home() {
  return (
    <>
      <Header className={styles.header} height={60} p="md">
        <Group spacing="xs">
          <Avatar
            radius="xl"
            src="https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=383&q=80"
          />
          <Text fw={500}>ImLena</Text>
        </Group>
        <Input
          className={styles.input}
          icon={<IconMapPinFilled className={styles.icon} />}
          variant="unstyled"
          placeholder="Miejscowość"
          radius="xs"
          size="sm"
        />
        <Input
          className={styles.input}
          icon={<IconBuildingBank className={styles.icon} />}
          placeholder="Uczelnia"
          radius="xs"
          size="sm"
          variant="unstyled"
        />
        <Input
          className={styles.input}
          icon={<IconBooks className={styles.icon} />}
          placeholder="Kierunek"
          radius="xs"
          size="sm"
          variant="unstyled"
        />
        <Input
          className={styles.input}
          icon={<IconGenderBigender className={styles.icon} />}
          placeholder="Płeć"
          radius="xs"
          size="sm"
          variant="unstyled"
        />
        <Button color="dark" radius="xs">
          Losuj nowy czat
        </Button>
      </Header>
      <Flex
        className={styles.back}
        gap="xl"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
        p="lg"
      >
        <div className={styles.messagesBox}>Twoje wiadomości:</div>
        <div className={styles.messageField}>ulahula</div>
        <div className={styles.userDescription}>ulahula</div>
      </Flex>
    </>
  );
}
