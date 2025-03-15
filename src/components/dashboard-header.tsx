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
      <div className="gap-1 grid">
        <h1 className="font-bold text-sky-600 text-2xl md:text-3xl">{heading}</h1>
        {text && <p className="text-gray-500 text-muted-foreground text-lg">{text}</p>}
      </div>
      {children}
    </div>
  )
}

