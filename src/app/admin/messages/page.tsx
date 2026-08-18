import { prisma } from "@/lib/prisma";
import MessagesClient from "./MessagesClient";

export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
  const msgs = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
  return <MessagesClient messages={msgs.map(m => ({ ...m, createdAt: m.createdAt.toISOString(), updatedAt: m.updatedAt.toISOString() }))} />;
}
