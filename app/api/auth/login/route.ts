import { authenticate } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    const user = await authenticate(email, password)

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "Credenciais inválidas" }), { status: 401 })
    }

    return NextResponse.json({ ok: true, user })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Erro interno do servidor" }), { status: 500 })
  }
}

