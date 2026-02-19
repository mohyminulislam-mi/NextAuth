import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
const privateRoutes = ["/private", "/dashboard"];
const adminRoutes = ["/dashboard"];

// This function can be marked `async` if using `await` inside
export async function proxy(req) {
  const token = await getToken({ req });
  const reqPath = req.nextUrl.pathname;
  const isAuthenticated = Boolean(token);
  const isUser = token?.role === "user";
  const isPrivate = privateRoutes.some((route) => reqPath.startsWith(route));
  // admin routes
  const isAdmin = token?.role === "admin";
  const isAdminRoutes = adminRoutes.some((route) => reqPath.startsWith(route));

  // logic for privates routes only
  if (!isAuthenticated && isPrivate) {
    const loginUrl = new URL("/api/auth/signin", req.url);
    loginUrl.searchParams.set("callbackUrl", reqPath);
    return NextResponse.redirect(loginUrl);
  }
  // logic for dashboard routes
  if (isAuthenticated && !isAdmin && isAdminRoutes) {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/private/:path*", "/dashboard/:path*"],
};
