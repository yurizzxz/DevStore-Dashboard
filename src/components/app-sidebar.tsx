"use client"

import * as React from "react"
import {
  IconLayoutDashboard,
  IconPackage,
  IconUsers,
  IconUserCog,
  IconFolder,
  IconSettings
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconLayoutDashboard,  
    },
    {
      title: "Produtos",
      url: "/products",
      icon: IconPackage, 
    },
    {
      title: "Usuários",
      url: "/users",
      icon: IconUsers, 
    },
    {
      title: "Administradores",
      url: "/admins",
      icon: IconUserCog, 
    },
  ],
  navSecondary: [
    {
      title: "Configurações",
      url: "#",
      icon: IconSettings, 
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="p-1.5 -ml-1 mt-3">
              <Link href="/" className="inset" aria-label="Clique para ir à Página Inicial">
                <Image src="/logo1.png" alt="Logo DevStore" width={150} height={32} />
              </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator className="-ml-[0.5px] mt-2 mb-3.5" />
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarSeparator className="-ml-[0.5px]" />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
