// /app/api/articles/[slug]/route.js
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://mbsunuudpdvzozmjoxtt.supabase.co",
  "sb_publishable_PwBH-c3ouCmz20B8vjOPhA_GNhYgPpU"
)

// GET: 특정 기사 상세 조회
export async function GET(request, { params }) {
  try {
    const { slug } = params

    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single()

    if (error && error.code === "PGRST116") {
      return Response.json(
        { success: false, error: "기사를 찾을 수 없습니다" },
        { status: 404 }
      )
    }

    if (error) throw error

    // 조회수 증가 (선택사항)
    await supabase
      .from("articles")
      .update({ views: (data.views || 0) + 1 })
      .eq("slug", slug)

    return Response.json({
      success: true,
      data
    })
  } catch (error) {
    console.error("GET /api/articles/[slug] error:", error)
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

// 관련 기사 조회
export async function GET_RELATED(request, { params }) {
  try {
    const { slug } = params

    // 현재 기사의 카테고리 가져오기
    const { data: currentArticle } = await supabase
      .from("articles")
      .select("category")
      .eq("slug", slug)
      .single()

    if (!currentArticle) {
      return Response.json(
        { success: false, error: "기사를 찾을 수 없습니다" },
        { status: 404 }
      )
    }

    // 같은 카테고리의 다른 기사 조회
    const { data: relatedArticles, error } = await supabase
      .from("articles")
      .select("id, title, summary, slug, published_at, image_url")
      .eq("category", currentArticle.category)
      .neq("slug", slug)
      .order("published_at", { ascending: false })
      .limit(3)

    if (error) throw error

    return Response.json({
      success: true,
      data: relatedArticles
    })
  } catch (error) {
    console.error("GET_RELATED error:", error)
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}