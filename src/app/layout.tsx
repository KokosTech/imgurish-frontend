import AddButton from "@/partials/AddButton";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Imugrish",
  template: "% | Imugrish",
  description:
    "A simple anonymous image board. A small frontend for a Serverless REST API",
  url: "/",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-zinc-950">
      <body className={inter.className + " bg-zinc-950"}>{children}</body>
    </html>
  );
}
