"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, ShoppingBag, Package } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useEffect, useState } from "react"

export default function CheckoutConfirmationPage() {
  const router = useRouter()
  const { dispatch } = useCart()
  const [orderId, setOrderId] = useState("")
  const [trackingCode, setTrackingCode] = useState("")

  useEffect(() => {
    // Generate random order ID and tracking code
    setOrderId(Math.random().toString(36).substr(2, 9).toUpperCase())

    // Generate random tracking code in Correios format
    const prefix = ["AA", "JO", "LB", "RX"][Math.floor(Math.random() * 4)]
    const numbers = Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(9, "0")
    setTrackingCode(`${prefix}${numbers}BR`)

    // Clear the cart after successful purchase
    dispatch({ type: "CLEAR_CART" })

    // Clear checkout data
    localStorage.removeItem("checkout_address")
    localStorage.removeItem("checkout_shipping")
  }, [dispatch])

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <Card className="p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-primary" />
        </div>

        <h1 className="text-2xl font-bold text-primary mb-4">Pedido Confirmado!</h1>
        <p className="text-muted-foreground mb-6">
          Seu pedido foi realizado com sucesso. Em breve você receberá um e-mail com os detalhes.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <p className="text-sm text-muted-foreground mb-2">Número do pedido:</p>
          <p className="text-lg font-bold">#{orderId}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Package className="h-5 w-5 text-primary" />
            <p className="font-medium">Código de Rastreamento:</p>
          </div>
          <p className="text-lg font-mono">{trackingCode}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Use este código para acompanhar sua entrega na página de rastreamento
          </p>
          <Button variant="outline" className="mt-4" onClick={() => router.push(`/tracking?code=${trackingCode}`)}>
            Rastrear Pedido
          </Button>
        </div>

        <Button onClick={() => router.push("/")} className="gap-2">
          <ShoppingBag className="h-4 w-4" />
          Voltar às Compras
        </Button>
      </Card>
    </div>
  )
}

