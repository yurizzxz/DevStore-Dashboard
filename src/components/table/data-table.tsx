import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import { TableActions } from "./table-actions";
import { Pagination } from "./pagination";

export interface Product {
  id: number;
  nome: string;
  specifications: string;
  image: string;
  price: number;
  estoque: number;
  categoryName?: string;
  category2Name?: string;
  category?: number;
  category2?: number;
}

export interface User {
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

const getCategoryName = (categoryId?: number) => {
  const categories: { [key: number]: string } = {
    1: "Processador",
    2: "Placa de Vídeo",
    3: "Memória RAM",
    4: "Notebook",
    5: "Mais Vendidos",
    6: "Promoções do Dia",
    7: "Promoção 1",
  };

  return categories[categoryId || 0] || "Null";
};

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
            <TableHead className="w-10">ID</TableHead>
            {type === "products" && <TableHead className="w-15">Img</TableHead>}
            <TableHead className="w-50">Nome</TableHead>
            {type === "products" && <TableHead  className="w-35">Especificações</TableHead>}
            {type === "products" && <TableHead className="w-33">Categoria</TableHead>}
            {type === "products" && <TableHead className="w-42">Promoção</TableHead>}
            {type === "products" && <TableHead className="w-30">Estoque</TableHead>}
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
                      width={35}
                      height={35}
                    />
                  </TableCell>
                )}

                <TableCell>
                  {item.nome.length > 10
                    ? item.nome.slice(0, 15) + "..."
                    : item.nome}
                </TableCell>

                {type === "products" && (
                  <>
                    <TableCell>
                      {(item as Product).specifications.length > 10
                        ? (item as Product).specifications.slice(0, 10) + "..."
                        : (item as Product).specifications}
                    </TableCell>

                    <TableCell>
                      {(item as Product).category === 1 && "Processador"}
                      {(item as Product).category === 2 && "Placa de Vídeo"}
                      {(item as Product).category === 3 && "Memória RAM"}
                      {(item as Product).category === 4 && "Notebook"}
                    </TableCell>
                    <TableCell>
                      {(item as Product).category2 === 5
                        ? "Mais Vendidos"
                        : (item as Product).category2 === 6
                        ? "Promoções do Dia"
                        : (item as Product).category2 === 7
                        ? "Promoção 1"
                        : (item as Product).category2 || "Null"}
                    </TableCell>
                    <TableCell>{(item as Product).estoque}</TableCell>
                    <TableCell>
                      {formatCurrency((item as Product).price)}
                    </TableCell>
                  </>
                )}

                {type === "users" && (
                  <TableCell>{(item as User).email}</TableCell>
                )}
                {type === "users" && (
                  <TableCell>{(item as User).telefone}</TableCell>
                )}
                {type === "users" && (
                  <TableCell>{(item as User).cpf}</TableCell>
                )}
                {type === "users" && (
                  <TableCell>{(item as User).cidade}</TableCell>
                )}
                {type === "users" && (
                  <TableCell>{(item as User).cargo}</TableCell>
                )}

                <TableCell className="text-right">
                  <TableActions
                    item={{
                      ...item,
                      categoryName: getCategoryName((item as Product).category),
                      category2Name: getCategoryName(
                        (item as Product).category2
                      ),
                    }}
                    type={type}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="mt-5">
              <TableCell colSpan={type === "products" ? 7 : 6}>
                Nenhum {type === "products" ? "produto" : "usuário"} encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {withPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
