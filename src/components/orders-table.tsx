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
import FilterListIcon from '@mui/icons-material/FilterList';

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
  const filterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = (value: string) => {
    setAnchorEl(null);
    onStatusFilterChange(value)
  };

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

    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 flex-row sm:items-center justify-between">
        <div className="flex w-full items-center space-x-2 max-w-[300px]">
          <div className="relative w-full search-wrapper">
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
              className="absolute left-2.5 top-3 h-4 w-4 text-sky-800"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <Input
              type="search"
              placeholder="جستجو"
              className="w-full pl-8 placeholder-sky-800 focus:placeholder-sky-800 "
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outlined"
            onClick={filterClick}
            sx={{
              borderRadius: '50%',
              minWidth: '40px',
              height: '40px',
              padding: '8px',
            }}
          >
            <FilterListIcon />
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
            <MenuItem onClick={() => handleCloseMenu('cancelled')}>کنسل شده</MenuItem>
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
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) :
                orders.map((order) => (
                  <TableRow
                    key={order.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right" component="th" scope="row">
                      {order.id}
                    </TableCell>
                    <TableCell align="right">{order.name}</TableCell>
                    <TableCell align="right">{order.number}</TableCell>
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

