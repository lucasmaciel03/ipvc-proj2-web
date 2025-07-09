import { BaseApiService, ApiResponse, PaginatedResponse } from './base';
import { API_ENDPOINTS, ConsultaStatus } from '@/constants/app';

export interface Consulta {
  id: string;
  pacienteId: string;
  medicoId: string;
  especialidade: string;
  dataHora: string;
  status: ConsultaStatus;
  observacoes?: string;
  sintomas?: string;
  diagnostico?: string;
  prescricao?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateConsultaRequest {
  medicoId: string;
  especialidade: string;
  dataHora: string;
  observacoes?: string;
  sintomas?: string;
}

export interface UpdateConsultaRequest {
  dataHora?: string;
  observacoes?: string;
  sintomas?: string;
  diagnostico?: string;
  prescricao?: string;
  status?: ConsultaStatus;
}

export interface ConsultaFilters {
  status?: ConsultaStatus;
  especialidade?: string;
  medicoId?: string;
  dataInicio?: string;
  dataFim?: string;
  page?: number;
  limit?: number;
}

/**
 * Consultas service following Clean Architecture
 */
export class ConsultasService extends BaseApiService {
  /**
   * Get all consultas with optional filters
   */
  async getConsultas(filters?: ConsultaFilters): Promise<PaginatedResponse<Consulta>> {
    return this.get<Consulta[]>(API_ENDPOINTS.CONSULTAS.LIST, filters) as Promise<PaginatedResponse<Consulta>>;
  }

  /**
   * Get consulta by ID
   */
  async getConsultaById(id: string): Promise<ApiResponse<Consulta>> {
    return this.get<Consulta>(`${API_ENDPOINTS.CONSULTAS.LIST}/${id}`);
  }

  /**
   * Create new consulta
   */
  async createConsulta(data: CreateConsultaRequest): Promise<ApiResponse<Consulta>> {
    return this.post<Consulta>(API_ENDPOINTS.CONSULTAS.CREATE, data);
  }

  /**
   * Update consulta
   */
  async updateConsulta(id: string, data: UpdateConsultaRequest): Promise<ApiResponse<Consulta>> {
    return this.put<Consulta>(API_ENDPOINTS.CONSULTAS.UPDATE(id), data);
  }

  /**
   * Cancel consulta
   */
  async cancelConsulta(id: string): Promise<ApiResponse<Consulta>> {
    return this.patch<Consulta>(API_ENDPOINTS.CONSULTAS.UPDATE(id), {
      status: ConsultaStatus.CANCELADA
    });
  }

  /**
   * Delete consulta
   */
  async deleteConsulta(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(API_ENDPOINTS.CONSULTAS.DELETE(id));
  }

  /**
   * Get available time slots for a doctor
   */
  async getAvailableSlots(medicoId: string, date: string): Promise<ApiResponse<string[]>> {
    return this.get<string[]>(`/consultas/available-slots`, { medicoId, date });
  }
}

// Singleton instance
export const consultasService = new ConsultasService();
