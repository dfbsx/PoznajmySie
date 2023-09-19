"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "../change-password/page.module.css";
import { Alert, Button, Flex, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { changePassword } from "@/crud/changePassword";
import { useState } from "react";
import { IconAlertCircle } from "@tabler/icons-react";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.replace(" ","+");
  const id = searchParams.get("Id")
  const [error, setError] = useState({
    status: false,
    text: "",
  });
  const router = useRouter();
  type ChangePassword = {
    newPassword: string;
    confirmNewPassword: string;
  };

  const form = useForm<ChangePassword>({
    validate: {
      newPassword: (value) =>
        value.length < 8 ? "Hasło powinno zaiwerać co najmniej 8 znaków" : null,
      confirmNewPassword: (value, values) =>
        value !== values.newPassword ? "Podane hasła się różnią" : null,
    },
  });

  const handleChangePassword = () => {
    console.log("pobrany token",token)
    changePassword(form.values, token, id)
      .then((resp) => {
        console.log(resp);
        router.push("/login");
        setError({ status: false, text: "" });
      })
      .catch((err) => {
        console.log(err);
        setError({ status: true, text: err.response.data.title });
      });
  };

  return (
    <main className={styles.mainLayout}>
      <div className={styles.columnLayout}>
        <div className={styles.loginImage}></div>
        <Flex
          className={styles.loginForm}
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
          gap="md"
        >
          <div>
            <h1>Dobra wiadomość!</h1>
            <p>Możesz zmienić swoje hasło</p>
          </div>
          <form
            className={styles.formLayout}
            onSubmit={form.onSubmit((values: any) => handleChangePassword())}
          >
            <PasswordInput
              placeholder="*****"
              label="Nowe hasło"
              size="md"
              radius="xs"
              autoComplete="on"
              {...form.getInputProps("newPassword")}
            />
            <PasswordInput
              placeholder="*****"
              label="Powtórz hasło"
              size="md"
              radius="xs"
              autoComplete="on"
              {...form.getInputProps("confirmNewPassword")}
            />
            {error.status === false ? null : (
              <Alert
                icon={<IconAlertCircle size="1rem" />}
                title="Ups!"
                color="red"
              >
                {error.text}
              </Alert>
            )}
            <Button color="dark" radius="xs" size="md" type="submit" mt="xl">
              Zmień swoje hasło
            </Button>
          </form>
        </Flex>
      </div>
    </main>
  );
}
