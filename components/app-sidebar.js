import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Icon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./theme-btn";

const items = [
  {
    title: "Project",
    url: "/admin/adminpanel/project",

    // image: "/images/briefcase.png", 
  },
  {
    title: "Blog",
    url: "/admin/adminpanel/blog",
    // image: "/images/file-text.png",
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-64 bg-gray-900  shadow-lg">
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold ">
            Admin Panel
          </SidebarGroupLabel>
          <ModeToggle />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-3">
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition">
                      {/* <Image src={item.image} alt={item.title} width={30} height={30} className="rounded-md" /> */}
                      <span className=" text-base font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
