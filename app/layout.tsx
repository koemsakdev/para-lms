import React from "react";

import type {Metadata} from "next";

import "./globals.css";
import {Toaster} from "sonner";


export const metadata: Metadata = {
    title: "Para LMS",
    description: "This is a learning management system for students and teachers.",
    icons: "/favicon.svg"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased`}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}
