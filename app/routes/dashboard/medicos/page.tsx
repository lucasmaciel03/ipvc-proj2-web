"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Calendar, Clock, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { medicosMock, especialidades, type Medico } from "@/mocks/medicos";

export default function MedicosPage() {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [especialidadeFiltro, setEspecialidadeFiltro] = useState("Todas");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Simula carregamento de dados
  useEffect(() => {
    setTimeout(() => {
      setMedicos(medicosMock);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtra médicos com base na busca e filtro de especialidade
  const medicosFiltrados = medicos
    .filter(medico => 
      (searchTerm ? 
        medico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medico.especialidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medico.hospital.toLowerCase().includes(searchTerm.toLowerCase())
        : true)
    )
    .filter(medico => 
      especialidadeFiltro === "Todas" ? true : medico.especialidade === especialidadeFiltro
    );

  // Função para navegar para a página de detalhes do médico
  const irParaPerfilMedico = (id: string) => {
    router.push(`/dashboard/medicos/${id}`);
  };

  // Função para iniciar o agendamento de consulta
  const iniciarAgendamento = (medicoId: string) => {
    router.push(`/dashboard/medicos/${medicoId}?agendamento=true`);
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Equipe Médica</h1>
        <p className="text-muted-foreground">
          Consulte os médicos disponíveis e seus horários de atendimento
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Barra de filtros e busca */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex-1 max-w-lg relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Pesquisar por nome, especialidade ou hospital..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {especialidadeFiltro === "Todas" ? "Todas especialidades" : especialidadeFiltro}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Especialidades</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {especialidades.map((esp) => (
                  <DropdownMenuItem 
                    key={esp} 
                    onClick={() => setEspecialidadeFiltro(esp)}
                    className={especialidadeFiltro === esp ? "bg-blue-50 dark:bg-blue-900/20" : ""}
                  >
                    {esp}
                    {especialidadeFiltro === esp && (
                      <span className="ml-auto">✓</span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Status da busca/filtro */}
        <div className="text-sm text-muted-foreground">
          {loading ? (
            "Carregando médicos..."
          ) : (
            <>
              Mostrando {medicosFiltrados.length} {medicosFiltrados.length === 1 ? "médico" : "médicos"}
              {especialidadeFiltro !== "Todas" && ` na especialidade de ${especialidadeFiltro}`}
              {searchTerm && ` para a busca "${searchTerm}"`}
            </>
          )}
        </div>

        {/* Lista de médicos */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : medicosFiltrados.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl font-medium">Nenhum médico encontrado</p>
            <p className="text-muted-foreground mt-2">Tente ajustar seus filtros ou termos de busca</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {medicosFiltrados.map((medico) => (
              <Card key={medico.id} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <Image
                      src={medico.foto}
                      alt={medico.nome}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{medico.nome}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <span>{medico.especialidade}</span>
                      <span className="text-xs px-2">•</span>
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 text-yellow-300 mr-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        {medico.pontuacao}
                      </span>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-sm">{medico.hospital}<br/>{medico.endereco}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm">{medico.telefone}</span>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> Horários de Atendimento
                    </h4>
                    <div className="space-y-1">
                      {medico.horarios.map((horario, idx) => (
                        <div key={idx} className="grid grid-cols-2 text-sm">
                          <span className="text-muted-foreground">{horario.diasSemana}:</span>
                          <span className="flex items-center">
                            <Clock className="inline h-3 w-3 mr-1 text-blue-500" />
                            {horario.horas}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    onClick={() => irParaPerfilMedico(medico.id)}
                  >
                    Ver Perfil
                  </Button>
                  <Button 
                    className="flex-1" 
                    onClick={() => iniciarAgendamento(medico.id)}
                  >
                    Marcar Consulta
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}