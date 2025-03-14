import type React from "react"
interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode,
  className?: string,
}

export function DashboardHeader({ heading, text, children, className }: DashboardHeaderProps) {
  return (
    <div className={`flex items-center justify-between px-2 ${className}`}>
      <div className="grid gap-1">
        <h1 className="font-bold text-3xl md:text-4xl text-sky-600">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground text-gray-500">{text}</p>}
      </div>
      {children}
    </div>
  )
}

