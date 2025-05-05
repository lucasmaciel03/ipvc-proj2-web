"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname();

  // Função para verificar se um item está ativo (baseado na URL atual)
  const isItemActive = (itemUrl: string, isSubmenu: boolean = false) => {
    // Manipular URLs com barra final opcional
    const normalizedPathname = pathname.endsWith('/') ? pathname : `${pathname}/`;
    const normalizedItemUrl = itemUrl.endsWith('/') ? itemUrl : `${itemUrl}/`;
    
    // Verificação exata
    const isExactMatch = normalizedPathname === normalizedItemUrl;
    
    // Para submenus, podemos usar uma verificação mais simples
    if (isSubmenu) {
      return isExactMatch || normalizedPathname.startsWith(normalizedItemUrl);
    }
    
    // Para menus principais, apenas mostrar como ativo se:
    // 1. For uma correspondência exata
    // 2. Não houver submenus ativos associados a este menu
    return isExactMatch;
  };

  // Verificar se qualquer subitem está ativo (para expandir automaticamente o menu pai)
  const hasActiveSubitem = (subItems: { url: string }[]) => {
    return subItems?.some(subItem => {
      const normalizedPathname = pathname.endsWith('/') ? pathname : `${pathname}/`;
      const normalizedItemUrl = subItem.url.endsWith('/') ? subItem.url : `${subItem.url}/`;
      return normalizedPathname.startsWith(normalizedItemUrl);
    });
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          item.items && item.items.length > 0 ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive || hasActiveSubitem(item.items)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton 
                    tooltip={item.title}
                    isActive={isItemActive(item.url)}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton 
                          asChild
                          isActive={isItemActive(subItem.url, true)}
                        >
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                tooltip={item.title} 
                asChild
                isActive={isItemActive(item.url)}
              >
                <a href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
