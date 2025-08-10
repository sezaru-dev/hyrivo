import { env } from "@/utils/env";

export async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    const refreshed = await res.json();

    if (!res.ok) throw refreshed;

    return {
      ...token,
      accessToken: refreshed.accessToken,
      accessTokenExpires: Date.now() + 15 * 60 * 1000, // 15 min
      refreshToken: refreshed.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Refresh token failed:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
