"use client"

import * as React from "react"
import {
  IconLayoutDashboard,
  IconPackage,
  IconUsers,
  IconSettings,
  IconBrowser,
  IconShoppingCart,
  IconFolders
} from "@tabler/icons-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavSecondary } from "@/components/sidebar/nav-secondary"
import { NavUser } from "@/components/sidebar/nav-user"
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
      title: "Pedidos",
      url: "/orders",
      icon: IconShoppingCart,
    },
    {
      title: "Conteúdo do Site",
      url: "/content",
      icon: IconBrowser, 
    },
    {
      title: "Usuários",
      url: "/users",
      icon: IconUsers, 
    },
    {
      title: "Categorias",
      url: "/categories",
      icon: IconFolders, 
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
                <Image src="/logo1.png" alt="Logo DevStore" width={130} height={32} />
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
