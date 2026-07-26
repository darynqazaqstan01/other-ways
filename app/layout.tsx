import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bezdary Games",
  description: "Bezdary Games — indie game studio",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="kz">
      <body>{children}</body>
    </html>
  );
}