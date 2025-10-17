import { Session } from "next-auth";
import React from "react";

function Header({ session }: { session: Session }) {
  return (
    <header className="mb-5 flex flex-col items-start justify-between gap-5 sm:mb-10 lg:flex-row lg:items-end">
      <div>
        <h2 className="text-2xl font-semibold text-shadow-neutral-600">
          {session.user?.name}
        </h2>
        <p className="text-base text-slate-500">
          Monitor all of your users and books hear
        </p>
      </div>
      <p>search</p>
    </header>
  );
}

export default Header;
