"use client";

import React from "react";
import { cn } from "@/lib/utils";
import BookCoverSvg from "./BookCoverSvg";
import Image from "next/image";
// import config from "@/lib/config";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide"
};

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
}

const BookCover = ({
  className,
  variant = "regular",
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400x600.png"
}: Props) => {
  return (
    <div
      className={cn(
        "relative aspect-[2/3] w-full max-w-[250px] transition-all duration-300",
        variantStyles[variant],
        className
      )}
      style={{ height: "350px", width: "250px" }}
    >
      <BookCoverSvg coverColor={coverColor} />

      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <Image
          src={coverImage}
          alt="book cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          fill
          className="rounded-sm"
        />
        {/* <IKImage
          path={coverImage}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          alt="Book cover"
          fill
          className="rounded-sm object-fill"
          loading="lazy"
          lqip={{ active: true }}
        /> */}
      </div>
    </div>
  );
};
export default BookCover;
