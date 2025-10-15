import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import React from "react";

function page() {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="mb-10 flex justify-between"
      >
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/80 w-xs cursor-pointer font-extrabold text-[var(--dark-100)]"
        >
          Logout
        </Button>
        {/* <Button
          size="lg"
          className="w-xs cursor-pointer bg-[var(--red-400)] text-[var(--dark-100)] hover:bg-[var(--red-800)]"
          // onClick={(e) => e.preventDefault()}
        >
          Delete Account
        </Button> */}
      </form>
      <BookList title="Your Borrowed Books" books={sampleBooks} />
    </>
  );
}

export default page;
