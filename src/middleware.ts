import { Role } from "@/constants/type";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { TokenPayload } from "@/types/jwt.types";

const decodeToken = (token: string) => {
  return jwt.decode(token) as TokenPayload;
};

const managePaths = ["/manage"];
const guestPaths = ["/guest"];
const onlyOwnerPaths = ["/manage/accounts"];
const privatePaths = [...managePaths, ...guestPaths];
const unAuthPaths = ["/login"];
const loginPaths = ["/login"];
const publicPaths = ["/menu"];

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let response = NextResponse.next();

  if (publicPaths.some((path) => pathname === path)) {
    return response;
  }

  // Lâu ngày ko vào hết hạn Refresh Token --> Login Lại
  if (privatePaths.some((path) => pathname.startsWith(path)) && !refreshToken) {
    const url = new URL(`/login`, request.url);
    url.searchParams.set("clearTokens", "true");
    return NextResponse.redirect(url);
  }

  if (refreshToken) {
    // Lâu ngày không vào nhưng Refresh Token còn hạn --> gọi API RefreshToken
    if (
      privatePaths.some((path) => pathname.startsWith(path)) &&
      !accessToken
    ) {
      const url = new URL(`/refresh-token`, request.url);
      url.searchParams.set("refreshToken", refreshToken);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    // Đã có Refresh Token rồi --> Đăng nhập rồi --> Ko cho quay lại login nữa
    if (unAuthPaths.some((path) => pathname.startsWith(path))) {
      if (
        loginPaths.some((path) => pathname.startsWith(path)) &&
        searchParams.get("accessToken")
      ) {
        console.log("Không cho quay lại login");
        return response;
      }
      return NextResponse.redirect(new URL(`/`, request.url));
    }

    //Kiểm tra vai trò để giới hạn quyền truy cập
    const role = decodeToken(refreshToken).role;
    const isGuestGoToManagePath =
      role === Role.Guest &&
      managePaths.some((path) => pathname.startsWith(path));
    const isNotGuestGoToGuestPath =
      role !== Role.Guest &&
      guestPaths.some((path) => pathname.startsWith(path));
    const isNotOwnerGoToOwnerPath =
      role !== Role.Owner &&
      onlyOwnerPaths.some((path) => pathname.startsWith(path));

    if (
      isGuestGoToManagePath ||
      isNotGuestGoToGuestPath ||
      isNotOwnerGoToOwnerPath
    ) {
      return NextResponse.redirect(new URL(`/`, request.url));
    }

    return response;
  }

  return response;
}

export const config = {
  matcher: ["/", "/:path*"],
};
