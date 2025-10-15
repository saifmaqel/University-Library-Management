"use client";
import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { SignUpData, signUpSchema } from "@/lib/validations";
import React from "react";

function page() {
  return (
    <AuthForm<SignUpData>
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        fullName: "",
        email: "",
        password: "",
        universityId: 0,
        universityCard: "test"
      }}
      onSubmit={signUp}
    />
  );
}

export default page;
