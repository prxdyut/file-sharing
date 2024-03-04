import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vidhi's Archive",
  description:
    "Vidhi's Archive stores and manages your files securely online. Upload, organize, and share documents, images, videos, and more with ease. Access your files from anywhere, anytime, and collaborate with others effortlessly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}> {children}</body>
    </html>
  );
}
