import "./globals.css";
import type { Metadata } from "next";
import AppKitProvider from "@/app/providers";
import { Loading } from "@/components/Loading";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "DivFund",
  description: "open source, cross-platform DivFund your code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* <Header /> */}
        <main className="flex-grow">
          <Loading>
            <AppKitProvider>{children}</AppKitProvider>
          </Loading>
        </main>
      </body>
    </html>
  );
}
