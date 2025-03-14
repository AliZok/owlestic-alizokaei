import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Order } from "@/types/order"
import { DollarSign, Package, PackageCheck, Clock } from "lucide-react"

interface DashboardStatsProps {
  orders: Order[]
}

export function DashboardStats({ orders }: DashboardStatsProps) {
  // Calculate statistics
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const cancelledOrders = orders.filter((order) => order.status === "cancelled").length
  const deliveredOrders = orders.filter((order) => order.status === "delivered").length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4 text-gray-600">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">فروش کل</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" dir="rtl">
            <span className="text-sky-600">
            {totalRevenue.toLocaleString()} 
            </span>
            <span className="text-[10px]">تومان</span></div>
          <p className="text-xs text-muted-foreground">از {totalOrders} سفارش</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">همه سفارشات</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOrders}</div>
          <p className="text-xs text-muted-foreground">کل سفارشات امروز</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">سفارشات موفق</CardTitle>
          <PackageCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{deliveredOrders}</div>
          <p className="text-xs text-muted-foreground">سفارشاتی که به مشتری رسیده</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">برگشتی</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{cancelledOrders}</div>
          <p className="text-xs text-muted-foreground">کل سفارشاتی که برگشت خورده</p>
        </CardContent>
      </Card>
    </div>
  )
}

