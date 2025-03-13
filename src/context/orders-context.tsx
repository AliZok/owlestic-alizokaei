"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback } from "react"
import type { Order } from "@/types/order"
import { fetchOrdersApi, updateOrderStatusApi } from "@/lib/api"

interface OrdersContextType {
  orders: Order[]
  loading: boolean
  error: string | null
  fetchOrders: () => Promise<void>
  updateOrderStatus: (orderId: string, status: string) => Promise<void>
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchOrdersApi()
      setOrders(data)
    } catch (err) {
      setError("Failed to fetch orders. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const updateOrderStatus = useCallback(async (orderId: string, status: string) => {
    try {
      await updateOrderStatusApi(orderId, status)
      setOrders((prevOrders) => prevOrders.map((order) => (order.id === orderId ? { ...order, status } : order)))
    } catch (err) {
      console.error("Failed to update order status:", err)
      // You could add error handling here
    }
  }, [])

  return (
    <OrdersContext.Provider
      value={{
        orders,
        loading,
        error,
        fetchOrders,
        updateOrderStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider")
  }
  return context
}

