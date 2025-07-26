import { User } from "@/hooks/use-auth";

export interface LoginCredentials {
  email: string;
  password: string;
}

// Mock users data - compatible with new User interface
export const users: User[] = [
  {
    id: '1',
    email: 'admin@gooddoctor.pt',
    name: 'Dr. João Silva',
    phone: '+351912345678',
    role: 'admin',
    avatar: '/assets/images/avatars/admin.png',
    address: 'Rua da Saúde, 123, Porto',
    birthDate: '1980-05-15',
    emergencyContact: '+351932345678',
    bloodType: 'A+',
    allergies: 'Nenhuma conhecida',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'maria.santos@email.pt',
    name: 'Maria Santos',
    phone: '+351923456789',
    role: 'patient',
    avatar: '/assets/images/avatars/patient-female.png',
    address: 'Av. da República, 456, Lisboa',
    birthDate: '1985-08-22',
    emergencyContact: '+351933456789',
    bloodType: 'O-',
    allergies: 'Penicilina',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    email: 'ana.costa@gooddoctor.pt',
    name: 'Dr. Ana Costa',
    phone: '+351934567890',
    role: 'doctor',
    avatar: '/assets/images/avatars/doctor-female.png',
    address: 'Rua dos Médicos, 789, Coimbra',
    birthDate: '1978-12-03',
    emergencyContact: '+351934567891',
    bloodType: 'B+',
    allergies: 'Nenhuma conhecida',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    email: 'carlos.pereira@email.pt',
    name: 'Carlos Pereira',
    phone: '+351945678901',
    role: 'patient',
    avatar: '/assets/images/avatars/patient-male.png',
    address: 'Rua das Flores, 321, Braga',
    birthDate: '1990-03-10',
    emergencyContact: '+351945678902',
    bloodType: 'AB+',
    allergies: 'Látex, Aspirina',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    email: 'luis.rodrigues@gooddoctor.pt',
    name: 'Dr. Luís Rodrigues',
    phone: '+351956789012',
    role: 'doctor',
    avatar: '/assets/images/avatars/doctor-male.png',
    address: 'Av. dos Hospitais, 654, Aveiro',
    birthDate: '1975-07-20',
    emergencyContact: '+351956789013',
    bloodType: 'A-',
    allergies: 'Nenhuma conhecida',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  }
];

/**
 * Simula a autenticação de um usuário
 * @param credentials Credenciais de login (email e senha)
 * @returns Dados do usuário e token ou null se autenticação falhar
 */
export const authenticateUser = (credentials: LoginCredentials): { user: User; token: string } | null => {
  // Mock token generation
  const generateToken = () => `mock_token_${Date.now()}_${Math.random().toString(36).substring(2)}`;

  // Credenciais para admin (múltiplas formas de login)
  if (
    (credentials.email === 'admin' && credentials.password === 'admin1234') ||
    (credentials.email === 'admin@gooddoctor.pt' && credentials.password === 'admin1234')
  ) {
    return { user: users[0], token: generateToken() };
  }
  
  // Para a paciente Maria Santos
  if (
    (credentials.email === 'maria' && credentials.password === 'maria123') ||
    (credentials.email === 'maria.santos@email.pt' && credentials.password === 'maria123')
  ) {
    return { user: users[1], token: generateToken() };
  }

  // Para a doutora Ana Costa
  if (
    (credentials.email === 'ana' && credentials.password === 'ana123') ||
    (credentials.email === 'ana.costa@gooddoctor.pt' && credentials.password === 'ana123')
  ) {
    return { user: users[2], token: generateToken() };
  }

  // Para o paciente Carlos Pereira
  if (
    (credentials.email === 'carlos' && credentials.password === 'carlos123') ||
    (credentials.email === 'carlos.pereira@email.pt' && credentials.password === 'carlos123')
  ) {
    return { user: users[3], token: generateToken() };
  }

  // Para o doutor Luís Rodrigues
  if (
    (credentials.email === 'luis' && credentials.password === 'luis123') ||
    (credentials.email === 'luis.rodrigues@gooddoctor.pt' && credentials.password === 'luis123')
  ) {
    return { user: users[4], token: generateToken() };
  }

  // Manter compatibilidade com credenciais antigas
  if (credentials.email === 'patient@example.com' && credentials.password === 'patient1234') {
    return { user: users[1], token: generateToken() };
  }

  if (credentials.email === 'doctor@example.com' && credentials.password === 'doctor1234') {
    return { user: users[2], token: generateToken() };
  }
  
  return null; // Autenticação falhou
};