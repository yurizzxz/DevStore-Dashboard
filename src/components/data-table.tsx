import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/hooks/useProducts";

interface DataTableProps {
  products: Product[];
}

export function DataTable({ products }: DataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead className="text-right">Preço</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length > 0 ? (
          products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>{product.nome}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-right">
                ${product.price.toFixed(2)}
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
  );
}
