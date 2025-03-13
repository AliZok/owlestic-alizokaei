export interface Customer {
    id: string
    name: string
    email: string
  }
  
  export interface OrderItem {
    id: string
    name: string
    price: number
    quantity: number
  }
  
  export interface Order {
    id: string
    customer: Customer
    date: string
    items: OrderItem[]
    total: number
    status: string
  }
  
  