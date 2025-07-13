/**
 * Base API service interface - Clean Architecture
 * Defines contracts for all API services
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * HTTP Methods enum for type safety
 */
export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

/**
 * Base API error class
 */
export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number,
    public code?: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Abstract base service class implementing common API functionality
 * Follows Clean Architecture principles with dependency inversion
 */
export abstract class BaseApiService {
  protected baseUrl: string;
  protected defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = "/api") {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  /**
   * Set authentication token for requests
   */
  setAuthToken(token: string): void {
    this.defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  /**
   * Remove authentication token
   */
  removeAuthToken(): void {
    delete this.defaultHeaders["Authorization"];
  }

  /**
   * Generic HTTP request method with error handling
   */
  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const config: RequestInit = {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
      };

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || "Request failed",
          response.status,
          data.code,
          data.errors
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Handle network errors
      throw new ApiError(
        "Network error occurred",
        0,
        "NETWORK_ERROR",
        error instanceof Error ? { message: error.message } : undefined
      );
    }
  }

  /**
   * HTTP GET request
   */
  protected async get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean>
  ): Promise<ApiResponse<T>> {
    const searchParams = params
      ? new URLSearchParams(
          Object.entries(params).reduce((acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
          }, {} as Record<string, string>)
        ).toString()
      : "";
    const url = searchParams ? `${endpoint}?${searchParams}` : endpoint;

    return this.request<T>(url, {
      method: HttpMethod.GET,
    });
  }

  /**
   * HTTP POST request
   */
  protected async post<T>(
    endpoint: string,
    data?: unknown
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: HttpMethod.POST,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * HTTP PUT request
   */
  protected async put<T>(
    endpoint: string,
    data?: unknown
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: HttpMethod.PUT,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * HTTP PATCH request
   */
  protected async patch<T>(
    endpoint: string,
    data?: unknown
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: HttpMethod.PATCH,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * HTTP DELETE request
   */
  protected async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: HttpMethod.DELETE,
    });
  }

  /**
   * File upload request
   */
  protected async upload<T>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, string | number | boolean>
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append("file", file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
    }

    const headers = { ...this.defaultHeaders };
    delete headers["Content-Type"]; // Let browser set content-type for FormData

    return this.request<T>(endpoint, {
      method: HttpMethod.POST,
      headers,
      body: formData,
    });
  }
}
