import { Check } from "lucide-react"
import { styled } from "@/styles/stitches.config.ts"

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
  "@media (max-width: 640px)": {
    display: "none",
  },
})

interface CheckoutStepsProps {
  currentStep: "address" | "payment" | "confirmation"
}

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = [
    { id: "address", title: "Endereço" },
    { id: "payment", title: "Pagamento" },
    { id: "confirmation", title: "Confirmação" },
  ]

  return (
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
  )
}

