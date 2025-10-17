import Link from "next/link";
import React from "react";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

function BookCard({ title, author, genre, id, coverColor, coverUrl }: Book) {
  const isLoanedBook = false;
  return (
    <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
      <Link
        href={`books/${id}`}
        className={cn(isLoanedBook && "flex w-full flex-col items-center")}
      >
        <BookCover coverColor={coverColor} coverImage={coverUrl} />
        <div
          className={cn(
            "mt-4 text-center",
            !isLoanedBook && "max-w-60 sm:max-w-61"
          )}
        >
          <p className="mt-2 line-clamp-1 text-base font-semibold text-white sm:text-xl">
            {title}
          </p>

          <p className="mt-1 line-clamp-1 text-sm text-[var(--light-100)] italic sm:text-base">
            {genre}
          </p>

          {isLoanedBook && (
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-medium text-[var(--light-100)] sm:text-base">
                Loaned
              </span>

              <Button
                type="button"
                size="sm"
                className="bg-primary hover:bg-primary/90 cursor-pointer text-[var(--dark-100)]"
              >
                Download Receipt
              </Button>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
}

export default BookCard;
