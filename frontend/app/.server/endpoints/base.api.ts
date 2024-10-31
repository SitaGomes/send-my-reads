import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

abstract class BaseApi {
  protected static BASE_URL = process.env.API_ROUTE || 'http://localhost:3333';
  private static axiosInstance: AxiosInstance;

  private static getInstance(): AxiosInstance {
    if (!this.axiosInstance) {
      this.axiosInstance = axios.create({
        baseURL: this.BASE_URL,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      this.axiosInstance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
          if (error.response) {
            const message =
              (error.response.data as { message?: string })?.message ||
              error.message;
            throw new Error(message);
          } else if (error.request) {
            throw new Error('No response received from server');
          } else {
            throw new Error('Error setting up the request');
          }
        },
      );
    }
    return this.axiosInstance;
  }

  protected static async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.getInstance().request<T>(config);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  protected static async get<T>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({ ...config, method: 'GET', url: endpoint });
  }

  protected static async post<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'POST',
      url: endpoint,
      data,
    });
  }

  protected static async put<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT', url: endpoint, data });
  }

  protected static async delete<T>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE', url: endpoint });
  }
}

export default BaseApi;
