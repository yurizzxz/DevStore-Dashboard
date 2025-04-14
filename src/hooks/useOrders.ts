import { useEffect, useState } from "react";

export interface Order {
  id: number;
  user_id: number;
  total: number;
  status: string;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        const data = await response.json();
        console.log(data);

        const orderList = data.map((order: any) => ({
          
          id: order.id,
          user_id: order.user_id,
          total: order.total,
          status: order.status,
        }));
        
        console.log(orderList),
        setOrders(orderList);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    };

    fetchOrders();
  }, []);

  return orders;
}
