import useUserStore from "@/app/store/zustand";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  messageRow: {
    display: "flex",
    width: "100%",
    alignItems: "flex-end",
  },
  singleMessage: {
    fontSize: "small",
    padding: "4px 8px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#68AEFF",
    backgroundColor: "#68AEFF",
    color: "#FFFFFD",
    borderRadius: "3px 3px 0px 3px",
    boxSizing: "border-box",
    maxWidth: "60%",
    display: "flex",
    alignItems: "center",
    marginBottom: "2px",
    wordBreak: "break-word",
    wordWrap: "break-word",
    overflow: "hidden",
  },
}));

export default function Message({ message }: any) {
  const user = useUserStore((state) => state.currentUser);

  const { classes } = useStyles();
  return (
    <div
      className={classes.messageRow}
      style={
        message?.from === user
          ? { justifyContent: "flex-start" }
          : { justifyContent: "flex-end" }
      }
    >
      <div
        className={classes.singleMessage}
        style={
          message?.from === user
            ? {
                backgroundColor: "#F8F8F8",
                color: "#303030",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "3px",
                borderColor: "#F8F8F8",
              }
            : undefined
        }
      >
        {message?.content}
      </div>
    </div>
  );
}
