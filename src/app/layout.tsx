import "./globals.css";
import type { Metadata } from "next";
import AppKitProvider from "@/app/providers";
import { Loading } from "@/components/Loading";
import Header from "@/components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "DevFund",
  description: "open source, cross-platform DevFund your code",
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
            <AppKitProvider>
              {children}
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
              />
            </AppKitProvider>
          </Loading>
        </main>
      </body>
    </html>
  );
}
