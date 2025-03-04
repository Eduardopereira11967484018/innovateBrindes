"use client"

import type React from "react"

import { createContext, useContext, useReducer } from "react"
import type { CartItem } from "@/lib/types"

interface Address {
  name: string
  email: string
  phone: string
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

interface Payment {
  method: "credit_card" | "pix"
  cardNumber?: string
  cardHolder?: string
  expiryDate?: string
  cvv?: string
}

interface CheckoutState {
  items: CartItem[]
  total: number
  address?: Address
  payment?: Payment
}

type CheckoutAction =
  | { type: "SET_ITEMS"; payload: { items: CartItem[]; total: number } }
  | { type: "SET_ADDRESS"; payload: Address }
  | { type: "SET_PAYMENT"; payload: Payment }

const CheckoutContext = createContext<{
  state: CheckoutState
  dispatch: React.Dispatch<CheckoutAction>
} | null>(null)

const initialState: CheckoutState = {
  items: [],
  total: 0,
}

function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
      }
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.payload,
      }
    case "SET_PAYMENT":
      return {
        ...state,
        payment: action.payload,
      }
    default:
      return state
  }
}

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState)

  return <CheckoutContext.Provider value={{ state, dispatch }}>{children}</CheckoutContext.Provider>
}

export function useCheckout() {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider")
  }
  return context
}

