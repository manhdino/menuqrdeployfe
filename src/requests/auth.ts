import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
  RefreshTokenBodyType,
  RefreshTokenResType,
} from "@/validations/auth.schema";

const authApiRequest = {
  refreshTokenRequest: null as Promise<{
    status: number;
    payload: RefreshTokenResType;
  }> | null,
  login: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),
  logout: (
    body: LogoutBodyType & {
      accessToken: string;
    }
  ) =>
    http.post(
      "/auth/logout",
      {
        refreshToken: body.refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
      }
    ),

  sRefreshToken: (body: RefreshTokenBodyType) =>
    http.post<RefreshTokenResType>("/auth/refresh-token", body),
  async refreshToken() {
    if (this.refreshTokenRequest) {
      return this.refreshTokenRequest;
    }
    this.refreshTokenRequest = http.post<RefreshTokenResType>(
      "/api/auth/refresh-token",
      null
    );
    const result = await this.refreshTokenRequest;
    this.refreshTokenRequest = null;
    return result;
  },
  setTokenToCookie: (body: { accessToken: string; refreshToken: string }) =>
    http.post("/api/auth/token", body),
};

export default authApiRequest;
