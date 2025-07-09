/**
 * Routes constants - Clean Code principle: Avoid magic strings
 * Centraliza todas as rotas da aplicação em um local
 */
export const ROUTES = {
  // Public routes
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  
  // Protected routes
  DASHBOARD: {
    ROOT: '/dashboard',
    ACCOUNT: '/dashboard/account',
    CONSULTAS: {
      ROOT: '/dashboard/consultas',
      AGENDAR: '/dashboard/consultas/agendar',
      HISTORICO: '/dashboard/consultas/historico',
    },
    EXAMES: {
      ROOT: '/dashboard/exames',
      ENVIAR: '/dashboard/exames/enviar',
    },
    MEDICOS: {
      ROOT: '/dashboard/medicos',
      DETAIL: (id: string) => `/dashboard/medicos/${id}`,
    },
  },
} as const

/**
 * Navigation items for sidebar
 */
export const NAVIGATION_ITEMS = [
  {
    title: "Dashboard",
    url: ROUTES.DASHBOARD.ROOT,
    icon: "LayoutGrid" as const
  },
  {
    title: "Médicos",
    url: ROUTES.DASHBOARD.MEDICOS.ROOT,
    icon: "BriefcaseMedical" as const,
  },
  {
    title: "Consultas Médicas",
    url: ROUTES.DASHBOARD.CONSULTAS.ROOT,
    icon: "BookOpen" as const,
    items: [
      {
        title: "Agendar Consulta",
        url: ROUTES.DASHBOARD.CONSULTAS.AGENDAR,
      },
      {
        title: "Histórico de Consultas",
        url: ROUTES.DASHBOARD.CONSULTAS.HISTORICO,
      }
    ]
  },
  {
    title: "Exames Médicos",
    url: ROUTES.DASHBOARD.EXAMES.ROOT,
    icon: "AudioWaveform" as const
  },
  {
    title: "Enviar Exames",
    url: ROUTES.DASHBOARD.EXAMES.ENVIAR,
    icon: "FileUp" as const
  },
]

/**
 * Application-wide constants
 */
export const APP_CONFIG = {
  NAME: "Good Doctor",
  DESCRIPTION: "Sistema de Gestão Médica",
  VERSION: "1.0.0",
  
  // UI Constants
  SIDEBAR: {
    WIDTH: "16rem",
    WIDTH_MOBILE: "18rem",
    WIDTH_ICON: "3rem",
  },
  
  // Storage keys
  STORAGE_KEYS: {
    AUTH_TOKEN: "auth-token",
    USER_DATA: "user-data",
    THEME: "theme",
  },
  
  // Validation
  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^(\+351)?[0-9]{9}$/,
    PASSWORD_MIN_LENGTH: 6,
  },
} as const

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  USERS: {
    PROFILE: '/api/users/profile',
    UPDATE: '/api/users/update',
  },
  CONSULTAS: {
    LIST: '/api/consultas',
    CREATE: '/api/consultas',
    UPDATE: (id: string) => `/api/consultas/${id}`,
    DELETE: (id: string) => `/api/consultas/${id}`,
  },
  MEDICOS: {
    LIST: '/api/medicos',
    DETAIL: (id: string) => `/api/medicos/${id}`,
  },
  EXAMES: {
    LIST: '/api/exames',
    UPLOAD: '/api/exames/upload',
  },
} as const

/**
 * Status enums for better type safety
 */
export enum ConsultaStatus {
  AGENDADA = 'agendada',
  EM_ANDAMENTO = 'em_andamento',
  CONCLUIDA = 'concluida',
  CANCELADA = 'cancelada',
}

export enum ExameStatus {
  PENDENTE = 'pendente',
  REALIZADO = 'realizado',
  CANCELADO = 'cancelado',
}

export enum NotificationStatus {
  UNREAD = 'unread',
  READ = 'read',
}

export enum NotificationType {
  CONSULTA = 'consulta',
  EXAME = 'exame',
  RESULTADO = 'resultado',
  SISTEMA = 'sistema',
}
