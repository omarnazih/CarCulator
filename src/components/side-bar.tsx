'use client'
import { BellIcon, CarIcon, GaugeIcon, SettingsIcon, TimerIcon, WrenchIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navigationItems = [
  { icon: GaugeIcon, label: "Dashboard", href: "/" },
  { icon: CarIcon, label: "My Vehicles", href: "/vehicles" },
  { icon: WrenchIcon, label: "Maintenance", href: "/maintenance" },
  { icon: TimerIcon, label: "Fuel Tracking", href: "/fuel-tracking" },
  { icon: BellIcon, label: "Reminders", href: "/reminders" },
  { icon: SettingsIcon, label: "Settings", href: "/settings" },
]

export function SideBar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside className={cn(
      "relative bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700 p-4 transition-all duration-300 text-slate-100",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="mb-8 flex justify-between items-center">
        <Link href="/">
          <Logo className={cn("w-auto transition-all", isCollapsed ? "h-6" : "h-8")} />
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRightIcon size={16} /> : <ChevronLeftIcon size={16} />}
        </Button>
      </div>

      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Button
              key={item.href}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2 hover:bg-slate-700/50",
                isCollapsed && "justify-center px-2",
                isActive && "bg-slate-700 hover:bg-slate-700"
              )}
              asChild
            >
              <Link href={item.href}>
                <Icon className="w-5 h-5" />
                {!isCollapsed && item.label}
              </Link>
            </Button>
          )
        })}
      </nav>

      <div className={cn(
        "absolute bottom-4 flex items-center gap-3",
        isCollapsed && "flex-col gap-1"
      )}>
        <div className="w-8 h-8 rounded-full bg-gray-300" />
        {!isCollapsed && (
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">john@example.com</p>
          </div>
        )}
      </div>
    </aside>
  )
}
