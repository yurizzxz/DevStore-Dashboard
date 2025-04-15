"use client";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import {HeadingTitle} from "@/components/ui/heading";
import { DataTable } from "@/components/table/data-table";
import { useOrders } from "@/hooks/orders/useOrders";

export default function Page() {
  const orders = useOrders();

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex px-4 lg:px-6 flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex items-center justify-between">
              <HeadingTitle>Pedidos</HeadingTitle>
              {/*<div className="flex items-center gap-4">
             
                <Link href="/orders/register">
                  <Button>Criar Pedido</Button>
                </Link>
              </div>
              */}
            </div>
            <DataTable
              data={orders}
              type="orders"
              withPagination
              itemsPerPage={20}
            />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
