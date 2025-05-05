export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Mock users data
export const users: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Administrator',
    role: 'admin',
    avatar: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Avery'
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
  }
];

/**
 * Simula a autenticação de um usuário
 * @param credentials Credenciais de login (email e senha)
 * @returns Dados do usuário ou null se autenticação falhar
 */
export const authenticateUser = (credentials: LoginCredentials): User | null => {
  // Verifica se as credenciais são admin/admin1234
  if (
    credentials.email === 'admin' && 
    credentials.password === 'admin1234'
  ) {
    return users[0]; // Retorna o usuário administrador
  }
  
  // Se usar email de verdade
  if (
    credentials.email === 'admin@example.com' && 
    credentials.password === 'admin1234'
  ) {
    return users[0];
  }
  
  // Para o usuário regular
  if (
    credentials.email === 'user@example.com' && 
    credentials.password === 'user1234'
  ) {
    return users[1];
  }
  
  return null; // Autenticação falhou
};