"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Package, Search, AlertCircle } from "lucide-react"
import { correiosApi } from "@/services/correios-api"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useSearchParams } from "next/navigation"

export default function TrackingPage() {
  const searchParams = useSearchParams()
  const [trackingCode, setTrackingCode] = useState("")
  const [trackingInfo, setTrackingInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const codeFromUrl = searchParams.get("code")
    if (codeFromUrl) {
      setTrackingCode(codeFromUrl)
      handleTrack(codeFromUrl)
    }
  }, [searchParams])

  const handleTrack = async (code: string) => {
    if (!code) {
      setError("Por favor, informe o código de rastreio")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const info = await correiosApi.trackPackage(code)

      if (!info) {
        setError("Não foi possível encontrar informações para este código")
      } else {
        setTrackingInfo(info)
      }
    } catch (error) {
      setError("Erro ao rastrear encomenda. Verifique o código e tente novamente.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    handleTrack(trackingCode)
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Rastreamento de Pedidos</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Rastrear Encomenda</CardTitle>
          <CardDescription>Informe o código de rastreio fornecido pelos Correios</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
              placeholder="Ex: AA123456789BR"
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Buscando
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Rastrear
                </>
              )}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="mt-4 text-sm text-muted-foreground">
            <p>Exemplos de códigos para teste:</p>
            <ul className="list-disc pl-5 mt-1">
              <li>AA123456789BR</li>
              <li>JO123456789BR</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {trackingInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Resultado do Rastreamento
            </CardTitle>
            <CardDescription>Código: {trackingInfo.code}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {trackingInfo.events.map((event: any, index: number) => (
                <div key={index} className="relative pl-6 pb-6">
                  {index !== trackingInfo.events.length - 1 && (
                    <div className="absolute top-2 left-[9px] h-full w-[2px] bg-gray-200"></div>
                  )}
                  <div className="absolute top-2 left-0 h-5 w-5 rounded-full border-2 border-primary bg-white"></div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{event.status}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.date} às {event.time}
                      </p>
                    </div>
                    <p className="text-sm">{event.location}</p>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

