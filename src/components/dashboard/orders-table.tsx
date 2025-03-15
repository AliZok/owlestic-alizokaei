"use client"

import * as React from 'react';

import MenuDropDown from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Order } from "@/types/order"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Typography,
} from '@mui/material';
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
        return "bg-yellow-200/20 text-yellow-600"
      case "ready":
        return "bg-sky-400/20 text-sky-600"
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
      <div className="flex flex-row justify-between sm:items-center gap-4">
        <div className="flex items-center space-x-2 w-full max-w-[300px]">
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
              className="top-3 left-2.5 absolute w-4 h-4 text-sky-800"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <Input
              type="search"
              placeholder="جستجو"
              className="pl-8 w-full placeholder-sky-800 focus:placeholder-sky-800"
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
      <div className="rounded-xl">
        <TableContainer component={Paper}>
          <div className='hidden md:block'>
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
                      هیچ سفارشی موجود نیست
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
          </div>

          <div className='md:hidden block'>
            <Box sx={{ p: 2 }}>
              {orders.length === 0 ? (
                <Typography className="h-24 text-center">هیچ سفارشی موجود نیست</Typography>
              ) : (
                orders.map((order) => (
                  <Box
                    key={order.id}
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      p: 2,
                      mb: 2,
                    }}
                  >
                    <div className='flex justify-between mb-1'>
                      <Typography className='!text-[12px]'> شناسه:</Typography>
                      <Typography >{order.id}</Typography>
                    </div>
                    <div className='flex justify-between mb-1' >
                      <Typography className='!text-[12px]'> محصول:</Typography>
                      <Typography >{order.name}</Typography>
                    </div>
                    <div className='flex justify-between mb-1'>
                      <Typography className='!text-[12px]'>تعداد:</Typography>
                      <Typography >{order.number}</Typography>
                    </div>
                    <div className='flex justify-between mb-1'>
                      <Typography className='!text-[12px]'>قیمت:</Typography>
                      <Typography>{order.total.toLocaleString()}</Typography>
                    </div>
                    <div className='flex justify-between mb-1'>
                      <Typography className='!text-[12px]'>وضعیت:</Typography>
                      <Badge className={getStatusColor(order.status)} variant="outline">
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                    <div className='flex justify-between'>
                      <Typography className='!text-[12px]'>عملیات:</Typography>
                      <MenuDropDown order={order}></MenuDropDown>
                    </div>
                  </Box>
                ))
              )}
            </Box>
          </div>
        </TableContainer>
      </div>
    </div>
  )
}


