"use client"

import { useAuth } from "@/contexts/auth-context"
import { mockOrders } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Package2, MapPin, CreditCard, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const statusMap = {
  pending: { label: "Pendente", color: "bg-yellow-500" },
  processing: { label: "Em processamento", color: "bg-blue-500" },
  shipped: { label: "Enviado", color: "bg-purple-500" },
  delivered: { label: "Entregue", color: "bg-green-500" },
  cancelled: { label: "Cancelado", color: "bg-red-500" },
}

const paymentStatusMap = {
  pending: { label: "Pendente", color: "bg-yellow-500" },
  paid: { label: "Pago", color: "bg-green-500" },
  failed: { label: "Falhou", color: "bg-red-500" },
}

export default function OrdersPage() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="container py-10">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/profile">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Meus Pedidos</h1>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="deliveries">Entregas</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          {mockOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">Pedido #{order.id}</CardTitle>
                  <CardDescription>
                    {format(new Date(order.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </CardDescription>
                </div>
                <Badge className={statusMap[order.status].color}>{statusMap[order.status].label}</Badge>
              </CardHeader>
              <CardContent className="grid gap-6">
                <ScrollArea className="h-[200px]">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="h-20 w-20 rounded-md overflow-hidden bg-muted">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
                          <p className="text-sm font-medium">
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex flex-col gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Package2 className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Status do pedido:</span>
                    <Badge variant="outline">{statusMap[order.status].label}</Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Endereço de entrega:</span>
                    <span className="text-muted-foreground">
                      {order.deliveryAddress.street}, {order.deliveryAddress.number}
                      {order.deliveryAddress.complement && ` - ${order.deliveryAddress.complement}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Pagamento:</span>
                    <Badge variant="outline">
                      {order.paymentMethod === "credit_card" ? "Cartão de Crédito" : "PIX"}
                    </Badge>
                    <Badge className={paymentStatusMap[order.paymentStatus].color}>
                      {paymentStatusMap[order.paymentStatus].label}
                    </Badge>
                  </div>

                  <div className="flex justify-between pt-4 border-t">
                    <span className="font-medium">Total do pedido:</span>
                    <span className="font-bold">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(order.total)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="deliveries" className="space-y-6">
          {mockOrders
            .filter((order) => order.trackingCode)
            .map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <CardTitle className="text-base">Entrega do Pedido #{order.id}</CardTitle>
                  <CardDescription>Código de rastreio: {order.trackingCode}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Badge className={statusMap[order.status].color}>{statusMap[order.status].label}</Badge>
                      <span className="text-sm text-muted-foreground">
                        Última atualização:{" "}
                        {format(new Date(order.updatedAt), "dd/MM/yyyy 'às' HH:mm", {
                          locale: ptBR,
                        })}
                      </span>
                    </div>

                    <div className="text-sm space-y-2">
                      <p className="font-medium">Endereço de entrega:</p>
                      <p className="text-muted-foreground">
                        {order.deliveryAddress.street}, {order.deliveryAddress.number}
                        {order.deliveryAddress.complement && ` - ${order.deliveryAddress.complement}`}
                        <br />
                        {order.deliveryAddress.neighborhood}
                        <br />
                        {order.deliveryAddress.city} - {order.deliveryAddress.state}
                        <br />
                        CEP: {order.deliveryAddress.zipCode}
                      </p>
                    </div>

                    <Button variant="outline" className="w-full" asChild>
                      <a
                        href={`https://rastreamento.correios.com.br/app/index.php?codigo=${order.trackingCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Rastrear no site dos Correios
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

