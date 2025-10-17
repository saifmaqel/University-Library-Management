"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ColorPicker from "@/components/admin/ColorPicker";
import { createBook } from "@/lib/admin/actions/book";
import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface Props extends Partial<Book> {
  type?: "create" | "update";
}

const BookForm = ({ type, ...book }: Props) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.input<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      genre: "",
      rating: 1,
      totalCopies: 1,
      coverUrl: "",
      coverColor: "",
      videoUrl: "test",
      summary: ""
    }
  });

  const onSubmit = async (values: z.input<typeof bookSchema>) => {
    setIsSubmitting(true);

    const typedValues = values as {
      title: string;
      description: string;
      author: string;
      genre: string;
      rating: number;
      totalCopies: number;
      coverUrl: string;
      coverColor: string;
      videoUrl: string;
      summary: string;
    };

    const result = await createBook(typedValues);

    if (result.success) {
      toast.success("Success", {
        description: "Book created successfully",
        closeButton: true
      });
      router.push(`/admin/books`);
    } else {
      toast.error("Error", {
        description: result.message,
        closeButton: true
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-[var(--dark-500)]">
                Book Title
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book title"
                  {...field}
                  className="min-h-14 border border-[var(--gray-100)] bg-white p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"author"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-[var(--dark-500)]">
                Author
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book author"
                  {...field}
                  className="min-h-14 border border-[var(--gray-100)] bg-white p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"genre"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-[var(--dark-500)]">
                Genre
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book genre"
                  {...field}
                  className="min-h-14 border border-[var(--gray-100)] bg-white p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"rating"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-[var(--dark-500)]">
                Rating
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  placeholder="Book rating"
                  {...field}
                  value={field.value as number | string | undefined}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="min-h-14 border border-[var(--gray-100)] bg-white p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"totalCopies"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-[var(--dark-500)]">
                Total Copies
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={10000}
                  placeholder="Total copies"
                  {...field}
                  value={field.value as number | string | undefined}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="min-h-14 border border-[var(--gray-100)] bg-white p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"coverUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-[var(--dark-500)]">
                Book Image
              </FormLabel>
              <FormControl>
                <div className="flex flex-col gap-2">
                  {field.value && (
                    <Image
                      src={field.value}
                      alt="Cover preview"
                      className="h-40 w-32 rounded-md border object-cover"
                      width={30}
                      height={60}
                    />
                  )}
                  <Input
                    type="url"
                    placeholder="https://example.com/cover.jpg"
                    {...field}
                    className="w-fit text-sm file:mr-2 file:cursor-pointer file:rounded-md file:border file:border-gray-300 file:bg-white file:px-2 file:py-1 file:text-sm hover:file:bg-gray-100"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"coverColor"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-[var(--dark-500)]">
                Primary Color
              </FormLabel>
              <FormControl>
                <ColorPicker
                  onPickerChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-[var(--dark-500)]">
                Book Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Book description"
                  {...field}
                  rows={10}
                  className="min-h-30 border border-[var(--gray-100)] bg-white p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"summary"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-[var(--dark-500)]">
                Book Summary
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Book summary"
                  {...field}
                  rows={5}
                  className="min-h-30 border border-[var(--gray-100)] bg-white p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isSubmitting}
          type="submit"
          className="min-h-14 w-full cursor-pointer bg-[var(--primary-admin)] text-white hover:bg-[var(--primary-admin)]/95"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {"Adding"}
            </>
          ) : (
            "Add Book to Library"
          )}
        </Button>
      </form>
    </Form>
  );
};
export default BookForm;
