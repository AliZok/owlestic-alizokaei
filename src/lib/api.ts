import type { Order } from "@/types/order"

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: "1",
    name: "کیبورد A4tech",
    date: "456",
    total: 600000,
    status: "delivered",
  },
  {
    id: "2",
    name: "اسپیکر Creative",
    date: "53",
    total: 5500000,
    status: "delivered",
  },
  {
    id: "3",
    name: "تلویزیون SONY",
    date: "166",
    total: 25000000,
    status: "ready",
  },
  {
    id: "4",
    name: "ساعت هوشمند",
    date: "150",
    total: 4500000,
    status: "pending",
  },
  {
    id: "5",
    name: "آیفون 16",
    date: "60",
    total: 120000000,
    status: "cancelled",
  },
  {
    id: "6",
    name: "مانیتور Samsung",
    date: "100",
    total: 23000000,
    status: "delivered",
  },
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchOrdersApi(): Promise<Order[]> {

  await delay(1000)

  return [...mockOrders]
}

export async function updateOrderStatusApi(orderId: string, status: string): Promise<Order> {

  const order = mockOrders.find((o) => o.id === orderId)
  if (!order) {
    throw new Error(`Order with ID ${orderId} not found`)
  }

  order.status = status
  return { ...order }
}

export async function fetchOrderApi(orderId: string): Promise<Order> {
  // Simulate API call
  await delay(800)

  const order = mockOrders.find((o) => o.id === orderId)
  if (!order) {
    throw new Error(`Order with ID ${orderId} not found`)
  }

  return { ...order }
}

