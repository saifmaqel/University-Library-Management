"use client";
import AuthForm from "@/components/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth";
import { SignInData, signInSchema } from "@/lib/validations";
import React from "react";

function page() {
  return (
    <AuthForm<SignInData>
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={signInWithCredentials}
    />
  );
}

export default page;
