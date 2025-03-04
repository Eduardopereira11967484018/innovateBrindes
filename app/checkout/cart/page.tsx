"use client"

import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShoppingBag, Truck, CreditCard } from "lucide-react"

export default function CheckoutCartPage() {
  const router = useRouter()
  const { state } = useCart()

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">Revise seu pedido e continue para o pagamento</p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-lg">Resumo do Pedido</h2>
          </div>

          <div className="space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="h-16 w-16 rounded-md overflow-hidden">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
                  <p className="text-sm font-medium">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(state.total)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Frete</span>
                <span className="text-primary">Grátis</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(state.total)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Truck className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-lg">Entrega</h2>
          </div>
          <p className="text-muted-foreground mb-4">Informe seu endereço para calcularmos o prazo de entrega</p>
          <Button className="w-full" onClick={() => router.push("/checkout/address")}>
            Informar Endereço de Entrega
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <CreditCard className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-lg">Pagamento</h2>
          </div>
          <p className="text-muted-foreground mb-4">Escolha a forma de pagamento de sua preferência</p>
          <Button className="w-full" variant="outline" disabled>
            Escolher Forma de Pagamento
          </Button>
        </Card>
      </div>
    </div>
  )
}

