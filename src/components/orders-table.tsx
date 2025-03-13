"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Order } from "@/types/order"
import { useOrders } from "@/context/orders-context"

interface OrdersTableProps {
  orders: Order[]
  searchQuery: string
  onSearchChange: (query: string) => void
  statusFilter: string | null
  onStatusFilterChange: (status: string | null) => void
}

export function OrdersTable({
  orders,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: OrdersTableProps) {
  const { updateOrderStatus } = useOrders()
  const [sortColumn, setSortColumn] = useState<keyof Order>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (column: keyof Order) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortColumn === "date") {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    }

    if (sortColumn === "total") {
      return sortDirection === "asc" ? a.total - b.total : b.total - a.total
    }

    const valueA = String(a[sortColumn]).toLowerCase()
    const valueB = String(b[sortColumn]).toLowerCase()

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30"
      case "processing":
        return "bg-blue-500/20 text-blue-700 hover:bg-blue-500/30"
      case "shipped":
        return "bg-green-500/20 text-green-700 hover:bg-green-500/30"
      case "delivered":
        return "bg-green-700/20 text-green-800 hover:bg-green-700/30"
      case "cancelled":
        return "bg-red-500/20 text-red-700 hover:bg-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-700 hover:bg-gray-500/30"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <Input
              type="search"
              placeholder="Search orders..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={statusFilter || ""} onValueChange={(value) => onStatusFilterChange(value || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
                Order ID
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("customer")}>
                Customer
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                Date
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("total")}>
                Total
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                Status
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              sortedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)} variant="outline">
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => (window.location.href = `/orders/${order.id}`)}>
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => updateOrderStatus(order.id, "pending")}
                          data-disabled={order.status === "pending"}
                          className={order.status === "pending" ? "opacity-50 pointer-events-none" : ""}
                        >
                          Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateOrderStatus(order.id, "processing")}
                          data-disabled={order.status === "processing"}
                          className={order.status === "processing" ? "opacity-50 pointer-events-none" : ""}
                        >
                          Processing
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateOrderStatus(order.id, "shipped")}
                          data-disabled={order.status === "shipped"}
                          className={order.status === "shipped" ? "opacity-50 pointer-events-none" : ""}
                        >
                          Shipped
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateOrderStatus(order.id, "delivered")}
                          data-disabled={order.status === "delivered"}
                          className={order.status === "delivered" ? "opacity-50 pointer-events-none" : ""}
                        >
                          Delivered
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateOrderStatus(order.id, "cancelled")}
                          data-disabled={order.status === "cancelled"}
                          className={order.status === "cancelled" ? "opacity-50 pointer-events-none" : ""}
                        >
                          Cancelled
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

