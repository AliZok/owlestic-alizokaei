import type { Order } from "@/types/order"

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: "1",
    customer: {
      id: "CUST-001",
      name: "کیبورد A4tech",
      email: "john.doe@example.com",
    },
    date: "456",
    total: 600000,
    status: "delivered",
  },
  {
    id: "2",
    customer: {
      id: "CUST-002",
      name: "اسپیکر Creative",
      email: "jane.smith@example.com",
    },
    date: "53",
    total: 5500000,
    status: "delivered",
  },
  {
    id: "3",
    customer: {
      id: "CUST-003",
      name: "تلویزیون SONY",
      email: "robert.johnson@example.com",
    },
    date: "166",
    total: 25000000,
    status: "ready",
  },
  {
    id: "4",
    customer: {
      id: "CUST-004",
      name: "ساعت هوشمند",
      email: "emily.davis@example.com",
    },
    date: "150",
    total: 4500000,
    status: "pending",
  },
  {
    id: "5",
    customer: {
      id: "CUST-005",
      name: "آیفون 16",
      email: "michael.wilson@example.com",
    },
    date: "60",
    total: 120000000,
    status: "cancelled",
  },
  {
    id: "6",
    customer: {
      id: "6",
      name: "مانیتور Samsung",
      email: "sarah.brown@example.com",
    },
    date: "100",
    total: 23000000,
    status: "delivered",
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Fetch all orders
export async function fetchOrdersApi(): Promise<Order[]> {

  await delay(1000)

  return [...mockOrders]
}

// Update order status
export async function updateOrderStatusApi(orderId: string, status: string): Promise<Order> {
  // Simulate API call
  await delay(500)

  const order = mockOrders.find((o) => o.id === orderId)
  if (!order) {
    throw new Error(`Order with ID ${orderId} not found`)
  }

  order.status = status
  return { ...order }
}

// Fetch single order
export async function fetchOrderApi(orderId: string): Promise<Order> {
  // Simulate API call
  await delay(800)

  const order = mockOrders.find((o) => o.id === orderId)
  if (!order) {
    throw new Error(`Order with ID ${orderId} not found`)
  }

  return { ...order }
}

