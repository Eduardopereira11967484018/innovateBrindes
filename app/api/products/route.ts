import { NextResponse } from "next/server"
import { api } from "@/services/api"

export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get("page") || "1")
    const limit = Number(searchParams.get("limit") || "12")
    const query = searchParams.get("q")

    const products = query ? await api.searchProducts(query, page, limit) : await api.getAllProducts(page, limit)

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

