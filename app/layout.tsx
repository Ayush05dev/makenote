import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "makenote",
  description: "makenote is a real-time collaborative document editor that lets you write, share, and collaborate seamlessly with others. Create notes, invite teammates, and stay in sync with live cursors, comments, and more.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <Header />
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-4 bg-gray-100 overflow-y-auto scrollbar-hide">
              {children}
            </div>
          </div>

          <Toaster position="top-center"/>

        </body>
      </html>
    </ClerkProvider>
  );
}
