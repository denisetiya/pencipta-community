import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ViewportProvider } from "@/context/viewport-context";
import { DevToolbar } from "@/components/dev/dev-toolbar";
import { GlobalViewport } from "@/components/layout/global-viewport";
import { AssistantProvider, FloatingAssistantWidget } from "@/components/assistant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "pencipta-comunity | AI Assistant",
  description: "AI-Powered Community Assistant with Knowledge Graph & Smart Connections",
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-100/50">
        <ViewportProvider>
          <AssistantProvider>
            <DevToolbar />
            <GlobalViewport>{children}</GlobalViewport>
            <FloatingAssistantWidget />
          </AssistantProvider>
        </ViewportProvider>
      </body>
    </html>
  );
}
