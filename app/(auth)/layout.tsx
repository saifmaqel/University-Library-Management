import { auth } from "@/auth";
import { BookA } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

async function layout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <main className="relative flex flex-col-reverse text-[var(--light-100)] sm:flex-row">
      <section className="bg-pattern my-auto flex h-full min-h-screen flex-1 items-center bg-[var(--dark-500)] bg-cover bg-top px-5 py-10">
        <div className="gradient-vertical mx-auto flex max-w-xl flex-col gap-6 rounded-lg p-10">
          <div className="flex flex-row items-center gap-2">
            <BookA height={40} width={40} />
            <h1 className="text-2xl font-semibold text-white">BookWize</h1>
          </div>
          {children}
        </div>
      </section>
      <section className="sticky h-40 w-full sm:top-0 sm:h-screen sm:flex-1">
        <Image
          src={"/images/auth-illustration.png"}
          alt="auth image"
          height={1000}
          width={1000}
          className="size-full object-cover"
        />
      </section>
    </main>
  );
}

export default layout;
