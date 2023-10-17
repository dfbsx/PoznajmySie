import useUserStore, { useStoreActions } from "@/app/store/zustand";
import { draw } from "@/crud/draw";
import { getCities } from "@/app/localcrud/getCities";
import { getMajors } from "@/app/localcrud/getMajor";
import { getUnis } from "@/app/localcrud/getUnis";
import {
  Autocomplete,
  Button,
  Flex,
  Group,
  Modal,
  Select,
  createStyles,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBooks,
  IconBuildingBank,
  IconGenderBigender,
  IconMapPinFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";

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
    width:"240px"
  },
}));

export default function DrawModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      city: "",
      university: "",
      major: "",
      gender: "",
    },
  });
  const { getRooms, join } = useStoreActions();
  const connection = useUserStore((state) => state.connectionId);
  const handleDraw = () => {
    draw(form.values, connection)
      .then((resp) => {
        console.log("to dostaliśmy", resp.data);
        getRooms();
        join(resp.data.roomId);
      })
      .catch((err) => {
        console.log("err", err);
        alert("Nie znaleziono odpowiedniego użytkownika :c");
      });
  };
  const [cities, setCities] = useState<{ [key: string]: { name: string } }>({});
  const [unis, setUnis] = useState<{ [key: string]: { name: string } }>({});
  const [majors, setMajors] = useState<{ [key: string]: { name: string } }>({});
  useEffect(() => {
    getCities()
      .then((resp) => setCities(resp.data.cities))
      .catch((err) => console.log(err));
    getUnis()
      .then((resp) => {
        setUnis(resp.data.allunis);
      })
      .catch((err) => console.log(err));
    getMajors()
      .then((resp) => {
        setMajors(resp.data.allMajors);
      })
      .catch((err) => console.log(err));
  }, []);
  const citiesList = Object.keys(cities)?.map(
    (city, i) => `${cities[city].name}`
  );
  const unisList =
    unis && Object.keys(unis).length > 0
      ? Object.keys(unis).map((uni, i) => {
          return unis[uni].name;
        })
      : [];
  const majorsList =
    majors && Object.keys(majors).length > 0
      ? Object.keys(majors).map((major, i) => {
          return majors[major].name;
        })
      : [];

  const { classes } = useStyles();
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Losuj nowego użytkownika"
        centered
      >
        <form>
          <Flex
            gap="md"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
          >
            <Autocomplete
              variant="unstyled"
              className={classes.input}
              icon={<IconMapPinFilled className={classes.icon} />}
              placeholder="Miejscowość"
              radius="xs"
              size="sm"
              data={citiesList}
              {...form.getInputProps("city")}
            />
            <Autocomplete
              variant="unstyled"
              className={classes.input}
              icon={<IconBuildingBank className={classes.icon} />}
              placeholder="Uczelnia"
              radius="xs"
              size="sm"
              data={unisList}
              {...form.getInputProps("university")}
            />
            <Autocomplete
              variant="unstyled"
              className={classes.input}
              icon={<IconBooks className={classes.icon} />}
              placeholder="Kierunek"
              radius="xs"
              size="sm"
              data={majorsList}
              {...form.getInputProps("major")}
            />
            <Select
              placeholder="Płeć"
              className={classes.input}
              variant="unstyled"
              icon={<IconGenderBigender className={classes.icon} />}
              size="sm"
              radius="xs"
              data={[
                { value: "Male", label: "Mężczyzna" },
                { value: "Female", label: "Kobieta" },
              ]}
              {...form.getInputProps("gender")}
            />
            <Button color="dark" radius="xs" onClick={handleDraw}>
              Losuj nowy czat
            </Button>
          </Flex>
        </form>
      </Modal>

      <Group position="center">
        <Button color="dark" onClick={open}>
          Losuj
        </Button>
      </Group>
    </>
  );
}
