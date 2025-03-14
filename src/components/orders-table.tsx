"use client"

import { useState } from "react"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuDropDown from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Order } from "@/types/order"
import { useOrders } from "@/context/orders-context"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';


interface OrdersTableProps {
  orders: Order[]
  searchQuery: string
  onSearchChange: (query: string) => void
  statusFilter: string | null
  onStatusFilterChange: (status: string | null) => void
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  action: number,
) {
  return { name, calories, fat, carbs, action };
}


export function OrdersTable({
  orders,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: OrdersTableProps) {
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = (value: string) => {
    setAnchorEl(null);
    onStatusFilterChange(value)
  };


  const { updateOrderStatus } = useOrders()
  const [sortColumn, setSortColumn] = useState<keyof Order>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")


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
        return "bg-yellow-200 text-yellow-600"
      case "ready":
        return "bg-sky-400/20 text-sky-700"
      case "delivered":
        return "bg-teal-400/20 text-teal-600"
      case "cancelled":
        return "bg-pink-500/20 text-pink-700"
      default:
        return "bg-gray-500/20 text-gray-700"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "در انتظار"
      case "ready":
        return "آماده"
      case "delivered":
        return "تحویل شده"
      case "cancelled":
        return "کنسل شده"
      default:
        return "bg-gray-500/20 text-gray-700"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative w-full search-wrapper ">
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
              className="absolute left-2.5 top-3 h-4 w-4 text-sky-400"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <Input
              type="search"
              placeholder="جستجو"
              className="w-full pl-8 placeholder-sky-400 focus:placeholder-sky-600"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outlined" onClick={handleClick} className="">
            فیلتر
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={() => handleCloseMenu('pending')}>در انتظار</MenuItem>
            <MenuItem onClick={() => handleCloseMenu('delivered')}>تحویل شده</MenuItem>
            <MenuItem onClick={() => handleCloseMenu('cancelled')}>برگشت خورده</MenuItem>
            <MenuItem onClick={() => handleCloseMenu('ready')}>آماده</MenuItem>

          </Menu>
        </div>
      </div>
      <div className="rounded-md ">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">شناسه</TableCell>
                <TableCell align="right">محصول</TableCell>
                <TableCell align="right">تعداد</TableCell>
                <TableCell align="left">قیمت</TableCell>
                <TableCell align="center">وضعیت</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) :
                sortedOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right" component="th" scope="row">
                      {order.id}
                    </TableCell>
                    <TableCell align="right">{order.customer.name}</TableCell>
                    <TableCell align="right">{order.date}</TableCell>
                    <TableCell align="left">{order.total.toLocaleString()}</TableCell>
                    <TableCell align="center">
                      <Badge className={getStatusColor(order.status)} variant="outline">
                        {getStatusText(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell align="center">
                      <MenuDropDown order={order}></MenuDropDown>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

