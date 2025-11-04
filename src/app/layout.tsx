import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dayta Dashboard",
  description: "Admin Dashboard built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50">{children}</body>
    </html>
  );
}
