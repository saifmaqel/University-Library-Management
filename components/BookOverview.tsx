import { Book, StarIcon } from "lucide-react";
import React from "react";
import BookCover from "./BookCover";
import { borrowRecords, users } from "@/database/schema";
import { eq, and } from "drizzle-orm";
import { db } from "@/database/drizzle";
import BorrowBookButton from "./BorrowBookButton";
interface Props extends Book {
  userId: string;
}

const BookOverview = async ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  id,
  userId
}: Props) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) return;

  const borrowedBook = await db
    .select()
    .from(borrowRecords)
    .where(and(eq(borrowRecords.userId, userId), eq(borrowRecords.bookId, id)))
    .limit(1);

  const hasBorrowed = borrowedBook.length > 0;

  let message = "";
  let isEligible = false;

  if (hasBorrowed) {
    message = "You have already borrowed this book.";
  } else if (availableCopies <= 0) {
    message = "Book is not available.";
  } else if (user.status !== "APPROVED") {
    message = "You are not eligible to borrow this book.";
  } else {
    isEligible = true;
    message = "You can borrow this book.";
  }

  const borrowingEligibility = { isEligible, message };

  return (
    <section className="flex flex-col-reverse items-center gap-12 tracking-tight sm:gap-32 xl:flex-row xl:gap-8">
      <div className="flex flex-1 flex-col gap-5">
        {/* <p className="text-primary text-lg font-medium italic underline">
          ⚙️ This website is currently under development. Some features may be
          incomplete.
        </p> */}

        <h1 className="text-5xl font-bold text-[var(--light-300)]">{title}</h1>
        <div className="mt-7 flex flex-row flex-wrap gap-5 text-base text-[var(--light-100)]">
          <p>
            By{" "}
            <span className="font-semibold text-[var(--light-200)]">
              {author}
            </span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-[var(--light-200)]">
              {genre}
            </span>
          </p>
          <div className="flex flex-row items-center gap-1">
            <StarIcon width={21} height={21} />
            <p>{rating} </p>
          </div>
        </div>
        <div className="mt-1 flex flex-row flex-wrap gap-8 text-base text-[var(--light-100)]">
          <p className="">
            Total Books:
            <span className="text-primary ml-2 font-semibold">
              {totalCopies}
            </span>
          </p>
          <p className="">
            Available Books:
            <span className="text-primary ml-2 font-semibold">
              {availableCopies}
            </span>
          </p>
        </div>
        <p className="text-muted-foreground mt-2 text-justify text-sm/5 tracking-tight">
          {description}
        </p>
        <BorrowBookButton
          bookId={id}
          userId={userId}
          borrowingEligibility={borrowingEligibility}
        />
      </div>
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />
          <div className="absolute top-10 left-16 rotate-12 opacity-70 blur-sm max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
