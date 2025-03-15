import type { Metadata } from "next"
import { OrdersProvider } from "@/context/orders-context"
import Dashboard from "../components/dashboard/dashboard"

export const metadata: Metadata = {
  title: "الستیک",
  description: "داشبورد فروش اجناس",
}

export default function Page() {
  return (
    <OrdersProvider>
      <Dashboard />
    </OrdersProvider>
  )
}

