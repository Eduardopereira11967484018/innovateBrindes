"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center gap-4">
      <AlertCircle className="h-10 w-10 text-destructive" />
      <h2 className="text-2xl font-bold">Erro ao carregar perfil</h2>
      <p className="text-muted-foreground">Ocorreu um erro ao carregar as informações do seu perfil.</p>
      <Button onClick={() => reset()}>Tentar novamente</Button>
    </div>
  )
}

