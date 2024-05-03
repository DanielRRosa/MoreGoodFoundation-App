// NextJS and Dependencies
import type { Metadata } from "next";
import type { Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Components
import ThemeProvider from "@/components/theme/theme-provider";
import AuthProvider from "@/components/providers/auth-provider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    template: process.env.SITE_TITLE as string,
    default: process.env.SITE_TITLE as string,
  },
  description: process.env.SITE_DESCRIPTION as string,
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon.ico",
        href: "/favicon.ico",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon.ico",
        href: "/favicon.ico",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#ff0000",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
