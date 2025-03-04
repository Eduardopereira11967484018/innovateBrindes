import { NextResponse } from "next/server"
import { api } from "@/services/api"

export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || 12

    const products = await api.searchProducts(query, page, limit)

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error searching products:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

