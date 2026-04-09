// /app/api/articles/route.js
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://mbsunuudpdvzozmjoxtt.supabase.co",
  "sb_publishable_PwBH-c3ouCmz20B8vjOPhA_GNhYgPpU"
)

// POST: n8n에서 기사 저장
export async function POST(request) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from("articles")
      .insert([{
        title: body.title,
        summary: body.summary,
        content: body.content,
        category: body.category,
        slug: body.slug,
        meta_description: body.meta_description,
        keywords: body.keywords,
        source: body.source,
        original_url: body.original_url,
        image_url: body.image_url,
        published_at: body.published_at
      }])
      .select()

    if (error) throw error

    return Response.json(
      { success: true, message: "기사가 저장되었습니다", data },
      { status: 201 }
    )
  } catch (error) {
    console.error("POST /api/articles error:", error)
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

// GET: 기사 목록 조회
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const limit = parseInt(searchParams.get("limit") || "20")
    const offset = parseInt(searchParams.get("offset") || "0")

    let query = supabase
      .from("articles")
      .select("*", { count: "exact" })
      .order("published_at", { ascending: false })

    if (category) {
      query = query.eq("category", category)
    }

    const { data, error, count } = await query
      .range(offset, offset + limit - 1)

    if (error) throw error

    return Response.json({
      success: true,
      data,
      pagination: {
        total: count,
        limit,
        offset,
        hasMore: (offset + limit) < count
      }
    })
  } catch (error) {
    console.error("GET /api/articles error:", error)
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}