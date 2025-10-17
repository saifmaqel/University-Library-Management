import React from "react";
import BookCard from "./BookCard";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
}
function BookList({ title, books, containerClassName }: Props) {
  if (books.length === 0) return;
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-3xl text-[var(--light-100)]">
        {title}
      </h2>
      <ul className="max-xs:justify-between xs:gap-10 mx-auto mt-10 flex flex-wrap justify-center gap-5">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  );
}

export default BookList;
