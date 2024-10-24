import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

abstract class BaseApi {
  protected static BASE_URL = process.env.API_ROUTE;
  private static axiosInstance: AxiosInstance;

  private static getInstance(): AxiosInstance {
    if (!this.axiosInstance) {
      this.axiosInstance = axios.create({
        baseURL: this.BASE_URL,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return this.axiosInstance;
  }

  protected static async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.getInstance().request<T>(config);
    return response.data;
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
    return this.request<T>({ ...config, method: 'POST', url: endpoint, data });
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
