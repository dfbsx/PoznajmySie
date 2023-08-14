"use client";
import setupAxios from "@/crud/setupAxios";
import { MantineProvider } from "../components/mantine";
import styles from "./globals.module.css";
import { Biryani } from "next/font/google";
import { useEffect } from "react";
import { useUserStore } from "../app/store/zustand";

const biryani = Biryani({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export interface props {
  children?: React.ReactNode;
}


export default function RootLayout({ children }: props) {
  const token = useUserStore((state) => state.token);
  const { createConnection } = useUserStore();
  useEffect(() => {
    const userJSON = localStorage.getItem("PoznajmySie");
    const user = userJSON ? JSON.parse(userJSON) : null;
    if (user?.username) {
      setupAxios(user?.token);
      createConnection(user?.token);
    } else {
      console.log("nie");
    }
  },[]);

  return (
    <html lang="en" className={biryani.className}>
      <MantineProvider>
        <body className={styles.body}>{children}</body>
      </MantineProvider>
    </html>
  );
}

