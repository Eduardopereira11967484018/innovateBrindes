"use client"

import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { AddressForm } from "./AddressForm"
import { PaymentForm } from "./PaymentForm"
import { OrderSummary } from "./OrderSummary"
import { styled } from "@/styles/stitches.config.ts"
import { Check } from "lucide-react"

const CheckoutContainer = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "$6",
})

const StepsContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "$8",
  position: "relative",

  "&::after": {
    content: "",
    position: "absolute",
    top: "50%",
    left: "0",
    right: "0",
    height: "2px",
    backgroundColor: "$gray200",
    zIndex: 0,
  },
})

const Step = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$2",
  padding: "$2 $4",
  backgroundColor: "$white",
  borderRadius: "$full",
  border: "2px solid $gray200",
  zIndex: 1,
  transition: "all 0.2s",

  variants: {
    active: {
      true: {
        borderColor: "$primary",
        color: "$primary",
      },
    },
    completed: {
      true: {
        backgroundColor: "$primary",
        borderColor: "$primary",
        color: "$white",
      },
    },
  },
})

const StepNumber = styled("span", {
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "$full",
  backgroundColor: "currentColor",
  color: "$white",
  fontSize: "$sm",
  fontWeight: "$bold",
})

const StepTitle = styled("span", {
  fontWeight: "$medium",
})

const FormContainer = styled("div", {
  backgroundColor: "$white",
  padding: "$6",
  borderRadius: "$lg",
  boxShadow: "$sm",
})

type Step = "address" | "payment" | "confirmation"

export function CheckoutForm() {
  const [currentStep, setCurrentStep] = useState<Step>("address")
  const [formData, setFormData] = useState({
    address: {},
    payment: {},
  })
  const { state: cartState } = useCart()

  const handleAddressSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, address: data }))
    setCurrentStep("payment")
  }

  const handlePaymentSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, payment: data }))
    setCurrentStep("confirmation")
  }

  const steps = [
    { id: "address", title: "Endereço" },
    { id: "payment", title: "Pagamento" },
    { id: "confirmation", title: "Confirmação" },
  ]

  return (
    <CheckoutContainer>
      <StepsContainer>
        {steps.map((step, index) => (
          <Step
            key={step.id}
            active={currentStep === step.id}
            completed={steps.findIndex((s) => s.id === currentStep) > steps.findIndex((s) => s.id === step.id)}
          >
            <StepNumber>
              {steps.findIndex((s) => s.id === currentStep) > steps.findIndex((s) => s.id === step.id) ? (
                <Check size={16} />
              ) : (
                index + 1
              )}
            </StepNumber>
            <StepTitle>{step.title}</StepTitle>
          </Step>
        ))}
      </StepsContainer>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <FormContainer>
          {currentStep === "address" && <AddressForm onSubmit={handleAddressSubmit} />}
          {currentStep === "payment" && <PaymentForm onSubmit={handlePaymentSubmit} />}
          {currentStep === "confirmation" && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">Pedido Confirmado!</h2>
              <p className="text-gray-600 mb-6">
                Seu pedido foi realizado com sucesso. Em breve você receberá um e-mail com os detalhes.
              </p>
              <p className="font-medium">Número do pedido: #{Math.random().toString(36).substr(2, 9)}</p>
            </div>
          )}
        </FormContainer>

        <OrderSummary items={cartState.items} total={cartState.total} />
      </div>
    </CheckoutContainer>
  )
}

