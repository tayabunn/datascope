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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased">
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
