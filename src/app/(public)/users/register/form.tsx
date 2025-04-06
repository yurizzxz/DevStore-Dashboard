"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/buttonUi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function RegisterForm() {
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

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        throw new Error(result.error || "Erro desconhecido");
      }

      router.push("/users");
  
      toast.success("Usuário cadastrado com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao cadastrar: " + error.message);
    }
  };
  
  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={createUser}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-2">
            <Label>Nome</Label>
            <Input name="nome" type="text" className="h-11" placeholder="Nome completo" onChange={handleChange} />

            <Label>Email</Label>
            <Input name="email" type="email" className="h-11" placeholder="Email" onChange={handleChange} />

            <Label>Senha</Label>
            <Input name="password" type="password" className="h-11" placeholder="Senha" onChange={handleChange} />

            <Label>Telefone</Label>
            <Input name="telefone" type="text" className="h-11" placeholder="Telefone" onChange={handleChange} />

            <Label>CPF</Label>
            <Input name="cpf" type="text" className="h-11" placeholder="CPF" onChange={handleChange} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Rua</Label>
            <Input name="rua" type="text" className="h-11" placeholder="Rua" onChange={handleChange} />

            <Label>Cidade</Label>
            <Input name="cidade" type="text" className="h-11" placeholder="Cidade" onChange={handleChange} />

            <Label>Estado</Label>
            <Input name="estado" type="text" className="h-11" placeholder="Estado" onChange={handleChange} />

            <Label>CEP</Label>
            <Input name="cep" type="text" className="h-11" placeholder="CEP" onChange={handleChange} />

            <Label>Cargo</Label>
            <Input name="cargo" type="text" className="h-11" placeholder="Cargo" onChange={handleChange} />
          </div>
        </div>

        <Button type="submit">Cadastrar</Button>
      </form>
    </>
  );
}
