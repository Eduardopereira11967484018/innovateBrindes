export const API_CONFIG = {
  baseUrl: "https://apihomolog.innovationbrindes.com.br/api/site/v2",
  cache: {
    ttl: 5 * 60 * 1000, // 5 minutes
    staleTTL: 60 * 1000, // 1 minute
  },
  retry: {
    limit: 3,
    backoff: true,
  },
  batchInterval: 50, // ms
}

export const CACHE_KEYS = {
  products: "products",
  product: (id: string) => `product-${id}`,
  search: (query: string) => `search-${query}`,
}

