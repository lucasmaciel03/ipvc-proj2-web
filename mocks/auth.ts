import { User } from "@/hooks/use-auth";

export interface LoginCredentials {
  email: string;
  password: string;
}

// Mock users data - compatible with new User interface
export const users: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Dr. João Silva',
    phone: '+351912345678',
    role: 'admin',
    avatar: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Avery',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'patient@example.com',
    name: 'Maria Santos',
    phone: '+351923456789',
    role: 'patient',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    email: 'doctor@example.com',
    name: 'Dr. Ana Costa',
    phone: '+351934567890',
    role: 'doctor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=doctor',
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

  // Verifica se as credenciais são admin/admin1234
  if (
    credentials.email === 'admin' && 
    credentials.password === 'admin1234'
  ) {
    return { user: users[0], token: generateToken() };
  }
  
  // Se usar email de verdade
  if (
    credentials.email === 'admin@example.com' && 
    credentials.password === 'admin1234'
  ) {
    return { user: users[0], token: generateToken() };
  }
  
  // Para o usuário paciente
  if (
    credentials.email === 'patient@example.com' && 
    credentials.password === 'patient1234'
  ) {
    return { user: users[1], token: generateToken() };
  }

  // Para o médico
  if (
    credentials.email === 'doctor@example.com' && 
    credentials.password === 'doctor1234'
  ) {
    return { user: users[2], token: generateToken() };
  }
  
  return null; // Autenticação falhou
};