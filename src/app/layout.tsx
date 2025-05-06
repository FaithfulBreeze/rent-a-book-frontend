import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/header";

export const metadata: Metadata = {
  title: "Rent a Book!",
  description: "Application to share and rent books!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="relative h-[90vh]">{children}</main>
      </body>
    </html>
  );
}
