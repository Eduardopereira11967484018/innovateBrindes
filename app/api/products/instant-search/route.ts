import { NextResponse } from "next/server"
import { api } from "@/services/api"

export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""

    if (!query || query.length < 2) {
      return NextResponse.json({ products: [] })
    }

    // Limit to 5 products for instant search
    const { data: products } = await api.searchProducts(query, 1, 5)

    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error in instant search:", error)
    return NextResponse.json({ products: [], error: "Internal Server Error" }, { status: 500 })
  }
}

