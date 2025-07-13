"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon, FileText, User } from "lucide-react";
import { useState } from "react";
import {
  Consulta,
  formatarData,
  getEspecialidadesUnicas,
  historicoConsultasMock,
} from "@/mocks/consultas";

export default function HistoricoConsultasPage() {
  const [filtroEspecialidade, setFiltroEspecialidade] = useState<string>("all");
  const [filtroStatus, setFiltroStatus] = useState<string>("todas");

  // Função para filtrar consultas com base nos filtros selecionados
  const filtrarConsultas = (consultas: Consulta[]) => {
    return consultas.filter((consulta) => {
      const matchEspecialidade =
        filtroEspecialidade === "all" ||
        consulta.especialidade === filtroEspecialidade;
      const matchStatus =
        filtroStatus === "todas" ||
        (filtroStatus === "realizadas" && consulta.status === "realizada") ||
        (filtroStatus === "canceladas" && consulta.status === "cancelada");

      return matchEspecialidade && matchStatus;
    });
  };

  const consultasFiltradas = filtrarConsultas(historicoConsultasMock);
  const consultasRealizadas = consultasFiltradas.filter(
    (c) => c.status === "realizada"
  );
  const consultasCanceladas = consultasFiltradas.filter(
    (c) => c.status === "cancelada"
  );
  const especialidades = getEspecialidadesUnicas(historicoConsultasMock);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Histórico de Consultas</h1>
        <p className="text-sm text-muted-foreground">
          Visualize seu histórico completo de consultas médicas
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col md:flex-row gap-2">
          <Select
            onValueChange={setFiltroEspecialidade}
            value={filtroEspecialidade}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Todas as especialidades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as especialidades</SelectItem>
              {especialidades.map((esp) => (
                <SelectItem key={esp} value={esp}>
                  {esp}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline">Exportar histórico</Button>
      </div>

      <Tabs defaultValue="todas" onValueChange={setFiltroStatus}>
        <TabsList className="mb-4">
          <TabsTrigger value="todas">
            Todas ({consultasFiltradas.length})
          </TabsTrigger>
          <TabsTrigger value="realizadas">
            Realizadas ({consultasRealizadas.length})
          </TabsTrigger>
          <TabsTrigger value="canceladas">
            Canceladas ({consultasCanceladas.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todas" className="space-y-4">
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="grid gap-4">
              {consultasFiltradas.length > 0 ? (
                consultasFiltradas.map((consulta) => (
                  <ConsultaCard key={consulta.id} consulta={consulta} />
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">
                    Nenhum registro de consulta encontrado
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="realizadas" className="space-y-4">
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="grid gap-4">
              {consultasRealizadas.length > 0 ? (
                consultasRealizadas.map((consulta) => (
                  <ConsultaCard key={consulta.id} consulta={consulta} />
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">
                    Nenhum registro de consulta realizada encontrado
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="canceladas" className="space-y-4">
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="grid gap-4">
              {consultasCanceladas.length > 0 ? (
                consultasCanceladas.map((consulta) => (
                  <ConsultaCard key={consulta.id} consulta={consulta} />
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">
                    Nenhum registro de consulta cancelada encontrado
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Componente de card para exibir detalhes da consulta
function ConsultaCard({ consulta }: { consulta: Consulta }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">
            Consulta de {consulta.especialidade}
          </CardTitle>
          <Badge
            variant={
              consulta.status === "realizada" ? "default" : "destructive"
            }
          >
            {consulta.status === "realizada" ? "Realizada" : "Cancelada"}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1.5">
          <CalendarIcon className="h-4 w-4" />
          {formatarData(consulta.data)} às {consulta.hora}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <p className="font-medium">{consulta.medico}</p>
              <p className="text-sm text-muted-foreground">
                {consulta.especialidade}
              </p>
            </div>
          </div>

          {consulta.observacoes && (
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Observações</p>
                <p className="text-sm text-muted-foreground">
                  {consulta.observacoes}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-1 flex justify-end">
        {consulta.status === "realizada" && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Ver prontuário
            </Button>
            <Button variant="outline" size="sm">
              Ver receitas
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
