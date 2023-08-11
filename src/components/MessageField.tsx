import useUserStore from "@/app/store/zustand";
import {
  Paper,
  Avatar,
  Text,
  createStyles,
  Container,
  Textarea,
  ScrollArea,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { getUserDataFromNick } from "@/crud/getUserDataFromNick";

export default function MessageField() {
  const [otherUserData, setOtherUserData] = useState({});
  const user = useUserStore((state) => state?.username);
  const [message, setMessage] = useState("");
  const messages = useUserStore((state) => state?.messages);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (user) {
      getUserDataFromNick(user)
        .then((resp) => {
          console.log("dane obcego", resp.data);
          setOtherUserData(resp.data);
        })
        .catch((err) => {
          console.log("Nie działają dane obcego bo:", err);
          alert(
            err.response.data.title
              ? err.response.data.title
              : "Wystąpił nieznany błąd"
          );
        });
    }
  }, [user]);

  const useStyles = createStyles((theme) => ({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      gap: "16px",
      position: "relative",
    },
    paper: {
      display: "flex",
      padding: "16px",
      background: "#FCFCFC",
      borderRadius: "3px",
      borderBottom: "1px solid #F1F1F1",
    },
    newMessageField: {
      border: "1px solid #F1F1F1",
      background: "#FFFFFD",
      justifySelf: "flex-end",
      width: "100%",
      bottom: "0",
    },
    chat: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      boxSizing: "border-box",
      gap: "4px",
    },
  }));

  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Avatar
          size="lg"
          radius="xl"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
        />
        <Text fz="lg" fw={500}>
        </Text>
      </Paper>
      <ScrollArea className={classes.chat}  offsetScrollbars scrollbarSize={8}>
        {messages.length === 0 ? (
          <p style={{ fontStyle: "italic" }}>Rozpocznij konwersację</p>
        ) : (
          messages.map((message, index) => (
            <Message message={message} key={index} />
          ))
        )}
      </ScrollArea>

      <Textarea
        className={classes.newMessageField}
        placeholder="Twoja wiadomość"
        radius="xs"
        autosize
        minRows={2}
        maxRows={2}
      />
    </div>
  );
}
