"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Header from "@/app/components/Header";
// import Footer from "@/app/components/Footer";
import "@/app/globals.css";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <QueryClientProvider client={queryClient}>
          <Header />  {/* ✅ Header is always present */}
          <main className="flex-grow">{children}</main>
        </QueryClientProvider>
        {/* <Footer />  ✅ Footer is always present */}
      </body>
    </html>
  );
}
