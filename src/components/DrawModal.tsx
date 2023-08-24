import useUserStore from "@/app/store/zustand";
import { draw } from "@/crud/draw";
import { Button, Flex, Group, Input, Modal, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBooks,
  IconBuildingBank,
  IconGenderBigender,
  IconMapPinFilled,
} from "@tabler/icons-react";
import { useState } from "react";

export default function DrawModal() {
  const [opened, { open, close }] = useDisclosure(false);
  interface Person {
    isUniversity: boolean;
    isCity: boolean;
    gender: string;
  }
  const [newPerson, setNewPerson] = useState<Person>({
    isUniversity: false,
    isCity: true,
    gender: "",
  });
  const { getRooms, join } = useUserStore();

  const handleDraw = () => {
    console.log("nowy obiekt", newPerson);
    draw(newPerson.isUniversity, newPerson.isCity, newPerson.gender)
      .then((resp: any) => {
        console.log("to dostaliśmy", resp.data);
        getRooms();
        join(resp.data.roomId);
      })
      .catch((err: any) => {
        alert("Nie znaleziono odpowiedniego użytkownika :c");
      });
  };

  const useStyles = createStyles((theme) => ({
    icon: {
      color: "#303030",
    },
    input: {
      borderRadius: "3px",
      background: "#FFFFFD",
      boxShadow: "0px 2px 70px 0px rgba(0, 0, 0, 0.1)",
      padding: "1px",
      display: "inline-flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  }));

  const { classes } = useStyles();
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Losuj nowego użytkownika"
        centered
      >
        <Flex  gap="lg"
      justify="center"
      align="center"
      direction="column">
          <Input
            className={classes.input}
            icon={<IconMapPinFilled className={classes.icon} />}
            variant="unstyled"
            placeholder="Miejscowość"
            radius="xs"
            size="sm"
          />
          <Input
            className={classes.input}
            icon={<IconBuildingBank className={classes.icon} />}
            placeholder="Uczelnia"
            radius="xs"
            size="sm"
            variant="unstyled"
          />
          <Input
            className={classes.input}
            icon={<IconBooks className={classes.icon} />}
            placeholder="Kierunek"
            radius="xs"
            size="sm"
            variant="unstyled"
          />
          <Input
            className={classes.input}
            icon={<IconGenderBigender className={classes.icon} />}
            placeholder="Płeć"
            radius="xs"
            size="sm"
            variant="unstyled"
          />

          <Button color="dark" radius="xs" onClick={handleDraw}>
            Losuj
          </Button>
        </Flex>
      </Modal>

      <Group position="center">
        <Button color="dark" onClick={open}>
          Losuj
        </Button>
      </Group>
    </>
  );
}
