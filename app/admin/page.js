"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import LoginPage from "@/components/adminpanel/login";

export default function Admin() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (email === "osamanadeem20@gmail.com" && password === "8008") {
      sessionStorage.setItem("isLoggedIn", "true");
      router.push("/admin/adminpanel/project/");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <>
      <LoginPage handleLogin={handleLogin} error={error}/>
    </>
  );
}
