export interface Customer {
  id: string
  name: string
  email: string
}

export interface Order {
  id: string
  customer: Customer
  date: string
  total: number
  status: string
}

