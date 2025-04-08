import { useEffect, useState } from "react";

export interface Category {
  id: number;
  nome: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categoria");
        const data = await response.json();
        console.log(data);

        const categoryList: Category[] = data.map((item: any) => ({
          id: item.id,
          nome: item.nome,
        }));

        setCategories(categoryList);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, []);

  return categories;
}
