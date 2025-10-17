import { auth } from "@/auth";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
async function layout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then((res) => res[0].isAdmin === "ADMIN");

  console.log(isAdmin);

  if (!isAdmin) redirect("/");

  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar session={session} />
      <div className="xs:p-10 flex w-[calc(100%-264px)] flex-1 flex-col bg-[var(--light-600)] p-5">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
}

export default layout;
