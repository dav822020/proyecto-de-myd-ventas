import { prisma } from "@/lib/prisma";
import QuotesClient from "./QuotesClient";

export const dynamic = 'force-dynamic';

export default async function QuotesPage() {
  const quotes = await prisma.quote.findMany({ orderBy: { createdAt: "desc" } });
  return <QuotesClient quotes={quotes.map(q => ({ ...q, createdAt: q.createdAt.toISOString(), updatedAt: q.updatedAt.toISOString() }))} />;
}
