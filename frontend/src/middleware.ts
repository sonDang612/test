import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const clientIP =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    request.nextUrl.searchParams.get("ip") ||
    "";

  const settingsRegex = /^\/settings\/([^\/]+)$/;
  const matchSettings = pathname.match(settingsRegex);
  let url;

  let body;
  if (matchSettings) {
    url = `${process.env.NEXT_PUBLIC_API_URL}/auth/validate-settings-master-code`;
    body = { code: matchSettings[1] };
  } else {
    url = `${process.env.NEXT_PUBLIC_API_URL}/healcheck/ping`;
    body = {};
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": clientIP,
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (json?.code === 0) {
      return NextResponse.next();
    }
  } catch (error) {
    console.error("Middleware fetch error:", error);
  }

  return NextResponse.redirect(new URL("/404", request.url));
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|robots.txt|404).*)"],
};
