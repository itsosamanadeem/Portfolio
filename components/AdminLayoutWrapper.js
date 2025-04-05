// components/AdminLayoutWrapper.jsx
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarWrapper from "@/components/SidebarWrapper";

const checkSession = async () => {
  const res = await fetch("/api/check-session", {
    method: "GET",
  });
  return res.status === 200;
};

export default function AdminLayoutWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const authenticated = await checkSession();
      if (!authenticated && pathname.startsWith("/admin")) {
        router.push("/admin");
      }
      setIsAuthenticated(authenticated);
      setLoading(false);
    };

    verifySession();
  }, [pathname]);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) return null; 

  return (
    <SidebarProvider>
      <SidebarWrapper />
      {children}
    </SidebarProvider>
  );
}
