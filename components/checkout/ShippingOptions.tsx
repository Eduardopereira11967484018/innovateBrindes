"use client"

import { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Loader2, Truck, Clock } from "lucide-react"
import { correiosApi } from "@/services/correios-api"

interface ShippingOption {
  service: string
  name: string
  price: number
  days: number
}

interface ShippingOptionsProps {
  cep: string
  cartItems: Array<{
    id: string
    price: number
    quantity: number
  }>
  onSelectShipping: (option: ShippingOption) => void
}

export function ShippingOptions({ cep, cartItems, onSelectShipping }: ShippingOptionsProps) {
  const [options, setOptions] = useState<ShippingOption[]>([])
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchShippingOptions = async () => {
      if (!cep || cep.length < 8) return

      setIsLoading(true)
      setError("")

      try {
        // Add mock weight since our cart items don't have weight
        const productsWithWeight = cartItems.map((item) => ({
          ...item,
          weight: 0.5, // 500g per item as default
        }))

        const shippingOptions = await correiosApi.calculateShipping(cep, productsWithWeight)

        if (shippingOptions.length === 0) {
          setError("Não foi possível calcular o frete para este CEP")
        } else {
          setOptions(shippingOptions)
          // Select the first option by default
          setSelectedOption(shippingOptions[0].service)
          onSelectShipping(shippingOptions[0])
        }
      } catch (error) {
        setError("Erro ao calcular opções de frete")
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchShippingOptions()
  }, [cep, cartItems, onSelectShipping])

  const handleSelectOption = (value: string) => {
    setSelectedOption(value)
    const option = options.find((opt) => opt.service === value)
    if (option) {
      onSelectShipping(option)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-6">
        <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
        <span>Calculando opções de frete...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-4 text-destructive">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Opções de Entrega</h3>

      {options.length > 0 ? (
        <RadioGroup value={selectedOption} onValueChange={handleSelectOption}>
          <div className="grid gap-3">
            {options.map((option) => (
              <Label key={option.service} htmlFor={option.service} className="cursor-pointer">
                <Card className={`p-4 ${selectedOption === option.service ? "border-primary" : ""}`}>
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value={option.service} id={option.service} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{option.name}</div>
                        <div className="font-bold text-primary">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(option.price)}
                        </div>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>
                          Entrega em até {option.days} {option.days === 1 ? "dia útil" : "dias úteis"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Label>
            ))}
          </div>
        </RadioGroup>
      ) : (
        <div className="text-center py-4 text-muted-foreground">
          <Truck className="h-8 w-8 mx-auto mb-2" />
          <p>Informe seu CEP para calcular o frete</p>
        </div>
      )}
    </div>
  )
}

