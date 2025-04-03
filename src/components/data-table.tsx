import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/buttonUi";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";

interface Product {
  id: number;
  nome: string;
  image: string;
  price: number;
  category?: number;
  category2?: number;
}

interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  cidade: string;
  cargo: string;
}

interface DataTableProps {
  data: Product[] | User[];
  type: "products" | "users";
  withPagination?: boolean;
  itemsPerPage?: number;
}

export function DataTable({
  data,
  type,
  withPagination = true,
  itemsPerPage = 5,
}: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const displayedData = withPagination
    ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : data;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            {type === "products" && <TableHead>Imagem</TableHead>}
            <TableHead>Nome</TableHead>
            {type === "products" && <TableHead>Categoria</TableHead>}
            {type === "products" && <TableHead>Promoção</TableHead>}
            {type === "products" && <TableHead>Preço</TableHead>}
            {type === "users" && <TableHead>Email</TableHead>}
            {type === "users" && <TableHead>Telefone</TableHead>}
            {type === "users" && <TableHead>CPF</TableHead>}
            {type === "users" && <TableHead>Cidade</TableHead>}
            {type === "users" && <TableHead>Cargo</TableHead>}
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedData.length > 0 ? (
            displayedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>

                {type === "products" && (
                  <TableCell>
                    <Image
                      src={(item as Product).image}
                      alt={item.nome}
                      width={40}
                      height={45}
                    />
                  </TableCell>
                )}

                <TableCell>{item.nome}</TableCell>

                {type === "products" && (
                  <TableCell>
                    {(item as Product).category === 1 && "Processador"}
                    {(item as Product).category === 2 && "Placa de Vídeo"}
                    {(item as Product).category === 3 && "Memória RAM"}
                    {(item as Product).category === 4 && "Notebook"}
                  </TableCell>
                )}

                {type === "products" && (
                  <TableCell>
                    {(item as Product).category2 === 5
                      ? "Mais Vendidos"
                      : (item as Product).category2 === 6
                      ? "Promoções do Dia"
                      : (item as Product).category2 === 7
                      ? "Promoção 1"
                      : (item as Product).category2 || "Null"}
                  </TableCell>
                )}

                {type === "products" && (
                  <TableCell>{formatCurrency((item as Product).price)}</TableCell>
                )}

                {type === "users" && <TableCell>{(item as User).email}</TableCell>}
                {type === "users" && <TableCell>{(item as User).telefone}</TableCell>}
                {type === "users" && <TableCell>{(item as User).cpf}</TableCell>}
                {type === "users" && <TableCell>{(item as User).cidade}</TableCell>}
                {type === "users" && <TableCell>{(item as User).cargo}</TableCell>}

                <TableCell className="text-right">Ação</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={type === "products" ? 7 : 6}>
                Nenhum {type === "products" ? "produto" : "usuário"} encontrado.
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
