import type { Metadata } from "next";
import StoreProvider from "./storeProvider";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./appProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LLAMA",
  description: "Shape your style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AppProvider>{children}</AppProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
