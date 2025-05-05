"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, MapPin, Phone, Star, GraduationCap, Briefcase, Check } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { medicosMock, type Medico } from "@/mocks/medicos";

export default function MedicoDetailPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const showAgendamento = searchParams.get("agendamento") === "true";
  
  const [medico, setMedico] = useState<Medico | null>(null);
  const [loading, setLoading] = useState(true);
  const [tabAtiva, setTabAtiva] = useState<string>(showAgendamento ? "agendamento" : "sobre");
  
  useEffect(() => {
    // Simula busca de dados do médico específico
    setTimeout(() => {
      const medicoEncontrado = medicosMock.find(m => m.id === id);
      setMedico(medicoEncontrado || null);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="h-64 w-full rounded-lg bg-gray-200 dark:bg-gray-700"></div>
        <div className="space-y-2">
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!medico) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Médico não encontrado</h2>
        <p className="text-muted-foreground mb-6">O médico que você está procurando não existe ou foi removido.</p>
        <Button asChild>
          <Link href="/dashboard/medicos">Voltar para lista de médicos</Link>
        </Button>
      </div>
    );
  }

  // Dados simulados para as abas
  const avaliacoes = [
    { id: 1, autor: "Maria Silva", data: "12/03/2023", nota: 5, comentario: "Excelente profissional, muito atencioso e competente." },
    { id: 2, autor: "João Pereira", data: "28/02/2023", nota: 4, comentario: "Ótimo atendimento, recomendo!" },
    { id: 3, autor: "Ana Oliveira", data: "15/01/2023", nota: 5, comentario: "Médico muito capacitado, explicou tudo detalhadamente." }
  ];

  const horariosDisponiveis = [
    { data: "05/05/2023", horarios: ["09:00", "10:30", "14:00", "16:30"] },
    { data: "06/05/2023", horarios: ["08:30", "11:00", "15:30"] },
    { data: "07/05/2023", horarios: ["09:30", "13:00", "17:00"] }
  ];

  return (
    <>
      {/* Cabeçalho com botão de voltar */}
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild className="h-9 w-9 p-0">
          <Link href="/dashboard/medicos">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{medico.nome}</h1>
          <p className="text-muted-foreground">{medico.especialidade}</p>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Coluna da esquerda - Informações do médico */}
        <Card className="md:col-span-1 h-fit">
          <CardHeader className="text-center">
            <div className="mx-auto relative h-40 w-40 rounded-full overflow-hidden mb-4">
              <Image
                src={medico.foto}
                alt={medico.nome}
                fill
                className="object-cover"
              />
            </div>
            <CardTitle className="text-2xl">{medico.nome}</CardTitle>
            <CardDescription className="flex justify-center items-center gap-2">
              <Badge variant="secondary" className="text-sm font-medium">
                {medico.especialidade}
              </Badge>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium ml-1">{medico.pontuacao}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">Hospital / Clínica</h3>
                  <p className="text-sm text-muted-foreground">{medico.hospital}</p>
                  <p className="text-sm text-muted-foreground">{medico.endereco}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                <div>
                  <h3 className="font-medium">Contato</h3>
                  <p className="text-sm text-muted-foreground">{medico.telefone}</p>
                </div>
              </div>
            </div>

            <Separator />
            
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">Horários de Atendimento</h3>
                  <div className="space-y-1 mt-1">
                    {medico.horarios.map((horario, idx) => (
                      <div key={idx} className="text-sm">
                        <span className="text-muted-foreground">{horario.diasSemana}:</span>
                        <span className="ml-2 flex items-center">
                          <Clock className="inline h-3 w-3 mr-1 text-blue-500" />
                          {horario.horas}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Marcar Consulta</Button>
          </CardFooter>
        </Card>

        {/* Coluna da direita - Abas com informações detalhadas */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue={tabAtiva} onValueChange={setTabAtiva}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sobre">Sobre</TabsTrigger>
              <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
              <TabsTrigger value="agendamento">Agendar</TabsTrigger>
            </TabsList>
            
            {/* Sobre o médico */}
            <TabsContent value="sobre" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Experiência
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{medico.experiencia} de experiência em {medico.especialidade}</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Consultas de rotina e diagnósticos</li>
                    <li>Tratamentos especializados</li>
                    <li>Acompanhamento contínuo de pacientes</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Formação Acadêmica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{medico.formacao}</p>
                  <p className="text-sm text-muted-foreground">Registrado no Conselho Federal de Medicina</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    Especialidades e Serviços
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{medico.especialidade}</Badge>
                    <Badge variant="outline">Consultas de rotina</Badge>
                    <Badge variant="outline">Exames clínicos</Badge>
                    <Badge variant="outline">Atendimento online</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Avaliações */}
            <TabsContent value="avaliacoes" className="pt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">
                    Avaliações de pacientes
                  </CardTitle>
                  <CardDescription>
                    Média de {medico.pontuacao} estrelas baseada em {avaliacoes.length} avaliações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {avaliacoes.map((avaliacao) => (
                    <div key={avaliacao.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{avaliacao.autor}</h4>
                          <p className="text-sm text-muted-foreground">{avaliacao.data}</p>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < avaliacao.nota ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{avaliacao.comentario}</p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full">Ver todas as avaliações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Agendamento */}
            <TabsContent value="agendamento" className="pt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Agendar Consulta</CardTitle>
                  <CardDescription>
                    Escolha uma data e horário disponível para agendar uma consulta com {medico.nome}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Dias disponíveis */}
                    <div className="space-y-2">
                      <h3 className="font-medium">Selecione uma data:</h3>
                      <div className="flex flex-wrap gap-2">
                        {horariosDisponiveis.map((dia, index) => (
                          <Button 
                            key={index} 
                            variant={index === 0 ? "default" : "outline"}
                            className="rounded-full"
                          >
                            {dia.data}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Horários disponíveis para o dia selecionado */}
                    <div className="space-y-2">
                      <h3 className="font-medium">Selecione um horário:</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {horariosDisponiveis[0].horarios.map((hora, index) => (
                          <Button 
                            key={index} 
                            variant={index === 0 ? "default" : "outline"}
                            className="flex items-center justify-center gap-2"
                          >
                            <Clock className="h-3 w-3" />
                            {hora}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Tipo de consulta */}
                    <div className="space-y-2">
                      <h3 className="font-medium">Tipo de consulta:</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="default">Presencial</Button>
                        <Button variant="outline">Online</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t flex flex-col gap-2 pt-4">
                  <Button className="w-full">Confirmar Agendamento</Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Ao confirmar, você concorda com os termos de agendamento e política de cancelamento.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}