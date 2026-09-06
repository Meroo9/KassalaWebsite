import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("url");

    if (!imageUrl) {
      return NextResponse.redirect(new URL("/images/about-uni.png", request.url), 307);
    }

    // Only proxy images from trusted university domains
    const allowedHosts = ["kassalauni.edu.sd"];
    let parsedUrl;
    try {
      parsedUrl = new URL(imageUrl);
    } catch {
      return NextResponse.redirect(new URL("/images/about-uni.png", request.url), 307);
    }

    if (!allowedHosts.includes(parsedUrl.hostname)) {
      return NextResponse.redirect(new URL("/images/about-uni.png", request.url), 307);
    }

    const response = await fetch(imageUrl, {
      signal: AbortSignal.timeout(1500), // Fast 1.5s timeout to prevent UI freezes
      next: { revalidate: 604800 } // Cache for 7 days
    });

    if (!response.ok) {
      // Graceful fallback to authentic local university image
      return NextResponse.redirect(new URL("/images/about-uni.png", request.url), 307);
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=604800, s-maxage=604800, stale-while-revalidate=2592000",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    });
  } catch (error) {
    // Immediate graceful fallback on network timeout/failure
    return NextResponse.redirect(new URL("/images/about-uni.png", request.url), 307);
  }
}
