import Header from "@/components/Header";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-pattern xs:px-10 md:px-16; flex min-h-screen flex-1 flex-col bg-[var(--dark-500)] bg-cover bg-top px-5">
      <div className="mx-auto max-w-7xl">
        <Header />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
}

export default layout;
