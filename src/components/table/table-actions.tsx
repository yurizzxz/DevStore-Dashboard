'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/dialog";
import { Button } from "@/components/ui/buttonUi";
import { Pencil, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Product, User } from "./data-table";
import { formatCurrency } from "@/utils/formatCurrency";
import { useUserActions } from "@/hooks/useUserActions"; 

interface TableActionsProps {
  item: Product | User;
  type: "products" | "users";
}

export function TableActions({ item, type }: TableActionsProps) {
  const { formData, handleChange, deleteUser, updateUser } = useUserActions();

  return (
    <div className="flex justify-end items-center gap-1">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="cursor-pointer w-8 h-8">
            <Pencil className="size-4" />
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
              <Label className="-mb-1.5">Especificações</Label>
              <Input
                type="text"
                defaultValue={(item as Product).specifications}
              />
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
              />
            </>
          )}

          {type === "users" && (
            <>
              <Label className="-mb-1.5">Nome</Label>
              <Input
                className="h-11"
                type="text"
                name="nome"
                onChange={handleChange}
                defaultValue={(item as User).nome}
              />
              <Label className="-mb-1.5">Email</Label>
              <Input
                className="h-11"
                name="email"
                type="email"
                defaultValue={(item as User).email}
              />
              <Label className="-mb-1.5">CPF</Label>
              <Input
                className="h-11"
                name="cpf"
                onChange={handleChange}
                defaultValue={(item as User).cpf}
              />
              <Label className="-mb-1.5">Telefone</Label>
              <Input
                className="h-11"
                type="text"
                name="telefone"
                onChange={handleChange}
                defaultValue={(item as User).telefone}
              />
              <Label className="-mb-1.5">Cidade</Label>
              <Input
                className="h-11"
                type="text"
                name="cidade"
                onChange={handleChange}
                defaultValue={(item as User).cidade}
              />
              <Label className="-mb-1.5">Cargo</Label>
              <Input
                className="h-11"
                type="text"
                name="cargo"
                onChange={handleChange}
                defaultValue={(item as User).cargo}
              />
            </>
          )}
          <DialogFooter>
            <Button
              onClick={(e) => updateUser(e, (item as User).id)}
              className="text-white"
            >
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="cursor-pointer w-8 h-8 hover:bg-[#f50000]"
          >
            <Trash2 className="size" />
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
            <Button variant="destructive" onClick={() => deleteUser(item.id)}>
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
