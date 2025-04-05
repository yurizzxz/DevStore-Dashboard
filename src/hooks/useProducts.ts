import { useEffect, useState } from "react";

export interface Product {
  id: number;
  nome: string;
  description: string;
  price: number;
  image: string;
  estoque: number;
  category: number;
  specifications: string;
  category2: number;
}

export function useProducts(categoryId: string) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/produto");
        const data = await response.json();
        console.log(data); 

        const productList = data.map((product: any) => ({
          id: product.id,
          nome: product.nome,
          description: product.description,
          specifications: product.specifications,
          price: product.preco,
          category: product.categoriaId,
          estoque: product.estoque,
          image: product.foto,
          category2: product.categoriaId2,
        }));

        const filteredProducts = categoryId
          ? productList.filter(
              (product: Product) =>
                product.category === Number.parseInt(categoryId) ||
                product.category2 === Number.parseInt(categoryId)
            )
          : productList;

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return products;
}
