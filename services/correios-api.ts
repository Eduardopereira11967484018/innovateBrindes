// Correios API Service

interface AddressData {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
}

interface ShippingOption {
  service: string
  name: string
  price: number
  days: number
}

interface TrackingInfo {
  code: string
  events: {
    date: string
    time: string
    location: string
    status: string
    description: string
  }[]
}

export const correiosApi = {
  /**
   * Busca endereço pelo CEP
   */
  async getAddressByCep(cep: string): Promise<AddressData | null> {
    try {
      // Remove non-numeric characters
      const cleanCep = cep.replace(/\D/g, "")

      if (cleanCep.length !== 8) {
        throw new Error("CEP inválido")
      }

      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
      const data = await response.json()

      if (data.erro) {
        return null
      }

      return {
        cep: data.cep,
        logradouro: data.logradouro,
        complemento: data.complemento,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error)
      return null
    }
  },

  /**
   * Calcula opções de frete
   */
  async calculateShipping(
    cep: string,
    products: { weight: number; price: number; quantity: number }[],
  ): Promise<ShippingOption[]> {
    try {
      // Remove non-numeric characters
      const cleanCep = cep.replace(/\D/g, "")

      if (cleanCep.length !== 8) {
        throw new Error("CEP inválido")
      }

      // In a real implementation, we would call the Correios API
      // For demo purposes, we'll return mock data based on the CEP

      // Calculate total weight and value
      const totalWeight = products.reduce((sum, product) => sum + product.weight * product.quantity, 0)
      const totalValue = products.reduce((sum, product) => sum + product.price * product.quantity, 0)

      // Base prices
      let sedexPrice = 25.5 + totalWeight * 0.5
      let pacPrice = 18.3 + totalWeight * 0.3

      // Adjust based on destination (using the first digit of CEP)
      const region = Number.parseInt(cleanCep.charAt(0))

      // Regions farther from São Paulo (where we assume the store is located)
      if (region >= 6) {
        sedexPrice *= 1.2
        pacPrice *= 1.15
      }

      // Delivery estimates
      const sedexDays = region >= 6 ? 3 : 1
      const pacDays = region >= 6 ? 8 : 5

      return [
        {
          service: "SEDEX",
          name: "SEDEX - Entrega rápida",
          price: Number.parseFloat(sedexPrice.toFixed(2)),
          days: sedexDays,
        },
        {
          service: "PAC",
          name: "PAC - Entrega econômica",
          price: Number.parseFloat(pacPrice.toFixed(2)),
          days: pacDays,
        },
      ]
    } catch (error) {
      console.error("Erro ao calcular frete:", error)
      return []
    }
  },

  /**
   * Rastreia encomenda pelo código
   */
  async trackPackage(code: string): Promise<TrackingInfo | null> {
    try {
      // In a real implementation, we would call the Correios tracking API
      // For demo purposes, we'll return mock data based on the code

      // Check if code follows Correios format (e.g., AA123456789BR)
      const isValidCode = /^[A-Z]{2}\d{9}[A-Z]{2}$/.test(code)

      if (!isValidCode) {
        throw new Error("Código de rastreio inválido")
      }

      // Generate mock tracking data
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      const twoDaysAgo = new Date(today)
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

      return {
        code,
        events: [
          {
            date: today.toLocaleDateString("pt-BR"),
            time: "14:35",
            location: "São Paulo / SP",
            status: "Objeto em trânsito",
            description: "de Unidade de Tratamento em SÃO PAULO / SP para Unidade de Distribuição em CAMPINAS / SP",
          },
          {
            date: yesterday.toLocaleDateString("pt-BR"),
            time: "09:12",
            location: "São Paulo / SP",
            status: "Objeto postado",
            description: "Objeto postado após o horário limite da unidade",
          },
        ],
      }
    } catch (error) {
      console.error("Erro ao rastrear encomenda:", error)
      return null
    }
  },
}

