import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, isValidLocale } from "./i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

// Paths that should NOT be prefixed with locale
const EXCLUDED_PATHS = ["/api", "/admin", "/my", "/_next", "/images", "/videos", "/uploads", "/favicon"];

function isExcluded(pathname: string) {
  return EXCLUDED_PATHS.some((p) => pathname.startsWith(p)) || PUBLIC_FILE.test(pathname);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip excluded paths
  if (isExcluded(pathname)) return;

  // Check if pathname already has a valid locale prefix
  const segments = pathname.split("/");
  const firstSegment = segments[1]; // e.g. "ko" or "en"

  if (isValidLocale(firstSegment)) {
    // Already has locale prefix — continue
    return;
  }

  // No locale prefix → detect preferred locale and redirect
  const acceptLang = request.headers.get("accept-language") || "";
  const preferredLocale = acceptLang.includes("ko") ? "ko" : acceptLang.includes("en") ? "en" : defaultLocale;

  // Redirect to locale-prefixed URL
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|admin|my|images|videos|uploads|favicon|.*\\..*).*)"],
};
