import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import '@/styles/main.scss';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Order Management Dashboard",
  description: "A dashboard for managing customer orders",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="rtl">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
