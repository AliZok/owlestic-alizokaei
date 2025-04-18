import type { Order } from "@/types/order"

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: "1",
    name: "کیبورد A4tech",
    number: 6,
    total: 600000,
    status: "delivered",
  },
  {
    id: "2",
    name: "اسپیکر Creative",
    number: 5,
    total: 5500000,
    status: "delivered",
  },
  {
    id: "3",
    name: "تلویزیون SONY",
    number: 16,
    total: 25000000,
    status: "ready",
  },
  {
    id: "4",
    name: "ساعت هوشمند",
    number: 10,
    total: 4500000,
    status: "pending",
  },
  {
    id: "5",
    name: "آیفون 16",
    number: 7,
    total: 120000000,
    status: "cancelled",
  },
  {
    id: "6",
    name: "مانیتور Samsung",
    number: 2,
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

