import { Button, Group, Input, createStyles } from "@mantine/core";
import {
  IconBooks,
  IconBuildingBank,
  IconGenderBigender,
  IconMapPinFilled,
} from "@tabler/icons-react";

export default function DrawBar() {
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

        <Button color="dark" radius="xs">
          Losuj nowy czat
        </Button>
      </Group>
    </>
  );
}
