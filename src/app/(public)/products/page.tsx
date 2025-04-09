"use client";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import {HeadingTitle} from "@/components/ui/heading";
import { useProducts } from "@/hooks/useProducts";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/buttonUi";
import Link from "next/link";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
interface Props {
  categoryId: string;
}
export default function Products({ categoryId }: Props) {
  const products = useProducts(categoryId);

  const [productFilter, setProductFilter] = useState("all");

  const filteredProducts = products.filter((product) => {
    if (productFilter === "all") return true;
    return String(product.category).toLowerCase() === productFilter;
  });
  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex px-4 lg:px-6 flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex items-center justify-between">
              <HeadingTitle>Produtos</HeadingTitle>

              <div className="flex items-center gap-4">
                <div className="w-full max-w-xs">
                  <Select
                    value={productFilter}
                    onValueChange={setProductFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrar por categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="1">Processadores</SelectItem>
                      <SelectItem value="2">Placas de Video</SelectItem>
                      <SelectItem value="3">Memorias RAM</SelectItem>
                      <SelectItem value="4">Notebooks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>{" "}
                <Link href="/products/register">
                  <Button>Adicionar Produto</Button>
                </Link>
              </div>
            </div>
            <DataTable
              data={filteredProducts}
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
