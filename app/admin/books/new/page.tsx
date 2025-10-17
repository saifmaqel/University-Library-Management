import BookForm from "@/components/admin/forms/BookForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <>
      <Button className="mb-10 w-fit border border-[var(--light-500)] bg-white text-xs font-medium text-[var(--dark-200)] hover:bg-[var(--light-800)]">
        <Link href="/admin/books">Go Back</Link>
      </Button>
      <section className="w-full max-w-2xl">
        <BookForm />
      </section>
    </>
  );
}

export default page;
