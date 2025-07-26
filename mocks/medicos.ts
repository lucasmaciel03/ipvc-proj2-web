// Interface para os dados dos médicos
export interface Medico {
  id: string;
  nome: string;
  foto: string;
  especialidade: string;
  pontuacao: number;
  hospital: string;
  endereco: string;
  telefone: string;
  horarios: {
    diasSemana: string;
    horas: string;
  }[];
  experiencia: string;
  formacao: string;
}

// Dados mock de médicos
export const medicosMock: Medico[] = [
  {
    id: "1",
    nome: "Dr. Carlos Silva",
    foto: "/assets/images/doctors/dr-carlos-silva.jpg",
    especialidade: "cardiologia",
    pontuacao: 4.8,
    hospital: "Hospital Santa Maria",
    endereco: "Rua das Flores, 123 - Porto",
    telefone: "+351 912 345 678",
    horarios: [
      { diasSemana: "Segunda à Sexta", horas: "09:00 - 17:00" },
      { diasSemana: "Sábado", horas: "10:00 - 14:00" }
    ],
    experiencia: "15 anos",
    formacao: "Faculdade de Medicina da Universidade do Porto"
  },
  {
    id: "2",
    nome: "Dra. Ana Santos",
    foto: "/assets/images/doctors/dra-ana-santos.jpg",
    especialidade: "dermatologia",
    pontuacao: 4.9,
    hospital: "Clínica da Luz",
    endereco: "Av. República, 45 - Lisboa",
    telefone: "+351 931 234 567",
    horarios: [
      { diasSemana: "Segunda, Quarta e Sexta", horas: "08:00 - 16:00" },
      { diasSemana: "Terça e Quinta", horas: "13:00 - 21:00" }
    ],
    experiencia: "12 anos",
    formacao: "Faculdade de Ciências Médicas de Lisboa"
  },
  {
    id: "3",
    nome: "Dr. Miguel Costa",
    foto: "/assets/images/doctors/dr-miguel-costa.jpg",
    especialidade: "neurologia",
    pontuacao: 4.7,
    hospital: "Hospital São João",
    endereco: "Rua Central, 78 - Porto",
    telefone: "+351 961 987 654",
    horarios: [
      { diasSemana: "Segunda à Sexta", horas: "10:00 - 18:00" }
    ],
    experiencia: "20 anos",
    formacao: "Faculdade de Medicina da Universidade de Coimbra"
  },
  {
    id: "4",
    nome: "Dra. Sofia Martins",
    foto: "/assets/images/doctors/dra-sofia-martins.jpg",
    especialidade: "pediatria",
    pontuacao: 5.0,
    hospital: "Hospital Pediátrico",
    endereco: "Rua dos Girassóis, 32 - Braga",
    telefone: "+351 939 876 543",
    horarios: [
      { diasSemana: "Segunda, Terça e Quinta", horas: "09:00 - 17:00" },
      { diasSemana: "Quarta", horas: "14:00 - 20:00" }
    ],
    experiencia: "8 anos",
    formacao: "Faculdade de Medicina da Universidade do Minho"
  },
  {
    id: "5",
    nome: "Dr. João Oliveira",
    foto: "/assets/images/doctors/dr-joao-oliveira.jpg",
    especialidade: "ortopedia",
    pontuacao: 4.6,
    hospital: "Hospital de Santo António",
    endereco: "Av. Central, 567 - Porto",
    telefone: "+351 932 145 678",
    horarios: [
      { diasSemana: "Terça à Sexta", horas: "08:30 - 16:30" },
      { diasSemana: "Sábado", horas: "09:00 - 13:00" }
    ],
    experiencia: "17 anos",
    formacao: "Faculdade de Medicina da Universidade Nova de Lisboa"
  },
  {
    id: "6",
    nome: "Dra. Isabel Ferreira",
    foto: "/assets/images/doctors/dra-isabel-ferreira.jpg",
    especialidade: "clinica-geral",
    pontuacao: 4.8,
    hospital: "Centro de Saúde Central",
    endereco: "Rua da Paz, 98 - Aveiro",
    telefone: "+351 925 147 258",
    horarios: [
      { diasSemana: "Segunda à Sexta", horas: "09:00 - 18:00" }
    ],
    experiencia: "10 anos",
    formacao: "Faculdade de Medicina da Universidade de Aveiro"
  },
  {
    id: "7",
    nome: "Dr. Pedro Almeida",
    foto: "/assets/images/doctors/dr-pedro-almeida.jpg",
    especialidade: "psiquiatria",
    pontuacao: 4.9,
    hospital: "Centro de Saúde Mental",
    endereco: "Av. dos Psicólogos, 44 - Coimbra",
    telefone: "+351 917 369 852",
    horarios: [
      { diasSemana: "Segunda, Quarta e Sexta", horas: "14:00 - 20:00" },
      { diasSemana: "Terça e Quinta", horas: "10:00 - 16:00" }
    ],
    experiencia: "13 anos",
    formacao: "Faculdade de Medicina da Universidade de Coimbra"
  }
];

// Opções de especialidades para filtro
export const especialidades = [
  "Todas", "Cardiologia", "Dermatologia", "Neurologia", 
  "Pediatria", "Ortopedia", "Oftalmologia", "Psiquiatria"
];