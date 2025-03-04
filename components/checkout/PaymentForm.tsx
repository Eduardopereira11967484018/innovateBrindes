"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { styled } from "@/styles/stitches.config.ts"
import { CreditCard, QrCodeIcon as Qrcode } from "lucide-react"

const PaymentOption = styled("div", {
  border: "2px solid $gray200",
  borderRadius: "$md",
  padding: "$4",
  cursor: "pointer",
  transition: "all 0.2s",

  "&[data-state=checked]": {
    borderColor: "$primary",
    backgroundColor: "$gray50",
  },
})

const paymentSchema = z.object({
  method: z.enum(["credit_card", "pix"]),
  card_number: z.string().optional(),
  card_holder: z.string().optional(),
  expiry_date: z.string().optional(),
  cvv: z.string().optional(),
})

type PaymentFormData = z.infer<typeof paymentSchema>

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void
}

export function PaymentForm({ onSubmit }: PaymentFormProps) {
  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      method: "credit_card",
    },
  })

  const watchMethod = form.watch("method")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Método de Pagamento</h2>

          <FormField
            control={form.control}
            name="method"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    <PaymentOption>
                      <RadioGroupItem value="credit_card" id="credit_card" className="sr-only" />
                      <label htmlFor="credit_card" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="h-5 w-5" />
                        <span className="font-medium">Cartão de Crédito</span>
                      </label>
                    </PaymentOption>
                    <PaymentOption>
                      <RadioGroupItem value="pix" id="pix" className="sr-only" />
                      <label htmlFor="pix" className="flex items-center gap-2 cursor-pointer">
                        <Qrcode className="h-5 w-5" />
                        <span className="font-medium">PIX</span>
                      </label>
                    </PaymentOption>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {watchMethod === "credit_card" && (
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="card_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número do cartão</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="0000 0000 0000 0000" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="card_holder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome no cartão</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="expiry_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de validade</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="MM/AA" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input {...field} maxLength={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {watchMethod === "pix" && (
          <div className="text-center p-8">
            <Qrcode className="h-48 w-48 mx-auto mb-4 text-primary" />
            <p className="text-sm text-muted-foreground mb-2">
              Escaneie o QR Code acima com seu aplicativo de pagamento
            </p>
            <p className="font-medium">Ou copie o código PIX:</p>
            <div className="mt-2 p-2 bg-gray-50 rounded border">
              <code className="text-sm">
                00020126580014br.gov.bcb.pix0136random-pix-key-here5204000053039865802BR5913Recipient Name6009SAO
                PAULO62070503***63040B6D
              </code>
            </div>
          </div>
        )}

        <Button type="submit" className="w-full">
          {watchMethod === "credit_card" ? "Finalizar Compra" : "Confirmar Pagamento"}
        </Button>
      </form>
    </Form>
  )
}

