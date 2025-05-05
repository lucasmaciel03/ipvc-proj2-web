// Tipos comuns utilizados em toda a aplicação

// Tipo para respostas de API
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Tipo para erros de API
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Tipo para user
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Tipo para estados de carregamento
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Tipando temas
export type Theme = 'light' | 'dark' | 'system';