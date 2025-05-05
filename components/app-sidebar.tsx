"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  BriefcaseMedical,
  FileUp,
  HeartPulse,
  LayoutGrid,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Good Doctor",
      logo: HeartPulse,
      plan: "Enterprise",
    }
  ],
  navMain: [
    {
      title:"Dashboard",
      url: "/routes/dashboard/",
      icon: LayoutGrid
    },
    {
      title:"Médicos",
      url: "/routes/dashboard/medicos",
      icon: BriefcaseMedical,
    },
    {
      title:"Consultas Médicas",
      url: "/routes/dashboard/consultas",
      icon: BookOpen,
      items:[
        {
          title: "Agendar Consulta",
          url: "/routes/dashboard/consultas/agendar",
        },
        {
          title: "Histórico de Consultas",
          url: "/routes/dashboard/consultas/historico",
        }
      ]
    },
    {
      title:"Exames Médicos",
      url: "/routes/dashboard/exames",
      icon: AudioWaveform
    },
    {
      title:"Enviar Exames",
      "url": "/routes/dashboard/exames/enviar",
      icon: FileUp
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
