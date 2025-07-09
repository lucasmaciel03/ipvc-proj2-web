// Mock data for consultation history
export interface Consulta {
  id: string;
  data: string;
  hora: string;
  medico: string;
  especialidade: string;
  status: "realizada" | "cancelada";
  observacoes?: string;
}

export const historicoConsultasMock: Consulta[] = [
  {
    id: "1",
    data: "2025-04-15",
    hora: "09:30",
    medico: "Dra. Maria Costa",
    especialidade: "Cardiologia",
    status: "realizada",
    observacoes: "Paciente apresentou pressão arterial elevada. Recomendado monitoramento e retorno em 1 mês."
  },
  {
    id: "2",
    data: "2025-03-20",
    hora: "14:00",
    medico: "Dr. José Santos",
    especialidade: "Dermatologia",
    status: "realizada",
    observacoes: "Tratamento para dermatite concluído com sucesso."
  },
  {
    id: "3",
    data: "2025-02-10",
    hora: "11:15",
    medico: "Dr. António Silva",
    especialidade: "Clínica Geral",
    status: "realizada",
    observacoes: "Check-up anual. Todos os exames dentro da normalidade."
  },
  {
    id: "4",
    data: "2025-01-07",
    hora: "10:00",
    medico: "Dra. Ana Ferreira",
    especialidade: "Neurologia",
    status: "realizada",
    observacoes: "Avaliação de enxaquecas recorrentes. Receitado novo medicamento."
  },
  {
    id: "5",
    data: "2024-12-03",
    hora: "15:30",
    medico: "Dr. Carlos Oliveira",
    especialidade: "Ortopedia",
    status: "realizada",
    observacoes: "Dor lombar. Recomendado fisioterapia e reavaliação em 2 meses."
  },
  {
    id: "6",
    data: "2025-04-28",
    hora: "09:00",
    medico: "Dr. António Silva",
    especialidade: "Clínica Geral",
    status: "cancelada",
    observacoes: "Consulta cancelada pelo paciente."
  },
  {
    id: "7",
    data: "2025-03-05",
    hora: "11:30",
    medico: "Dra. Maria Costa",
    especialidade: "Cardiologia",
    status: "cancelada",
    observacoes: "Consulta cancelada por indisponibilidade do médico."
  }
];

// Helper function to format date from "YYYY-MM-DD" to "DD/MM/YYYY"
export function formatarData(dataString: string) {
  const [ano, mes, dia] = dataString.split("-");
  return `${dia}/${mes}/${ano}`;
}

// Helper function to extract unique specialties for filtering
export function getEspecialidadesUnicas(consultas: Consulta[]) {
  return [...new Set(consultas.map(consulta => consulta.especialidade))];
}