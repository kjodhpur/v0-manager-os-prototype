"use client"

import { useState } from "react"
import { Bell, AlertCircle, Clock, TrendingUp, Zap, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { notifications as initialNotifications, type Notification } from "@/lib/data"

interface NotificationsPanelProps {
  onNavigate: (target: string) => void
}

export function NotificationsPanel({ onNavigate }: NotificationsPanelProps) {
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifications)

  const unreadCount = notifs.filter((n) => !n.read).length

  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "alert": return <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
      case "reminder": return <Clock className="h-4 w-4 shrink-0 text-amber-500" />
      case "positive": return <TrendingUp className="h-4 w-4 shrink-0 text-emerald-500" />
      case "action": return <Zap className="h-4 w-4 shrink-0 text-primary" />
    }
  }

  const markAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })))
  }

  const grouped = {
    today: notifs.filter((n) => n.group === "today"),
    "this-week": notifs.filter((n) => n.group === "this-week"),
    earlier: notifs.filter((n) => n.group === "earlier"),
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500/100 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 md:w-96">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <Button size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground" onClick={markAllRead}>
              <Check className="mr-1 h-3 w-3" />
              Mark all read
            </Button>
          )}
        </div>
        <div className="max-h-96 overflow-y-auto">
          {(["today", "this-week", "earlier"] as const).map((group) => {
            const items = grouped[group]
            if (items.length === 0) return null
            return (
              <div key={group}>
                <div className="bg-muted/50 px-4 py-1.5">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {group === "this-week" ? "This Week" : group === "earlier" ? "Earlier" : "Today"}
                  </p>
                </div>
                {items.map((notif) => (
                  <button
                    key={notif.id}
                    onClick={() => notif.target && onNavigate(notif.target)}
                    className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 ${
                      !notif.read ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="mt-0.5">{getTypeIcon(notif.type)}</div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm ${!notif.read ? "font-semibold text-foreground" : "text-foreground"}`}>
                        {notif.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{notif.description}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                    {!notif.read && <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                  </button>
                ))}
              </div>
            )
          })}
        </div>
        <div className="border-t border-border px-4 py-2">
          <Button size="sm" variant="ghost" className="w-full text-xs" onClick={() => onNavigate("notifications")}>
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
