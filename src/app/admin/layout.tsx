import { getServerSession } from "next-auth";
import AdminLayoutClient from "./AdminLayoutClient";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return <AdminLayoutClient session={session}>{children}</AdminLayoutClient>;
}
