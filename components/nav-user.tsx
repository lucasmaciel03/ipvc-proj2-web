"use client"

import { useRouter } from "next/navigation"
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/use-auth"
import { useState } from "react"
import { NotificationsDrawer } from "@/components/notifications/notifications-drawer"
import { Badge } from "@/components/ui/badge"

// Definindo as animações CSS para o efeito de borda pulsante
const notificationAnimationStyles = `
@keyframes borderPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
    border-color: rgba(59, 130, 246, 0.8);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.4);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
    border-color: rgba(59, 130, 246, 0.8);
  }
}

.notification-pulse {
  position: relative;
  animation: borderPulse 2s infinite ease-in-out;
  border: 2px solid transparent;
}

.notification-indicator {
  position: absolute;
  top: 10px;
  right: 5px;
  width: 8px;
  height: 8px;
  background-color: #3b82f6;
  border-radius: 50%;
  z-index: 10;
}
`;

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const { user: authUser, logout } = useAuth()
  const router = useRouter()
  const [notificationsDrawerOpen, setNotificationsDrawerOpen] = useState(false)
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true)
  
  // Se temos um usuário autenticado, use seus dados em vez dos dados padrão
  const displayUser = {
    name: authUser?.name || user.name,
    email: authUser?.email || user.email,
    avatar: authUser?.avatar || user.avatar,
  }
  
  const handleLogout = () => {
    logout()
    router.push("/routes/auth/login")
  }

  const handleNotificationsViewed = () => {
    setHasUnreadNotifications(false);
  }

  return (
    <>
      {/* Injeta os estilos de animação no componente */}
      <style jsx global>{notificationAnimationStyles}</style>
      
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className={`relative data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ${hasUnreadNotifications ? 'notification-pulse' : ''}`}
              >
                {hasUnreadNotifications && (
                  <span className="notification-indicator" aria-hidden="true" />
                )}
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={displayUser.avatar} alt={displayUser.name} />
                  <AvatarFallback className="rounded-lg">
                    {displayUser.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayUser.name}</span>
                  <span className="truncate text-xs">{displayUser.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={displayUser.avatar} alt={displayUser.name} />
                    <AvatarFallback className="rounded-lg">
                      {displayUser.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{displayUser.name}</span>
                    <span className="truncate text-xs">{displayUser.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push("/routes/dashboard/account")}>
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setNotificationsDrawerOpen(true)}>
                  <div className="relative mr-2">
                    <Bell className={`h-4 w-4 ${hasUnreadNotifications ? 'text-primary' : ''}`} />
                    {hasUnreadNotifications && (
                      <Badge 
                        className="absolute -right-1 -top-1.5 h-3 w-3 p-0 flex items-center justify-center text-[10px]"
                      >
                        2
                      </Badge>
                    )}
                  </div>
                  <span>Notifications</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      
      <NotificationsDrawer 
        open={notificationsDrawerOpen} 
        onOpenChange={setNotificationsDrawerOpen} 
        onNotificationsViewed={handleNotificationsViewed}
      />
    </>
  )
}
