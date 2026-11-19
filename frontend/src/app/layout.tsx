import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import AuthGuard from "@/components/auth/AuthGuard";
import RecordDetailDrawer from "@/components/table/RecordDetailDrawer";
import SaveViewModal from "@/components/views/SaveViewModal";
import ToastContainer from "@/components/common/Toast";

export const metadata: Metadata = {
  title: "DataScope – Enterprise Data Discovery & Intelligence Platform",
  description:
    "Explore, search, filter, analyze, and manage large-scale business datasets with sub-20ms query performance and server-side state synchronization.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#090b10] text-[#f1f3f7]">
        <StoreProvider>
          <AuthGuard>
            {children}
            <RecordDetailDrawer />
            <SaveViewModal />
            <ToastContainer />
          </AuthGuard>
        </StoreProvider>
      </body>
    </html>
  );
}
