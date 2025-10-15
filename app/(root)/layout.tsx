import { auth } from "@/auth";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

async function layout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <main className="bg-pattern xs:px-10 md:px-16; flex min-h-screen flex-1 flex-col bg-[var(--dark-500)] bg-cover bg-top px-5">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
}

export default layout;
