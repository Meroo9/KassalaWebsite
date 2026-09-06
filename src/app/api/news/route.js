import { NextResponse } from "next/server";
import fallbackData from "@/data/fallbackData.json";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const perPage = searchParams.get("per_page") || "6";

    // Fast fetch from WordPress API with strict 1.5s timeout
    const res = await fetch(`https://kassalauni.edu.sd/nw/wp-json/wp/v2/posts?per_page=${perPage}`, {
      signal: AbortSignal.timeout(1500),
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return NextResponse.json(data, {
          headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
          }
        });
      }
    }
  } catch (error) {
    // External university server offline or timed out - fall through to curated local news
    console.warn("External WordPress news unavailable, serving high-speed curated news.");
  }

  // Seamless fallback to curated high-speed news
  const formattedFallback = fallbackData.news.map((item) => ({
    id: item.id,
    date: `${item.date}T00:00:00`,
    title: { rendered: item.arTitle },
    excerpt: { rendered: item.arExcerpt },
    content: { rendered: item.arExcerpt },
    jetpack_featured_media_url: item.image,
    isCurated: true
  }));

  return NextResponse.json(formattedFallback, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
