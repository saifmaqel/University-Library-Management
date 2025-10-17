import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const session = await auth();
  const [bookDetials] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  if (!bookDetials) redirect("/404");

  console.log(bookDetials);

  return (
    <>
      <BookOverview {...bookDetials} userId={session?.user?.id ?? ""} />
    </>
  );
}

export default page;
