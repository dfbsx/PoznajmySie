import useUserStore from "@/app/store/zustand";
import { createStyles } from "@mantine/core";

export default function Message({ message }: any) {
  const user = useUserStore((state) => state.currentUser);
  const useStyles = createStyles((theme) => ({
    messageRow: {
      display: "flex",
      width: "100%",
      alignItems:"flex-end",
    },
    singleMessage: {
        fontSize:"small",
        padding:"4px 8px",
        borderStyle:"solid",
        borderWidth:"1px",
        borderColor:"#68AEFF",
        backgroundColor:"#68AEFF",
        color:"#FFFFFD",
        borderRadius:"3px 3px 0px 3px",
        boxSizing:"border-box",
        width:"fit-content",
        display:"flex",
        alignItems:"center",
    },
  }));

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
            ? { backgroundColor: "#f8f8f8", color: "#303030" }
            : undefined
        }
      >
        {message?.content}
      </div>
    </div>
  );
}
