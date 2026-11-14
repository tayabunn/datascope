import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const baseUrl = req.nextUrl.origin || "http://localhost:3000";

  if (error || !code) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error || "Authorization declined")}`, baseUrl)
    );
  }

  try {
    const clientId =
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
      process.env.GOOGLE_CLIENT_ID ||
      "";
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
    const redirectUri = `${baseUrl}/api/auth/callback/google`;

    // 1. Exchange code for Google Access Token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const errBody = await tokenRes.text();
      console.error("Google Token Exchange Failed:", errBody);
      return NextResponse.redirect(
        new URL(`/login?error=token_exchange_failed`, baseUrl)
      );
    }

    const tokens = await tokenRes.json();

    // 2. Fetch User Profile from Google Identity
    const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    if (!userRes.ok) {
      return NextResponse.redirect(
        new URL(`/login?error=user_fetch_failed`, baseUrl)
      );
    }

    const profile = await userRes.json();

    // 3. Redirect back to login/app with success payload to hydrate Redux session
    const successUrl = new URL("/login", baseUrl);
    successUrl.searchParams.set("oauth_success", "true");
    successUrl.searchParams.set("email", profile.email || "");
    successUrl.searchParams.set("name", profile.name || "");
    successUrl.searchParams.set("picture", profile.picture || "");

    return NextResponse.redirect(successUrl);
  } catch (err) {
    console.error("OAuth Callback Error:", err);
    return NextResponse.redirect(
      new URL(`/login?error=oauth_internal_error`, baseUrl)
    );
  }
}

