import { LoginForm } from "@/components/auth/login-form"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export const metadata: Metadata = {
  title: "Login | Innovation Brindes",
  description: "Faça login para acessar sua conta",
}

export default function Login() {
  // Check if user is already logged in
  const isAuthenticated = cookies().has("user")
  if (isAuthenticated) {
    redirect("/")
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Bem-vindo de volta</h1>
          <p className="text-sm text-muted-foreground">Faça login para começar suas compras</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

