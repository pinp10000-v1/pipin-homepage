// /app/api/articles/route.js
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// POST: n8n에서 기사 저장 — 항상 draft로 저장 (보스님 승인 후 published)
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
        published_at: body.published_at,
        status: "draft",          // 항상 draft로 저장
        significance: body.significance ?? "medium",
      }])
      .select()

    if (error) throw error

    return Response.json(
      { success: true, message: "초안으로 저장되었습니다 (승인 후 공개)", data },
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

// GET: published 기사만 반환 (랜딩페이지·블로그 노출용)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const limit    = parseInt(searchParams.get("limit") || "20")
    const offset   = parseInt(searchParams.get("offset") || "0")
    // 관리자 키 있으면 draft 포함 (미래 관리 페이지용)
    const showAll  = searchParams.get("admin") === process.env.ADMIN_SECRET

    let query = supabase
      .from("articles")
      .select("*", { count: "exact" })
      .order("published_at", { ascending: false })

    if (!showAll) {
      query = query.eq("status", "published")   // 공개 기사만
    }
    if (category) {
      query = query.eq("category", category)
    }

    const { data, error, count } = await query.range(offset, offset + limit - 1)

    if (error) throw error

    return Response.json({
      success: true,
      data,
      pagination: { total: count, limit, offset, hasMore: (offset + limit) < count }
    })
  } catch (error) {
    console.error("GET /api/articles error:", error)
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}
