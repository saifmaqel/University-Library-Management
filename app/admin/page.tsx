import { redirect } from "next/navigation";
import React from "react";

function page() {
  redirect("/admin/books");
  return <div>main admin dashboared</div>;
}

export default page;
