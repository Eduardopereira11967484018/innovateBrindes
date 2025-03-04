import { API_CONFIG } from "./api-config"

class APIClient {
  private cache: Map<string, { data: any; timestamp: number }> = new Map()
  private pendingRequests: Map<string, Promise<any>> = new Map()

  private async fetchWithRetry(url: string, options: RequestInit = {}, retryCount = 0): Promise<Response> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response
    } catch (error) {
      if (retryCount < API_CONFIG.retry.limit) {
        const delay = API_CONFIG.retry.backoff ? Math.pow(2, retryCount) * 1000 : 1000

        await new Promise((resolve) => setTimeout(resolve, delay))
        return this.fetchWithRetry(url, options, retryCount + 1)
      }
      throw error
    }
  }

  private getCacheKey(url: string, params?: Record<string, any>): string {
    return params ? `${url}?${new URLSearchParams(params).toString()}` : url
  }

  private isCacheValid(timestamp: number): boolean {
    const now = Date.now()
    return now - timestamp < API_CONFIG.cache.ttl
  }

  private isCacheStale(timestamp: number): boolean {
    const now = Date.now()
    return now - timestamp > API_CONFIG.cache.staleTTL
  }

  async request<T>(url: string, options: RequestInit = {}, params?: Record<string, any>): Promise<T> {
    const cacheKey = this.getCacheKey(url, params)
    const cached = this.cache.get(cacheKey)

    // Return cached data if valid
    if (cached && this.isCacheValid(cached.timestamp)) {
      return cached.data
    }

    // Check for pending request
    const pendingRequest = this.pendingRequests.get(cacheKey)
    if (pendingRequest) {
      return pendingRequest
    }

    // If cache is stale but exists, return stale data and refresh in background
    if (cached && !this.isCacheValid(cached.timestamp)) {
      this.refreshCache(cacheKey, url, options)
      return cached.data
    }

    // Make new request
    const promise = this.fetchWithRetry(url, options)
      .then((response) => response.json())
      .then((data) => {
        this.cache.set(cacheKey, { data, timestamp: Date.now() })
        this.pendingRequests.delete(cacheKey)
        return data
      })
      .catch((error) => {
        this.pendingRequests.delete(cacheKey)
        throw error
      })

    this.pendingRequests.set(cacheKey, promise)
    return promise
  }

  private async refreshCache(cacheKey: string, url: string, options: RequestInit): Promise<void> {
    try {
      const response = await this.fetchWithRetry(url, options)
      const data = await response.json()
      this.cache.set(cacheKey, { data, timestamp: Date.now() })
    } catch (error) {
      console.error("Error refreshing cache:", error)
    }
  }

  clearCache(): void {
    this.cache.clear()
  }

  invalidateCache(key: string): void {
    this.cache.delete(key)
  }
}

export const apiClient = {
  async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request error:", error)
      throw error
    }
  },
}

