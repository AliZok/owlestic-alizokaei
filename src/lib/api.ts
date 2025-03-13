import type { Order } from "@/types/order"

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customer: {
      id: "CUST-001",
      name: "John Doe",
      email: "john.doe@example.com",
    },
    date: "2023-03-15T10:30:00Z",
    items: [
      { id: "ITEM-001", name: "Product A", price: 29.99, quantity: 2 },
      { id: "ITEM-002", name: "Product B", price: 49.99, quantity: 1 },
    ],
    total: 109.97,
    status: "delivered",
  },
  {
    id: "ORD-002",
    customer: {
      id: "CUST-002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    date: "2023-03-16T14:45:00Z",
    items: [{ id: "ITEM-003", name: "Product C", price: 19.99, quantity: 3 }],
    total: 59.97,
    status: "shipped",
  },
  {
    id: "ORD-003",
    customer: {
      id: "CUST-003",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
    },
    date: "2023-03-17T09:15:00Z",
    items: [
      { id: "ITEM-004", name: "Product D", price: 99.99, quantity: 1 },
      { id: "ITEM-005", name: "Product E", price: 14.99, quantity: 2 },
    ],
    total: 129.97,
    status: "processing",
  },
  {
    id: "ORD-004",
    customer: {
      id: "CUST-004",
      name: "Emily Davis",
      email: "emily.davis@example.com",
    },
    date: "2023-03-18T16:30:00Z",
    items: [{ id: "ITEM-006", name: "Product F", price: 79.99, quantity: 1 }],
    total: 79.99,
    status: "pending",
  },
  {
    id: "ORD-005",
    customer: {
      id: "CUST-005",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
    },
    date: "2023-03-19T11:00:00Z",
    items: [
      { id: "ITEM-007", name: "Product G", price: 39.99, quantity: 2 },
      { id: "ITEM-008", name: "Product H", price: 24.99, quantity: 1 },
    ],
    total: 104.97,
    status: "cancelled",
  },
  {
    id: "ORD-006",
    customer: {
      id: "CUST-006",
      name: "Sarah Brown",
      email: "sarah.brown@example.com",
    },
    date: "2023-03-20T13:45:00Z",
    items: [{ id: "ITEM-009", name: "Product I", price: 59.99, quantity: 1 }],
    total: 59.99,
    status: "delivered",
  },
  {
    id: "ORD-007",
    customer: {
      id: "CUST-007",
      name: "David Miller",
      email: "david.miller@example.com",
    },
    date: "2023-03-21T10:15:00Z",
    items: [{ id: "ITEM-010", name: "Product J", price: 49.99, quantity: 3 }],
    total: 149.97,
    status: "shipped",
  },
  {
    id: "ORD-008",
    customer: {
      id: "CUST-008",
      name: "Jennifer Taylor",
      email: "jennifer.taylor@example.com",
    },
    date: "2023-03-22T15:30:00Z",
    items: [
      { id: "ITEM-011", name: "Product K", price: 34.99, quantity: 2 },
      { id: "ITEM-012", name: "Product L", price: 29.99, quantity: 1 },
    ],
    total: 99.97,
    status: "pending",
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Fetch all orders
export async function fetchOrdersApi(): Promise<Order[]> {
  // Simulate API call
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

