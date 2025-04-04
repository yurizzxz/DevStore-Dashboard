import { Button } from "@/components/ui/buttonUi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  return (
    <>
      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              className="h-11"
              placeholder="Insira o Nome"
              type="text"
              id="name"
            />

            <Label htmlFor="name">Email</Label>
            <Input
              className="h-11"
              placeholder="Insira o Email"
              type="text"
              id="name"
            />

            <Label htmlFor="telefone">Telefone</Label>
            <Input
              className="h-11"
              placeholder="Insira o Telefone"
              type="text"
              id="telefone"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              className="h-11"
              placeholder="Insira o CPF"
              type="text"
              id="cpf"
            />

            <div className="flex flex-col gap-2">
              <Label htmlFor="cidade">Cidade</Label>
              <Input
                className="h-11"
                placeholder="Insira o CPF"
                type="text"
                id="cidade"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="cargo">Cargo</Label>
              <Input
                className="h-11"
                placeholder="Insira o Cargo"
                type="text"
                id="cargo"
              />
            </div>
          </div>
        </div>
        <Button>Cadastrar Produto</Button>
      </form>
    </>
  );
}
