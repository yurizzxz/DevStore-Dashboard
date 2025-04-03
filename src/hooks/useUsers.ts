import { useEffect, useState } from "react";

export interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  rua: string;
  cidade: string;
  estado: string;
  cep: string;
  cargo: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        console.log(data);

        const userList = data.map((user: any) => ({
          id: user.id,
          nome: user.nome,
          email: user.email,
          telefone: user.telefone,
          cpf: user.cpf,
          rua: user.rua,
          cidade: user.cidade,
          estado: user.estado,
          cep: user.cep,
          cargo: user.cargo,
        }));

        setUsers(userList);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  return users;
}
