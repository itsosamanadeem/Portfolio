import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarWrapper from "@/components/SidebarWrapper";

export default function AdminLayoutWrapper({ children }) {
  return (
    <SidebarProvider>
      <SidebarWrapper />
      {children}
    </SidebarProvider>
  );
}
