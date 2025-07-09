import { APP_CONFIG } from '@/constants/app';

/**
 * Validation utilities following Clean Code principles
 * Single Responsibility: Each function validates one specific thing
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class ValidationError extends Error {
  constructor(public errors: string[]) {
    super(`Validation failed: ${errors.join(', ')}`);
    this.name = 'ValidationError';
  }
}

/**
 * Email validation utility
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  
  if (!email || email.trim() === '') {
    errors.push('Email é obrigatório');
  } else if (!APP_CONFIG.VALIDATION.EMAIL_REGEX.test(email)) {
    errors.push('Email deve ter um formato válido');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Password validation utility
 */
export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];
  
  if (!password || password.trim() === '') {
    errors.push('Senha é obrigatória');
  } else if (password.length < APP_CONFIG.VALIDATION.PASSWORD_MIN_LENGTH) {
    errors.push(`Senha deve ter pelo menos ${APP_CONFIG.VALIDATION.PASSWORD_MIN_LENGTH} caracteres`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Phone validation utility
 */
export function validatePhone(phone: string): ValidationResult {
  const errors: string[] = [];
  
  if (phone && !APP_CONFIG.VALIDATION.PHONE_REGEX.test(phone)) {
    errors.push('Telefone deve ter um formato válido (+351XXXXXXXXX)');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Required field validation utility
 */
export function validateRequired(value: any, fieldName: string): ValidationResult {
  const errors: string[] = [];
  
  if (value === null || value === undefined || value === '') {
    errors.push(`${fieldName} é obrigatório`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Date validation utility
 */
export function validateDate(date: string | Date, fieldName: string = 'Data'): ValidationResult {
  const errors: string[] = [];
  
  if (!date) {
    errors.push(`${fieldName} é obrigatória`);
  } else {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      errors.push(`${fieldName} deve ter um formato válido`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Future date validation utility
 */
export function validateFutureDate(date: string | Date, fieldName: string = 'Data'): ValidationResult {
  const dateValidation = validateDate(date, fieldName);
  
  if (!dateValidation.isValid) {
    return dateValidation;
  }
  
  const errors: string[] = [];
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  
  if (dateObj <= now) {
    errors.push(`${fieldName} deve ser uma data futura`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Time validation utility
 */
export function validateTime(time: string, fieldName: string = 'Hora'): ValidationResult {
  const errors: string[] = [];
  
  if (!time) {
    errors.push(`${fieldName} é obrigatória`);
  } else {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    
    if (!timeRegex.test(time)) {
      errors.push(`${fieldName} deve ter formato HH:MM`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Composite validation utility - validates multiple fields
 */
export function validateForm(validations: (() => ValidationResult)[]): ValidationResult {
  const allErrors: string[] = [];
  
  validations.forEach(validation => {
    const result = validation();
    if (!result.isValid) {
      allErrors.push(...result.errors);
    }
  });
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
}

/**
 * Login form validation
 */
export function validateLoginForm(email: string, password: string): ValidationResult {
  return validateForm([
    () => validateEmail(email),
    () => validatePassword(password)
  ]);
}

/**
 * Consulta form validation
 */
export interface ConsultaFormData {
  medicoId: string;
  especialidade: string;
  dataHora: string;
  observacoes?: string;
}

export function validateConsultaForm(data: ConsultaFormData): ValidationResult {
  return validateForm([
    () => validateRequired(data.medicoId, 'Médico'),
    () => validateRequired(data.especialidade, 'Especialidade'),
    () => validateFutureDate(data.dataHora, 'Data e hora da consulta')
  ]);
}

/**
 * User profile validation
 */
export interface UserProfileData {
  name: string;
  email: string;
  phone?: string;
}

export function validateUserProfile(data: UserProfileData): ValidationResult {
  const validations = [
    () => validateRequired(data.name, 'Nome'),
    () => validateEmail(data.email)
  ];
  
  if (data.phone) {
    validations.push(() => validatePhone(data.phone!));
  }
  
  return validateForm(validations);
}
