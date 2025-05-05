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
    foto: "https://randomuser.me/api/portraits/men/1.jpg",
    especialidade: "Cardiologia",
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
    foto: "https://randomuser.me/api/portraits/women/1.jpg",
    especialidade: "Dermatologia",
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
    foto: "https://randomuser.me/api/portraits/men/2.jpg",
    especialidade: "Neurologia",
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
    foto: "https://randomuser.me/api/portraits/women/2.jpg",
    especialidade: "Pediatria",
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
    foto: "https://randomuser.me/api/portraits/men/3.jpg",
    especialidade: "Ortopedia",
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
  }
];

// Opções de especialidades para filtro
export const especialidades = [
  "Todas", "Cardiologia", "Dermatologia", "Neurologia", 
  "Pediatria", "Ortopedia", "Oftalmologia", "Psiquiatria"
];