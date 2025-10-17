import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import BooksGrid from "../../../components/BooksGrid";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const latestBooks = (await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))
    .limit(10)) as Book[];

  return (
    <section className="flex w-full flex-1 flex-col rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button
          className="bg-[var(--primary-admin)] hover:bg-[var(--primary-admin)]/90"
          asChild
        >
          <Link href="/admin/books/new" className="text-white">
            + Create a New Book
          </Link>
        </Button>
      </div>

      <div className="mt-7 flex w-full flex-1 flex-col overflow-hidden">
        <BooksGrid books={latestBooks} />
      </div>
    </section>
  );
}
