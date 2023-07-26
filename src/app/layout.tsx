import { MantineProvider } from "../components/mantine";
export interface props {
  children?: React.ReactNode;
}

export default function RootLayout({ children }: props) {
  return (
    <html lang="en">
      <MantineProvider>
        <body>{children}</body>
      </MantineProvider>
    </html>
  );
}
