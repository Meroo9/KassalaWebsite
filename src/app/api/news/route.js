import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch from WordPress API on server-side (bypasses browser CORS)
    const res = await fetch("https://kassalauni.edu.sd/nw/wp-json/wp/v2/posts?per_page=3", {
      signal: AbortSignal.timeout(5000), // 5 seconds timeout
      next: { revalidate: 60 } // Cache for 60 seconds
    });

    if (!res.ok) {
      throw new Error(`WordPress API returned status ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("WordPress API Fetch Error on Server:", error.message);
    // Return empty array to client to let client fallback safely without console errors
    return NextResponse.json([], { status: 200 });
  }
}
