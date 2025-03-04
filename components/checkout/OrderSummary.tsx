"use client"

import { styled } from "@/styles/stitches.config.ts"
import type { CartItem } from "@/lib/types"

const SummaryContainer = styled("div", {
  backgroundColor: "$white",
  padding: "$6",
  borderRadius: "$lg",
  boxShadow: "$sm",
})

const ItemList = styled("div", {
  marginBottom: "$6",
  maxHeight: "400px",
  overflowY: "auto",
})

const Item = styled("div", {
  display: "flex",
  gap: "$4",
  padding: "$3",
  borderBottom: "1px solid $gray100",

  "&:last-child": {
    borderBottom: "none",
  },
})

const ItemImage = styled("img", {
  width: "64px",
  height: "64px",
  objectFit: "cover",
  borderRadius: "$sm",
})

const ItemInfo = styled("div", {
  flex: 1,
})

const ItemTitle = styled("h4", {
  fontSize: "$sm",
  fontWeight: "$medium",
  marginBottom: "$1",
})

const ItemPrice = styled("p", {
  fontSize: "$sm",
  color: "$gray600",
})

const ItemQuantity = styled("span", {
  fontSize: "$sm",
  color: "$gray600",
})

const TotalSection = styled("div", {
  borderTop: "2px solid $gray100",
  paddingTop: "$4",
  marginTop: "$4",
})

const TotalRow = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "$2",

  "&:last-child": {
    marginBottom: 0,
    marginTop: "$4",
    paddingTop: "$4",
    borderTop: "1px solid $gray100",

    "& span": {
      fontSize: "$lg",
      fontWeight: "$bold",
      color: "$gray900",
    },
  },
})

interface OrderSummaryProps {
  items: CartItem[]
  total: number
}

export function OrderSummary({ items, total }: OrderSummaryProps) {
  const subtotal = total
  const shipping = 0 // Free shipping
  const finalTotal = subtotal + shipping

  return (
    <SummaryContainer>
      <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>

      <ItemList>
        {items.map((item) => (
          <Item key={item.id}>
            <ItemImage src={item.image || "/placeholder.svg"} alt={item.title} />
            <ItemInfo>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemPrice>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.price)}
              </ItemPrice>
              <ItemQuantity>Quantidade: {item.quantity}</ItemQuantity>
            </ItemInfo>
          </Item>
        ))}
      </ItemList>

      <TotalSection>
        <TotalRow>
          <span>Subtotal</span>
          <span>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(subtotal)}
          </span>
        </TotalRow>
        <TotalRow>
          <span>Frete</span>
          <span>Grátis</span>
        </TotalRow>
        <TotalRow>
          <span>Total</span>
          <span>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(finalTotal)}
          </span>
        </TotalRow>
      </TotalSection>
    </SummaryContainer>
  )
}

