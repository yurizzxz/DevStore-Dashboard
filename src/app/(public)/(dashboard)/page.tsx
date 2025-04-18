"use client";
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import { SectionCards } from "@/components/dashboard/section-cards";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import {HeadingTitle} from "@/components/ui/heading";
import { useProducts } from "@/hooks/products/useProducts";
import { DataTable } from "@/components/table/data-table";

interface Props {
  categoryId: string;
}

export default function Dashboard({ categoryId }: Props) {
  const products = useProducts(categoryId);

  return (
    <SidebarInset>
      <SiteHeader />

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex px-4 lg:px-6 flex-col gap-4 py-4 md:gap-6 md:py-6">
            <HeadingTitle>Hi, Welcome Back! 👋</HeadingTitle>
            <SectionCards />
            <div className="">
              <ChartAreaInteractive />
            </div>
            <DataTable data={products} type="products" itemsPerPage={7} />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
