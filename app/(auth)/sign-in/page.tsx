"use client";
import AuthForm from "@/components/AuthForm";
import { SignInData, signInSchema } from "@/lib/validations";
import React from "react";

function page() {
  return (
    <AuthForm<SignInData>
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={() => {}}
    />
  );
}

export default page;
