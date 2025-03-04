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
    <div className="container flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="text-center">
        <AlertCircle className="h-10 w-10 text-destructive mx-auto" />
        <h2 className="mt-4 text-lg font-medium">Erro ao carregar pedidos</h2>
        <p className="mt-2 text-sm text-muted-foreground">Ocorreu um erro ao carregar seus pedidos.</p>
        <Button onClick={() => reset()} className="mt-4">
          Tentar novamente
        </Button>
      </div>
    </div>
  )
}

