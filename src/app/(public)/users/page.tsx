'use client'
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset } from "@/components/ui/sidebar";

import HeadingTitle from "@/components/ui/heading";
import { DataTable } from "@/components/table/data-table";
import { useUsers } from "@/hooks/useUsers";

export default function Products() {
    const users = useUsers();
  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex px-4 lg:px-6 flex-col gap-4 py-4 md:gap-6 md:py-6">
            <HeadingTitle>Usuários</HeadingTitle>
            <DataTable data={users} type="users" withPagination itemsPerPage={20} />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
