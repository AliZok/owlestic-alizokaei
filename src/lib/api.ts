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
    items: [
      { id: "ITEM-001", name: "Product A", price: 29.99, quantity: 2 },
      { id: "ITEM-002", name: "Product B", price: 49.99, quantity: 1 },
    ],
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
    items: [{ id: "ITEM-003", name: "Product C", price: 19.99, quantity: 3 }],
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
    items: [
      { id: "ITEM-004", name: "Product D", price: 99.99, quantity: 1 },
      { id: "ITEM-005", name: "Product E", price: 14.99, quantity: 2 },
    ],
    total: 25000000,
    status: "processing",
  },
  {
    id: "4",
    customer: {
      id: "CUST-004",
      name: "ساعت هوشمند",
      email: "emily.davis@example.com",
    },
    date: "150",
    items: [{ id: "ITEM-006", name: "Product F", price: 79.99, quantity: 1 }],
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
    items: [
      { id: "ITEM-007", name: "Product G", price: 39.99, quantity: 2 },
      { id: "ITEM-008", name: "Product H", price: 24.99, quantity: 1 },
    ],
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
    items: [{ id: "ITEM-009", name: "Product I", price: 59.99, quantity: 1 }],
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

