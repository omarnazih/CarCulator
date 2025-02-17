'use client'
import { BellIcon, CarIcon, GaugeIcon, SettingsIcon, TimerIcon, WrenchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import Link from "next/link"
import { usePathname } from "next/navigation"

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

  return (
    <aside className="w-64 bg-card border-r p-4">
      <div className="mb-8">
        <Link href="/">
          <Logo className="w-auto h-8" />
        </Link>
      </div>
      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Button
              key={item.href}
              variant={isActive ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href={item.href}>
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            </Button>
          )
        })}
      </nav>
      <div className="absolute bottom-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-300" />
        <div>
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-muted-foreground">john@example.com</p>
        </div>
      </div>
    </aside>
  )
}
