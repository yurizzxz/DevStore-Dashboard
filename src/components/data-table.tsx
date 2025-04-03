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
            <TableHead>Promoção</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead className="text-right">Ações</TableHead>
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
                <TableCell>
                  {product.category === 1 && "Processador"}
                  {product.category === 2 && "Placa de Vídeo"}
                  {product.category === 3 && "Memória RAM"}
                  {product.category === 4 && "Notebook"}
                </TableCell>

                <TableCell>
                  {product.category2 ? product.category : "Null"}
                </TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell className="text-right">Action</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Nenhum produto encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {withPagination && totalPages > 1 && (
        <div className="flex justify-end gap-1 mt-4">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            <ChevronsLeft size={23} />
          </Button>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <ChevronLeft size={23} />
          </Button>
          <span className="flex text-sm mx-2 items-center">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <ChevronRight size={23} />
          </Button>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            <ChevronsRight size={23} />
          </Button>
        </div>
      )}
    </div>
  );
}
