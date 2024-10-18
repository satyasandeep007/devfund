import "./globals.css";
import type { Metadata } from "next";
import AppKitProvider from "@/app/providers";
import { Loading } from "@/components/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cookieToInitialState } from "wagmi";
import { config } from "@/lib/wagmiConfig";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "DevFund",
  description:
    "DevFund is a platform for developers to fund open source projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Loading>
            <AppKitProvider initialState={initialState}>
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
