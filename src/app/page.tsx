import type { Metadata } from "next"
import { OrdersProvider } from "@/context/orders-context"
import Dashboard from "@/components/dashboard"

export const metadata: Metadata = {
  title: "Order Management Dashboard",
  description: "A dashboard for managing customer orders",
}

export default function Page() {
  return (
    <OrdersProvider>
      <Dashboard />
    </OrdersProvider>
  )
}

