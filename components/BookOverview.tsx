import { Book, BookIcon, StarIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import BookCover from "./BookCover";

function BookOverview({
  title,
  author,
  genre,
  rating,
  total_copies,
  available_copies,
  description,
  color,
  cover
}: Book) {
  return (
    <section className="flex flex-col-reverse items-center gap-12 tracking-tight sm:gap-32 xl:flex-row xl:gap-8">
      <div className="flex flex-1 flex-col gap-5">
        <h1 className="text-5xl font-bold text-[var(--light-300)]">{title}</h1>
        <div className="text-xl; mt-7 flex flex-row flex-wrap gap-3 text-[var(--light-100)]">
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
        <div className="mt-1 flex flex-row flex-wrap gap-2 text-xl text-[var(--light-100)]">
          <p className="">
            Total Books:
            <span className="text-primary ml-2 font-semibold">
              {total_copies}
            </span>
          </p>
          <p className="">
            Available Books:
            <span className="text-primary ml-2 font-semibold">
              {available_copies}
            </span>
          </p>
        </div>
        <p className="text-muted-foreground mt-2 text-justify text-sm/5 tracking-tight">
          {description}
        </p>
        <Button size={"sm"}>
          <div className="flex items-center gap-1">
            <Book width={26} height={26} />
            <p className="font-bebas-neue text-dark-100 text-base">Borrow</p>
          </div>
        </Button>
      </div>
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={color}
            coverImage={cover}
          />
          <div className="absolute top-10 left-16 rotate-12 opacity-70 blur-sm max-sm:hidden">
            <BookCover variant="wide" coverColor={color} coverImage={cover} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookOverview;
