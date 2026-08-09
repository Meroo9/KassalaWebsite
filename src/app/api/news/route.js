import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const perPage = searchParams.get("per_page") || "6";

    // Fetch from WordPress API on server-side (bypasses browser CORS)
    const res = await fetch(`https://kassalauni.edu.sd/nw/wp-json/wp/v2/posts?per_page=${perPage}`, {
      signal: AbortSignal.timeout(4000), // 4 seconds timeout
      next: { revalidate: 120 } // Cache for 120 seconds
    });

    if (!res.ok) {
      throw new Error(`WordPress API returned status ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("WordPress API Fetch Error on Server:", error.message);
    // Return empty array to client to let client fallback safely without console CORS errors
    return NextResponse.json([], { status: 200 });
  }
}
