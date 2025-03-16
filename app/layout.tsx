import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Chowtown",
  description: "Empowering over 700 local businesses and sharing the rich flavors of Chinese cuisine with the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Sidebar></Sidebar>
      </body>
    </html>
  );
}
