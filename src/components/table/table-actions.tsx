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
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface TableActionsProps {
  item: Product | User;
  type: "products" | "users";
}

export function TableActions({ item, type }: TableActionsProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    telefone: "",
    cpf: "",
    rua: "",
    cidade: "",
    estado: "",
    cep: "",
    cargo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deleteUser = async (id: unknown) => {
    try {
      const res = await fetch("/api/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Erro desconhecido");
      }

      window.location.reload();

      toast.success("Usuário excluido com sucesso!");
    } catch (err: any) {
      toast.error("Erro ao deletar usuário:" + err.message);
    }
  };
  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedFields = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value.trim() !== "")
    );

    if (Object.keys(updatedFields).length === 0) {
      toast.warning("Nenhum dado alterado.");
      return;
    }

    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedFields, id: (item as User).id }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Erro desconhecido");
      }

      window.location.reload();

      toast.success("Usuário atualizado com sucesso!");
    } catch (err: any) {
      toast.error("Erro ao cadastrar: " + err.message);
    }
  };

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
                onChange={handleChange}
                defaultValue={formatCurrency((item as Product).price)}
              />

              <Label className="-mb-1.5">Categoria</Label>
              <Input
                type="text"
                onChange={handleChange}
                defaultValue={(item as Product).categoryName}
                readOnly
              />
              <Label className="-mb-1.5">Promoção</Label>
              <Input
                type="text"
                onChange={handleChange}
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
            <Button onClick={updateUser} className="text-white">
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
