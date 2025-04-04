"use client";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset } from "@/components/ui/sidebar";

import HeadingTitle from "@/components/ui/heading";
import { useProducts } from "@/hooks/useProducts";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/buttonUi";
import Link from "next/link";
interface Props {
  categoryId: string;
}
export default function Products({ categoryId }: Props) {
  const products = useProducts(categoryId);
  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex px-4 lg:px-6 flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex items-center justify-between">
              <HeadingTitle>Produtos</HeadingTitle>
              <Link href="/products/register">
                <Button>Adicionar Usuário</Button>
              </Link>
            </div>
            <DataTable
              data={products}
              type="products"
              withPagination
              itemsPerPage={20}
            />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
