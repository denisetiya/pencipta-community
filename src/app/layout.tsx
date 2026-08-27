import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ViewportProvider } from "@/context/viewport-context";
import { DevToolbar } from "@/components/dev/dev-toolbar";
import { GlobalViewport } from "@/components/layout/global-viewport";
import { AssistantProvider, FloatingAssistantWidget } from "@/components/assistant";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pencipta Community",
  description: "Connect through shared experience and knowledge",
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
      className={`${plusJakartaSans.variable} h-full antialiased`}
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
