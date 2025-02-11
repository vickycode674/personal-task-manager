import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "My App",
  description: "A Next.js App with App Router",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />  {/* ✅ Header is always present */}
        <main className="flex-grow">{children}</main>
        <Footer />  {/* ✅ Footer is always present */}
      </body>
    </html>
  );
}
