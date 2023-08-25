import useUserStore from "@/app/store/zustand";
import {
  Paper,
  Avatar,
  Text,
  createStyles,
  Textarea,
  ScrollArea,
  Group,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useMediaQuery } from "@mantine/hooks";
import HoverInfo from "./HoverInfo";

export default function MessageField() {
  const user = useUserStore((state) => state?.currentUser);
  const [message, setThisMessage] = useState("");
  const messages = useUserStore((state) => state?.messages);
  const { sendMessage } = useUserStore();
  const viewport = useRef<HTMLDivElement>(null);
  const matches = useMediaQuery("(max-width: 1184px)");

  const scrollToBottom = () =>
    viewport?.current?.scrollTo({
      top: viewport.current.scrollHeight,
      behavior: "smooth",
    });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      alignItems: "center",
      justifyContent:"space-between",
      gap: "16px",
      background: "#FCFCFC",
      borderRadius: "3px",
      borderBottom: "1px solid #F1F1F1",
    },
    newMessageField: {
      border: "1px solid #F1F1F1",
      background: "#FFFFFD",
      justifySelf: "flex-end",
      width: "100%",
      position: "absolute",
      bottom: "0",
    },
    chat: {
      marginBottom: "64px",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      boxSizing: "border-box",
      gap: "8px",
    },
  }));

  const { classes } = useStyles();

  const onEnterPress = (e: any) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      if (message) {
        sendMessage(message);
        setThisMessage("");
      }
    }
  };

  return (
    <div className={classes.container}>
      {messages.length === 0 ? null : (
        <Paper className={classes.paper}>
          <Group>
          <Avatar
            size="lg"
            radius="xl"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
          />
          <Text fz="lg" fw={500}>
            {user}
          </Text>
          </Group>
          {matches ? (
            <HoverInfo/>
          ) : null}
        </Paper>
      )}

      <ScrollArea
        className={classes.chat}
        offsetScrollbars
        scrollbarSize={8}
        viewportRef={viewport}
      >
        {messages.length === 0 ? (
          <p style={{ fontStyle: "italic" }}>Rozpocznij konwersację</p>
        ) : (
          messages.map((mess, index) => <Message message={mess} key={index} />)
        )}
      </ScrollArea>
{messages.length === 0? null:
      <Textarea
        value={message}
        onKeyDown={onEnterPress}
        onChange={(event) => setThisMessage(event.currentTarget.value)}
        className={classes.newMessageField}
        placeholder="Twoja wiadomość"
        radius="xs"
        autosize
        minRows={2}
        maxRows={2}
      />}
    </div>
  );
}
