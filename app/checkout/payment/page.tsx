"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, CreditCard, QrCode } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Input } from "@/components/ui/input"

export default function CheckoutPaymentPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "pix">("credit-card")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/checkout/confirmation")
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      <Card className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Forma de Pagamento</h1>
          <p className="text-muted-foreground">Escolha como deseja pagar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <RadioGroup
            defaultValue="credit-card"
            onValueChange={(value) => setPaymentMethod(value as "credit-card" | "pix")}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Label
                htmlFor="credit-card"
                className="flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 [&:has(:checked)]:border-primary"
              >
                <RadioGroupItem value="credit-card" id="credit-card" className="sr-only" />
                <CreditCard className="h-6 w-6" />
                <span className="font-medium">Cartão de Crédito</span>
              </Label>
              <Label
                htmlFor="pix"
                className="flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 [&:has(:checked)]:border-primary"
              >
                <RadioGroupItem value="pix" id="pix" className="sr-only" />
                <QrCode className="h-6 w-6" />
                <span className="font-medium">PIX</span>
              </Label>
            </div>
          </RadioGroup>

          {paymentMethod === "credit-card" ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="card-number">Número do Cartão</Label>
                <Input id="card-number" placeholder="0000 0000 0000 0000" />
              </div>
              <div>
                <Label htmlFor="card-holder">Nome no Cartão</Label>
                <Input id="card-holder" placeholder="Nome como está no cartão" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="expiry">Validade</Label>
                  <Input id="expiry" placeholder="MM/AA" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" maxLength={4} />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <QrCode className="h-48 w-48 mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Escaneie o QR Code acima com o seu aplicativo do banco
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-2">Ou copie o código PIX:</p>
                <code className="text-sm break-all">
                  00020126580014br.gov.bcb.pix0136random-pix-key-here5204000053039865802BR5913Recipient
                </code>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full">
            {paymentMethod === "credit-card" ? "Finalizar Compra" : "Confirmar Pagamento"}
          </Button>
        </form>
      </Card>
    </div>
  )
}

