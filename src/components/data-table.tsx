import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/hooks/useProducts";
import { Button } from "@/components/ui/buttonUi";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";

interface DataTableProps {
  products: Product[];
  withPagination?: boolean;
  itemsPerPage?: number;
}

export function DataTable({
  products,
  withPagination = true,
  itemsPerPage = 5,
}: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const formatPrice = (price: number) => formatCurrency(price);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const displayedProducts = withPagination
    ? products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : products;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">ID</TableHead>
            <TableHead className="w-[80px]">Imagem</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead className="text-right">Preço</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>
                  <Image
                    src={product.image}
                    alt={product.nome}
                    width={40}
                    height={45}
                  />
                </TableCell>

                <TableCell>{product.nome}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">
                  {formatPrice(product.price)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Nenhum produto encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {withPagination && totalPages > 1 && (
        <div className="flex justify-end gap-1.5 mt-4">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            <ChevronsLeft size={20} />
          </Button>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <ChevronLeft size={20} />
          </Button>
          <span className="flex text-sm mx-2 items-center">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <ChevronRight size={20} />
          </Button>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            <ChevronsRight size={20} />
          </Button>
        </div>
      )}
    </div>
  );
}
