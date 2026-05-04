// /app/api/articles/[slug]/route.js
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// GET: 특정 기사 상세 조회 (published만)
export async function GET(request, { params }) {
  try {
    const { slug } = params
    const { searchParams } = new URL(request.url)
    const showAll = searchParams.get("admin") === process.env.ADMIN_SECRET

    let query = supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)

    if (!showAll) {
      query = query.eq("status", "published")
    }

    const { data, error } = await query.single()

    if (error && error.code === "PGRST116") {
      return Response.json(
        { success: false, error: "기사를 찾을 수 없습니다" },
        { status: 404 }
      )
    }
    if (error) throw error

    // 조회수 증가
    await supabase
      .from("articles")
      .update({ views: (data.views || 0) + 1 })
      .eq("slug", slug)

    return Response.json({ success: true, data })
  } catch (error) {
    console.error("GET /api/articles/[slug] error:", error)
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

// PATCH: status 변경 (draft → published / published → draft)
export async function PATCH(request, { params }) {
  try {
    const { slug } = params
    const { searchParams } = new URL(request.url)
    const adminKey = searchParams.get("admin")

    if (adminKey !== process.env.ADMIN_SECRET) {
      return Response.json({ success: false, error: "권한 없음" }, { status: 401 })
    }

    const body = await request.json()
    const newStatus = body.status // 'published' | 'draft'

    if (!["published", "draft"].includes(newStatus)) {
      return Response.json({ success: false, error: "status는 published 또는 draft" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("articles")
      .update({ status: newStatus })
      .eq("slug", slug)
      .select()

    if (error) throw error

    return Response.json({
      success: true,
      message: newStatus === "published" ? "기사가 공개되었습니다" : "초안으로 변경되었습니다",
      data
    })
  } catch (error) {
    console.error("PATCH /api/articles/[slug] error:", error)
    return Response.json({ success: false, error: error.message }, { status: 400 })
  }
}
