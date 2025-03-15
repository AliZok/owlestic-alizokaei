import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Order } from "@/types/order"
import { DollarSign, Package, PackageCheck, AlertTriangle } from "lucide-react"

interface DashboardStatsProps {
  orders: Order[]
}

export function DashboardStats({ orders }: DashboardStatsProps) {
  // Calculate statistics
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total * order.number), 0)
  const cancelledOrders = orders.filter((order) => order.status === "cancelled").length
  const deliveredOrders = orders.filter((order) => order.status === "delivered").length

  return (
    <div className="gap-4 grid lg:grid-cols-2 xl:grid-cols-4 mb-4 text-gray-600">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">فروش کل</CardTitle>
          <DollarSign className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="font-bold text-lg lg:text-2xl" dir="rtl">
            <span className="text-sky-600">
            {totalRevenue.toLocaleString()} 
            </span>
            <span className="text-[10px]">تومان</span></div>
          <p className="text-muted-foreground text-xs">از {totalOrders} سفارش</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">همه سفارشات</CardTitle>
          <Package className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="font-bold text-sky-700 text-lg lg:text-2xl">{totalOrders}</div>
          <p className="text-muted-foreground text-xs">کل سفارشات امروز</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">سفارشات موفق</CardTitle>
          <PackageCheck className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="font-bold text-emerald-500 text-lg lg:text-2xl">{deliveredOrders}</div>
          <p className="text-muted-foreground text-xs">سفارشاتی که به مشتری رسیده</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
          <CardTitle className="font-medium text-sm">برگشتی</CardTitle>
          <AlertTriangle className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="font-bold text-pink-700 text-lg lg:text-2xl">{cancelledOrders}</div>
          <p className="text-muted-foreground text-xs">کل سفارشاتی که برگشت خورده</p>
        </CardContent>
      </Card>
    </div>
  )
}

