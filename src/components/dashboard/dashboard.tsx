"use client"

import { useEffect, useState } from "react"
import { useOrders } from "@/context/orders-context"
import { OrdersTable } from "@/components/dashboard/orders-table"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import DashboardTemplate from "@/components/dashboard/dashboard-template"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const { orders, loading, error, fetchOrders } = useOrders()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === null || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  if (error) {
    return (
      <DashboardTemplate>
        <DashboardHeader heading="سفارشات" text="مدیریت سفارشات مشتریان" className='mb-2'/>
        <div className="flex flex-col justify-center items-center space-y-4 py-12">
          <p className="text-muted-foreground">Failed to load orders: {error}</p>
          <Button onClick={() => fetchOrders()}>Try Again</Button>
        </div>
      </DashboardTemplate>
    )
  }

  return (
    <DashboardTemplate>
      <DashboardHeader heading="سفارشات" text="مدیریت سفارشات مشتریان"  className='mb-2' />
  
        <>
          <DashboardStats orders={orders} />
          <div className="space-y-4">
            <OrdersTable
              orders={filteredOrders}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />
          </div>
        </>
      
    </DashboardTemplate>
  )
}

