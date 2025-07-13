"use client";

import * as React from "react";
import { format, isToday, isYesterday } from "date-fns";
import { pt } from "date-fns/locale";
import { Bell, CheckCircle2, Info, X, XCircle } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Tipos de notificação
type NotificationType = "info" | "success" | "warning" | "error";

// Interface para notificações
interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  type: NotificationType;
  read: boolean;
  link?: string;
}

// Mock de dados para notificações
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Consulta confirmada",
    message:
      "Sua consulta com Dr. Carlos Silva (Cardiologia) foi confirmada para amanhã às 09:00.",
    date: new Date(2025, 4, 6, 9, 30), // 6 de maio de 2025
    type: "success",
    read: false,
    link: "/dashboard/consultas/historico",
  },
  {
    id: "2",
    title: "Resultados disponíveis",
    message:
      "Os resultados do seu exame de sangue estão disponíveis para visualização.",
    date: new Date(2025, 4, 4, 14, 15), // 4 de maio de 2025
    type: "info",
    read: false,
    link: "/dashboard/exames",
  },
  {
    id: "3",
    title: "Lembrete de consulta",
    message:
      "Lembrete: Você tem uma consulta agendada com Dra. Ana Santos (Dermatologia) amanhã às 14:00.",
    date: new Date(2025, 4, 3, 10, 0), // 3 de maio de 2025
    type: "info",
    read: true,
    link: "/dashboard/consultas/historico",
  },
  {
    id: "4",
    title: "Consulta cancelada",
    message:
      "Sua consulta com Dr. Miguel Costa (Neurologia) foi cancelada devido à indisponibilidade do médico.",
    date: new Date(2025, 4, 2, 16, 45), // 2 de maio de 2025
    type: "error",
    read: true,
  },
  {
    id: "5",
    title: "Receita renovada",
    message:
      "Sua receita para medicamento contínuo foi renovada e está disponível para download.",
    date: new Date(2025, 3, 28, 11, 20), // 28 de abril de 2025
    type: "success",
    read: true,
    link: "/dashboard/exames",
  },
  {
    id: "6",
    title: "Alteração no horário",
    message:
      "O horário da sua consulta com Dra. Sofia Martins (Pediatria) foi alterado para 10:30.",
    date: new Date(2025, 3, 25, 9, 0), // 25 de abril de 2025
    type: "warning",
    read: true,
    link: "/dashboard/consultas/historico",
  },
];

// Funções de utilidade
function formatNotificationDate(date: Date): string {
  if (isToday(date)) {
    return `Hoje, ${format(date, "HH:mm")}`;
  } else if (isYesterday(date)) {
    return `Ontem, ${format(date, "HH:mm")}`;
  } else {
    return format(date, "d 'de' MMMM 'às' HH:mm", { locale: pt });
  }
}

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "info":
      return <Info className="h-5 w-5 text-blue-500" />;
    case "success":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "warning":
      return <Info className="h-5 w-5 text-amber-500" />;
    case "error":
      return <XCircle className="h-5 w-5 text-red-500" />;
    default:
      return <Bell className="h-5 w-5 text-muted-foreground" />;
  }
}

function getNotificationColor(type: NotificationType) {
  switch (type) {
    case "info":
      return "bg-blue-50 dark:bg-blue-950/30";
    case "success":
      return "bg-green-50 dark:bg-green-950/30";
    case "warning":
      return "bg-amber-50 dark:bg-amber-950/30";
    case "error":
      return "bg-red-50 dark:bg-red-950/30";
    default:
      return "bg-muted";
  }
}

// Componente para o Card de Notificação
function NotificationCard({
  notification,
  onMarkAsRead,
}: {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}) {
  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div
      className={`relative flex flex-col gap-1 rounded-lg p-3 transition-colors ${getNotificationColor(
        notification.type
      )} ${notification.read ? "opacity-70" : ""}`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex h-5 w-5">
            {getNotificationIcon(notification.type)}
          </div>
          <div>
            <h4 className="font-medium leading-tight">{notification.title}</h4>
            <p className="text-sm text-muted-foreground">
              {notification.message}
            </p>
          </div>
        </div>
        {!notification.read && (
          <Badge
            variant="secondary"
            className="ml-1 h-2 w-2 rounded-full p-0 bg-blue-500"
          />
        )}
      </div>
      <div className="flex items-center justify-between mt-1">
        <p className="ml-7 text-xs text-muted-foreground">
          {formatNotificationDate(notification.date)}
        </p>
        {notification.link && (
          <a
            href={notification.link}
            className="text-xs font-medium text-primary"
          >
            Ver detalhes
          </a>
        )}
      </div>
    </div>
  );
}

// Interface para as props do componente NotificationsDrawer
interface NotificationsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNotificationsViewed?: () => void;
}

export function NotificationsDrawer({
  open,
  onOpenChange,
  onNotificationsViewed,
}: NotificationsDrawerProps) {
  const [notifications, setNotifications] =
    React.useState<Notification[]>(mockNotifications);
  const unreadCount = React.useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const handleMarkAllAsRead = React.useCallback(() => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    if (unreadCount > 0 && onNotificationsViewed) {
      onNotificationsViewed();
    }
  }, [notifications, unreadCount, onNotificationsViewed]);

  // Effect para marcar notificações como lidas quando o drawer é aberto
  React.useEffect(() => {
    if (open && unreadCount > 0) {
      // Pequeno delay para dar tempo ao usuário ver as notificações antes de marcá-las como lidas
      const timer = setTimeout(() => {
        handleMarkAllAsRead();
        if (onNotificationsViewed) {
          onNotificationsViewed();
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [open, unreadCount, handleMarkAllAsRead, onNotificationsViewed]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

    // Verificar se todas as notificações foram lidas
    const updatedUnreadCount = notifications.filter(
      (n) => !n.read && n.id !== id
    ).length;
    if (updatedUnreadCount === 0 && onNotificationsViewed) {
      onNotificationsViewed();
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full">
        <DrawerHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <DrawerTitle>Notificações</DrawerTitle>
              {unreadCount > 0 && <Badge className="ml-2">{unreadCount}</Badge>}
            </div>
            <DrawerClose className="rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Fechar</span>
            </DrawerClose>
          </div>
          <DrawerDescription>
            Acompanhe suas consultas e atualizações do sistema
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="flex-1 px-4">
          {notifications.length > 0 ? (
            <div className="py-4 space-y-3">
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-40 flex-col items-center justify-center py-4">
              <Bell className="h-10 w-10 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">
                Não há notificações
              </p>
            </div>
          )}
        </ScrollArea>

        <DrawerFooter className="border-t pt-4">
          {unreadCount > 0 ? (
            <Button
              variant="outline"
              onClick={handleMarkAllAsRead}
              className="w-full"
            >
              Marcar todas como lidas
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full"
            >
              Fechar
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
