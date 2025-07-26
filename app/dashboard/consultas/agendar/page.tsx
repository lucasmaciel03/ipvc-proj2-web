"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  User,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { formatarData } from "@/mocks/consultas";
import { medicosMock } from "@/mocks/medicos";
import Image from "next/image";
import { AvatarFallback } from "@/components/ui/avatar-fallback";

// Especialidades médicas disponíveis
const especialidades = [
  { id: "clinica-geral", nome: "Clínica Geral" },
  { id: "cardiologia", nome: "Cardiologia" },
  { id: "dermatologia", nome: "Dermatologia" },
  { id: "neurologia", nome: "Neurologia" },
  { id: "ortopedia", nome: "Ortopedia" },
  { id: "pediatria", nome: "Pediatria" },
  { id: "psiquiatria", nome: "Psiquiatria" },
];

// Horários disponíveis
const horarios = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

// Tipos de consulta
const tiposConsulta = [
  { id: "primeira", nome: "Primeira Consulta" },
  { id: "retorno", nome: "Consulta de Retorno" },
  { id: "urgencia", nome: "Consulta de Urgência" },
  { id: "exame", nome: "Avaliação de Exames" },
];

export default function AgendarConsultaPage() {
  // Estados para controle do formulário
  const [etapaAtual, setEtapaAtual] = useState("especialidade");
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState("");
  const [medicoSelecionado, setMedicoSelecionado] = useState("");
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horaSelecionada, setHoraSelecionada] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("");
  const [motivo, setMotivo] = useState("");
  const [preferenciaContato, setPreferenciaContato] = useState("");
  const [agendamentoCompleto, setAgendamentoCompleto] = useState(false);

  // Filtra médicos pela especialidade selecionada
  const medicosFiltrados = especialidadeSelecionada
    ? medicosMock.filter(
        (medico) =>
          medico.especialidade.toLowerCase() === especialidadeSelecionada
      )
    : [];

  // Função para calcular a data mínima (hoje)
  const getDataMinima = () => {
    const hoje = new Date();
    return hoje.toISOString().split("T")[0];
  };

  // Função para formatar a data em formato legível
  const formatarDataLegivel = (data: string) => {
    if (!data) return "";
    const dataObj = new Date(data);
    return format(dataObj, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: pt });
  };

  // Função para ir para a próxima etapa
  const avancarEtapa = () => {
    switch (etapaAtual) {
      case "especialidade":
        setEtapaAtual("data");
        break;
      case "data":
        setEtapaAtual("detalhes");
        break;
      case "detalhes":
        setAgendamentoCompleto(true);
        break;
    }
  };

  // Função para voltar para etapa anterior
  const voltarEtapa = () => {
    switch (etapaAtual) {
      case "data":
        setEtapaAtual("especialidade");
        break;
      case "detalhes":
        setEtapaAtual("data");
        break;
    }
  };

  // Função para verificar se pode avançar
  const podeAvancar = () => {
    switch (etapaAtual) {
      case "especialidade":
        return especialidadeSelecionada && medicoSelecionado;
      case "data":
        return dataSelecionada && horaSelecionada;
      case "detalhes":
        return tipoConsulta && motivo && preferenciaContato;
      default:
        return false;
    }
  };

  // Função para submeter o formulário
  const submeterFormulario = (e: React.FormEvent) => {
    e.preventDefault();
    setAgendamentoCompleto(true);
  };

  // Função para reiniciar o formulário
  const reiniciarFormulario = () => {
    setEspecialidadeSelecionada("");
    setMedicoSelecionado("");
    setDataSelecionada("");
    setHoraSelecionada("");
    setTipoConsulta("");
    setMotivo("");
    setPreferenciaContato("");
    setEtapaAtual("especialidade");
    setAgendamentoCompleto(false);
  };

  // Tela de agendamento concluído
  if (agendamentoCompleto) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Consulta Agendada</h1>
          <p className="text-sm text-muted-foreground">
            Seu agendamento foi realizado com sucesso
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="bg-primary h-2"></div>
          <CardContent className="pt-6 pb-8 px-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">
                Agendamento Confirmado
              </h2>
              <p className="text-muted-foreground">
                Sua consulta foi agendada com sucesso. Um lembrete será enviado
                para você.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">ESPECIALIDADE</p>
                  <p className="font-medium">
                    {
                      especialidades.find(
                        (e) => e.id === especialidadeSelecionada
                      )?.nome
                    }
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">MÉDICO</p>
                  <p className="font-medium">
                    {medicosMock.find((m) => m.id === medicoSelecionado)?.nome}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">DATA E HORA</p>
                  <p className="font-medium">
                    {formatarDataLegivel(dataSelecionada)}, às {horaSelecionada}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    TIPO DE CONSULTA
                  </p>
                  <p className="font-medium">
                    {tiposConsulta.find((t) => t.id === tipoConsulta)?.nome}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={reiniciarFormulario} className="min-w-[200px]">
                Agendar nova consulta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Agendar Consulta</h1>
        <p className="text-sm text-muted-foreground">
          Marque uma consulta com um dos nossos especialistas
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          {/* Indicador de progresso - Versão corrigida */}
          <div className="border-b">
            <div className="flex items-center">
              <div
                className={`flex-1 rounded-none h-14 border-b-2 flex flex-col items-center justify-center ${
                  etapaAtual === "especialidade"
                    ? "border-primary text-primary"
                    : "border-transparent"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full ${
                    etapaAtual === "especialidade"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  } flex items-center justify-center mb-1 text-xs`}
                >
                  1
                </div>
                <span className="text-xs sm:text-sm">Especialidade</span>
              </div>

              <div className="w-5 h-1 bg-muted" />

              <div
                className={`flex-1 rounded-none h-14 border-b-2 flex flex-col items-center justify-center ${
                  etapaAtual === "data"
                    ? "border-primary text-primary"
                    : "border-transparent"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full ${
                    etapaAtual === "data"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  } flex items-center justify-center mb-1 text-xs`}
                >
                  2
                </div>
                <span className="text-xs sm:text-sm">Data e Hora</span>
              </div>

              <div className="w-5 h-1 bg-muted" />

              <div
                className={`flex-1 rounded-none h-14 border-b-2 flex flex-col items-center justify-center ${
                  etapaAtual === "detalhes"
                    ? "border-primary text-primary"
                    : "border-transparent"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full ${
                    etapaAtual === "detalhes"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  } flex items-center justify-center mb-1 text-xs`}
                >
                  3
                </div>
                <span className="text-xs sm:text-sm">Detalhes</span>
              </div>
            </div>
          </div>

          <form onSubmit={submeterFormulario} className="p-6">
            <Tabs value={etapaAtual} className="w-full">
              {/* Etapa 1: Seleção de especialidade e médico */}
              <TabsContent value="especialidade" className="m-0 py-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Selecione a especialidade e o médico
                    </h3>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="especialidade">
                          Especialidade médica
                        </Label>
                        <Select
                          value={especialidadeSelecionada}
                          onValueChange={setEspecialidadeSelecionada}
                        >
                          <SelectTrigger id="especialidade" className="w-full">
                            <SelectValue placeholder="Selecione uma especialidade" />
                          </SelectTrigger>
                          <SelectContent>
                            {especialidades.map((especialidade) => (
                              <SelectItem
                                key={especialidade.id}
                                value={especialidade.id}
                              >
                                {especialidade.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="medico">Médico</Label>
                        <Select
                          value={medicoSelecionado}
                          onValueChange={setMedicoSelecionado}
                          disabled={!especialidadeSelecionada}
                        >
                          <SelectTrigger id="medico" className="w-full">
                            <SelectValue
                              placeholder={
                                especialidadeSelecionada
                                  ? "Selecione um médico"
                                  : "Primeiro selecione uma especialidade"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {medicosFiltrados.map((medico) => (
                              <SelectItem key={medico.id} value={medico.id}>
                                {medico.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {medicoSelecionado && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AvatarFallback
                          src={medicosMock.find((m) => m.id === medicoSelecionado)?.foto}
                          alt={medicosMock.find((m) => m.id === medicoSelecionado)?.nome || ""}
                          width={40}
                          height={40}
                          fallbackText={medicosMock.find((m) => m.id === medicoSelecionado)?.nome}
                        />
                        <div>
                          <h4 className="font-medium">
                            {
                              medicosMock.find(
                                (m) => m.id === medicoSelecionado
                              )?.nome
                            }
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {
                              especialidades.find(
                                (e) => e.id === especialidadeSelecionada
                              )?.nome
                            }{" "}
                            •
                            {
                              medicosMock.find(
                                (m) => m.id === medicoSelecionado
                              )?.hospital
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Etapa 2: Seleção de data e horário */}
              <TabsContent value="data" className="m-0 py-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Selecione a data e o horário
                    </h3>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="data">Data da consulta</Label>
                        <div className="relative">
                          <Input
                            id="data"
                            type="date"
                            className="w-full"
                            min={getDataMinima()}
                            value={dataSelecionada}
                            onChange={(e) => setDataSelecionada(e.target.value)}
                          />
                          <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hora">Horário disponível</Label>
                        <Select
                          value={horaSelecionada}
                          onValueChange={setHoraSelecionada}
                          disabled={!dataSelecionada}
                        >
                          <SelectTrigger id="hora" className="w-full">
                            <SelectValue
                              placeholder={
                                dataSelecionada
                                  ? "Selecione um horário"
                                  : "Primeiro selecione uma data"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {horarios.map((horario) => (
                              <SelectItem key={horario} value={horario}>
                                {horario}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {dataSelecionada && medicoSelecionado && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <CalendarIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">
                              {formatarDataLegivel(dataSelecionada)}
                            </h4>
                            {horaSelecionada && (
                              <p className="text-sm text-muted-foreground">
                                Horário: {horaSelecionada}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="border-t border-border pt-4 mt-2">
                          <div className="flex items-start gap-3">
                            <AvatarFallback
                              src={medicosMock.find((m) => m.id === medicoSelecionado)?.foto}
                              alt={medicosMock.find((m) => m.id === medicoSelecionado)?.nome || ""}
                              width={40}
                              height={40}
                              fallbackText={medicosMock.find((m) => m.id === medicoSelecionado)?.nome}
                            />
                            <div>
                              <h4 className="font-medium">
                                {
                                  medicosMock.find(
                                    (m) => m.id === medicoSelecionado
                                  )?.nome
                                }
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {
                                  especialidades.find(
                                    (e) => e.id === especialidadeSelecionada
                                  )?.nome
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Etapa 3: Detalhes adicionais */}
              <TabsContent value="detalhes" className="m-0 py-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Forneça os detalhes da consulta
                    </h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="tipo-consulta">Tipo de consulta</Label>
                        <Select
                          value={tipoConsulta}
                          onValueChange={setTipoConsulta}
                        >
                          <SelectTrigger id="tipo-consulta" className="w-full">
                            <SelectValue placeholder="Selecione o tipo de consulta" />
                          </SelectTrigger>
                          <SelectContent>
                            {tiposConsulta.map((tipo) => (
                              <SelectItem key={tipo.id} value={tipo.id}>
                                {tipo.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="motivo">Motivo da consulta</Label>
                        <Textarea
                          id="motivo"
                          placeholder="Descreva brevemente o motivo da consulta e seus sintomas..."
                          className="min-h-[100px] resize-none"
                          value={motivo}
                          onChange={(e) => setMotivo(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Estas informações ajudarão o médico a se preparar para
                          sua consulta.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <Label>Preferência de contato</Label>
                        <RadioGroup
                          value={preferenciaContato}
                          onValueChange={setPreferenciaContato}
                          className="grid grid-cols-3 gap-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="telefone" id="telefone" />
                            <Label htmlFor="telefone">Telefone</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="email" />
                            <Label htmlFor="email">Email</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sms" id="sms" />
                            <Label htmlFor="sms">SMS</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Resumo do agendamento</h4>

                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">
                              {
                                medicosMock.find(
                                  (m) => m.id === medicoSelecionado
                                )?.nome
                              }
                            </p>
                            <p className="text-muted-foreground">
                              {
                                especialidades.find(
                                  (e) => e.id === especialidadeSelecionada
                                )?.nome
                              }
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">
                              {formatarData(dataSelecionada)}
                            </p>
                            <p className="text-muted-foreground">
                              às {horaSelecionada}
                            </p>
                          </div>
                        </div>
                      </div>

                      {tipoConsulta && (
                        <div className="pt-3 border-t border-border">
                          <p className="text-sm font-medium">
                            {
                              tiposConsulta.find((t) => t.id === tipoConsulta)
                                ?.nome
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between mt-8">
              {etapaAtual !== "especialidade" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={voltarEtapa}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </Button>
              )}

              <div className={etapaAtual === "especialidade" ? "ml-auto" : ""}>
                <Button
                  type={etapaAtual === "detalhes" ? "submit" : "button"}
                  onClick={etapaAtual !== "detalhes" ? avancarEtapa : undefined}
                  disabled={!podeAvancar()}
                  className="gap-2"
                >
                  {etapaAtual === "detalhes"
                    ? "Confirmar Agendamento"
                    : "Continuar"}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
