import { MantineProvider } from "../components/mantine";
import styles from "./globals.module.css";
import { Biryani } from "next/font/google";

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
  return (
    <html lang="en" className={biryani.className}>
      <MantineProvider>
        <body className={styles.body}>{children}</body>
      </MantineProvider>
    </html>
  );
}
