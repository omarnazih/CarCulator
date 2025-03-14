'use client'
import { BellIcon, CarIcon, GaugeIcon, SettingsIcon, TimerIcon, WrenchIcon, ChevronLeftIcon, ChevronRightIcon, LogOut, User, CloudCog } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { createClient } from "@/utils/supabase/client"

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
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase])

  console.log(user)
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const displayedNavItems = user
    ? navigationItems
    : [...navigationItems, { icon: LogOut, label: "Login", href: "/login" }]

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
        {displayedNavItems.map((item) => {
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className={cn(
            "absolute bottom-4 flex items-center gap-3 cursor-pointer hover:opacity-80",
            isCollapsed && "flex-col gap-1"
          )}>
            <div className="w-8 h-8 rounded-full bg-gray-300">
              {user?.user_metadata?.avatar_url && (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              )}
            </div>
            {!isCollapsed && user && (
              <div>
                <p className="text-sm font-medium">{user.user_metadata.full_name || user.email}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="">
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </aside>
  )
}
