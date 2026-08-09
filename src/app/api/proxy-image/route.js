import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("url");

    if (!imageUrl) {
      return new NextResponse("Missing url parameter", { status: 400 });
    }

    // Only proxy images from trusted domains
    const allowedHosts = ["kassalauni.edu.sd"];
    const parsedUrl = new URL(imageUrl);

    if (!allowedHosts.includes(parsedUrl.hostname)) {
      return new NextResponse("Domain not allowed", { status: 403 });
    }

    const response = await fetch(imageUrl, {
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 86400 } // Cache image for 24 hours
    });

    if (!response.ok) {
      return new NextResponse("Image fetch failed", { status: response.status });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    });
  } catch (error) {
    console.error("Proxy image error:", error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
