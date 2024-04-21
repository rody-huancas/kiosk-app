"use client";

import LatesOrderItem from "@/components/order/LatesOrderItem";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import useSWR from "swr";

export default function OrdersPage() {
  const url = "/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });

  if (isLoading) return <p>Cargando...</p>;

  if (data)
    return (
      <>
        <h1 className="text-center mt-20 text-6xl font-black text-gray-900/90">
          Ordenes Listas
        </h1>
        <Logo />

        {data.length ? (
          <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
            {data.map((order) => (
              <LatesOrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center my-10">No hay ordenes listas</p>
        )}
      </>
    );
}
