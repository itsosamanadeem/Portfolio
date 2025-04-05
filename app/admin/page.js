"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation"; 
import LoginPage from "@/components/adminpanel/login";

export default function Admin() {
  const router = useRouter();
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin/adminpanel/project", 
    });
  };

  return (
    <>
      <LoginPage handleLogin={handleLogin} error={error} setEmail={setEmail} setPassword={setPassword} email={email} password={password}/>
    </>
  );
}
