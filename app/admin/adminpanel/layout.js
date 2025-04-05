// app/admin/layout.js
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminLayoutWrapper from "@/components/AdminLayoutWrapper";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function AdminPanelLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="mb-2">You must be signed in to view this page.</p>
        <Link
          href="/admin"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
