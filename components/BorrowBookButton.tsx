"use client";
import { Book, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { borrowBook } from "@/lib/actions/book";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  bookId: string;
  userId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

function BorrowBookButton({
  bookId,
  userId,
  borrowingEligibility: { isEligible, message }
}: Props) {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrow = async () => {
    if (!isEligible) {
      toast.error("Error", { description: message });
      return;
    }
    setBorrowing(true);
    try {
      const result = await borrowBook({ bookId, userId });
      if (result.success) {
        toast.success("Success", { description: "Book borrowed successfully" });
        router.push("/my-profile");
      } else {
        toast.error("Error", { description: result.error });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error", {
        description: "An Error accurred when borrowing the book"
      });
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button
      size={"sm"}
      className="bg-primary hover:bg-primary/90 font-bebas-neue mt-4 w-full cursor-pointer text-lg text-[var(--dark-100)]"
      onClick={handleBorrow}
      disabled={borrowing}
    >
      {borrowing ? (
        <>
          <Loader2 className="text-muted-foreground h-5 w-5 animate-spin" />
          Borrowing...
        </>
      ) : (
        <>Borrow Book</>
      )}
    </Button>
  );
}

export default BorrowBookButton;
