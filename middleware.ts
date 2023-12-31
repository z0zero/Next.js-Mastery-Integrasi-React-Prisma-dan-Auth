export { default } from "next-auth/middleware";

export const config = {
  // *: zero or more path segments
  // +: one or more path segments
  // ?: zero or one path segments
  matcher: ['/dashboard/:path*']
}