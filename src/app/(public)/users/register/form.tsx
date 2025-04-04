"use client";

import { Button } from "@/components/ui/buttonUi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {

  return (
    <>
      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-2">
            <Label>Nome</Label>
            <Input type="text" className="h-11" placeholder="Nome completo" />

            <Label>Email</Label>
            <Input className="h-11" type="email" placeholder="Email" />

            <Label>Senha</Label>
            <Input className="h-11" type="password" placeholder="Senha" />

            <Label>Telefone</Label>
            <Input type="text" className="h-11" placeholder="Telefone" />

            <Label>CPF</Label>
            <Input type="text" className="h-11" placeholder="CPF" />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Rua</Label>
            <Input type="text" className="h-11" placeholder="Rua" />

            <Label>Cidade</Label>
            <Input type="text" className="h-11" placeholder="Cidade" />

            <Label>Estado</Label>
            <Input type="text" className="h-11" placeholder="Estado" />

            <Label>CEP</Label>
            <Input type="text" className="h-11" placeholder="CEP" />

            <Label>Cargo</Label>
            <Input type="text" className="h-11" placeholder="Cargo" />
          </div>
        </div>

        <Button type="submit">Cadastrar</Button>
      </form>

    </>
  );
}
