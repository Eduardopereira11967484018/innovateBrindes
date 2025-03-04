"use client"

import { useRouter } from "next/navigation"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { ShippingOptions } from "@/components/checkout/ShippingOptions"
import { AddressForm } from "@/components/checkout/AddressForm"

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  cep: z.string().min(8, "CEP inválido").max(9, "CEP inválido"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().length(2, "Estado deve ter 2 letras"),
})

export default function CheckoutAddressPage() {
  const router = useRouter()
  const { state: cartState } = useCart()
  const [selectedShipping, setSelectedShipping] = useState<any>(null)

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Save address and shipping info to localStorage
    localStorage.setItem("checkout_address", JSON.stringify(values))

    if (selectedShipping) {
      localStorage.setItem("checkout_shipping", JSON.stringify(selectedShipping))
    }

    router.push("/checkout/payment")
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      <div className="grid gap-6 md:grid-cols-[1fr_350px]">
        <Card className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Endereço de Entrega</h1>
            <p className="text-muted-foreground">Preencha os dados para entrega</p>
          </div>

          <AddressForm onSubmit={onSubmit} />
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(cartState.total)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Frete</span>
                <span>
                  {selectedShipping
                    ? new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(selectedShipping.price)
                    : "Calculando..."}
                </span>
              </div>

              <div className="border-t pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(cartState.total + (selectedShipping?.price || 0))}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <ShippingOptions
              cep="01310100" // Default CEP for demo
              cartItems={cartState.items}
              onSelectShipping={setSelectedShipping}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

