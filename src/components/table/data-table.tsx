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

export interface Category {
  id: number;
  nome: string;
}

interface Column<T> {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
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

const tableConfigs = {
  products: [
    {
      key: "image",
      label: "Img",
      render: (item: Product) => (
        <Image src={item.image} alt={item.nome} width={35} height={35} />
      ),
    },
    {
      key: "nome",
      label: "Nome",
      render: (item: Product) =>
        item.nome.length > 10 ? item.nome.slice(0, 15) + "..." : item.nome,
    },
    {
      key: "specifications",
      label: "Especificações",
      render: (item: Product) =>
        item.specifications.length > 10
          ? item.specifications.slice(0, 10) + "..."
          : item.specifications,
    },
    {
      key: "category",
      label: "Categoria",
      render: (item: Product) => getCategoryName(item.category),
    },
    {
      key: "category2",
      label: "Promoção",
      render: (item: Product) => getCategoryName(item.category2),
    },
    {
      key: "estoque",
      label: "Estoque",
      render: (item: Product) => item.estoque,
    },
    {
      key: "price",
      label: "Preço",
      render: (item: Product) => formatCurrency(item.price),
    },
  ] as Column<Product>[],
  users: [
    {
      key: "nome",
      label: "Nome",
      render: (item: User) => item.nome,
    },
    {
      key: "email",
      label: "Email",
      render: (item: User) => item.email,
    },
    {
      key: "telefone",
      label: "Telefone",
      render: (item: User) => item.telefone,
    },
    {
      key: "cpf",
      label: "CPF",
      render: (item: User) => item.cpf,
    },
    {
      key: "cidade",
      label: "Cidade",
      render: (item: User) => item.cidade,
    },
    {
      key: "cargo",
      label: "Cargo",
      render: (item: User) => item.cargo,
    },
  ] as Column<User>[],
  categories: [
    {
      key: "nome",
      label: "Nome",
      render: (item: User) => item.nome,
    }
  ] as Column<Category>[],
};

interface DataTableProps<T> {
  data: T[];
  type: "products" | "users" | "categories";
  withPagination?: boolean;
  itemsPerPage?: number;
}

export function DataTable<T extends Product | User | Category>({
  data,
  type,
  withPagination = true,
  itemsPerPage = 5,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((data.length || 0) / itemsPerPage);
  const displayedData = withPagination
    ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : data;

  const columns = tableConfigs[type] as Column<T>[];

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">ID</TableHead>
            {columns.map((col) => (
              <TableHead key={col.key}>{col.label}</TableHead>
            ))}
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedData.length > 0 ? (
            displayedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                {columns.map((col) => (
                  <TableCell key={col.key}>{col.render(item)}</TableCell>
                ))}
                <TableCell className="text-right">
                  <TableActions
                    item={{
                      ...item,
                      categoryName: getCategoryName(
                        (item as Product).category
                      ),
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
            <TableRow>
              <TableCell colSpan={columns.length + 2}>
                Nenhum dado encontrado.
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
