import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { Button } from "@/components/ui/buttonUi";
import { Pencil, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Product, User } from "./data-table";
import { formatCurrency } from "@/utils/formatCurrency";

interface TableActionsProps {
  item: Product | User;
  type: "products" | "users";
}
export function TableActions({ item, type }: TableActionsProps) {
  return (
    <div className="flex justify-end items-center gap-2">
      {/* Botão de Edição */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">
            <Pencil className="size-4.5" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Editar {type === "products" ? "Produto" : "Usuário"}
            </DialogTitle>
            <DialogDescription>
              Faça as alterações necessárias e salve.
            </DialogDescription>
          </DialogHeader>

          {type === "products" && (
            <>
              <Label className="-mb-1.5">Nome</Label>
              <Input type="text" defaultValue={(item as Product).nome} />

              <Label className="-mb-1.5">Preço</Label>
              <Input
                type="text"
                defaultValue={formatCurrency((item as Product).price)}
              />

              <Label className="-mb-1.5">Categoria</Label>
              <Input
                type="text"
                defaultValue={(item as Product).categoryName}
                readOnly
              />
              <Label className="-mb-1.5">Promoção</Label>
              <Input
                type="text"
                defaultValue={(item as Product).category2Name}
                readOnly
              />
            </>
          )}

          {type === "users" && (
            <>
              <Label className="-mb-1.5">Nome</Label>
              <Input type="text" defaultValue={(item as User).nome} />
              <Label className="-mb-1.5">Email</Label>
              <Input type="email" defaultValue={(item as User).email} />
              <Label className="-mb-1.5">Telefone</Label>
              <Input type="text" defaultValue={(item as User).telefone} />
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="cursor-pointer bg-card hover:bg-[#f50000]">
            <Trash2 className="size-4.5" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tem certeza?</DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancelar</Button>
            <Button className="bg-[#f50000] text-white">Excluir</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
