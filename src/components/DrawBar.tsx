import useUserStore, { useStoreActions } from "@/app/store/zustand";
import { draw } from "@/crud/draw";
import { Button, Group, Input, createStyles } from "@mantine/core";
import {
  IconBooks,
  IconBuildingBank,
  IconGenderBigender,
  IconMapPinFilled,
} from "@tabler/icons-react";
import { useState } from "react";
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
export default function DrawBar() {
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
  const { getRooms, join } = useStoreActions();

  const handleDraw = () => {
    console.log("nowy obiekt", newPerson);
    draw(newPerson.isUniversity, newPerson.isCity, newPerson.gender)
      .then((resp) => {
        console.log("to dostaliśmy", resp.data);
        getRooms();
        join(resp.data.roomId);
      })
      .catch((err) => {
        alert("Nie znaleziono odpowiedniego użytkownika :c");
      });
  };

  const { classes } = useStyles();
  return (
    <>
      <Group spacing="sm">
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
          Losuj nowy czat
        </Button>
      </Group>
    </>
  );
}
