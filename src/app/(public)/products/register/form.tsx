import { Button } from "@/components/ui/buttonUi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor="nome">Nome</Label>
        <Input className="h-11" placeholder="Insira o Nome" type="text" id="nome" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="price">Preço</Label>
        <Input className="h-11" placeholder="Insira o Preço" type="text" id="price" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="categoryName">Categoria</Label>
        <Input className="h-11" placeholder="Insira a Categoria" type="text" id="categoryName" readOnly />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="category2Name">Promoção</Label>
        <Input className="h-11" placeholder="Insira a Promoção" type="text" id="category2Name" />
      </div>
      <Button>Cadastrar Usuário</Button>
    </>
  );
}
