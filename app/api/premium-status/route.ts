import { NextResponse } from "next/server";
import { getPremiumCookie, verifyPremiumToken, getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    const userId = session?.sub ?? null;
    if (session?.tier === "premium") {
      return NextResponse.json({ premium: true, userId });
    }
    const token = await getPremiumCookie();
    if (!token) {
      return NextResponse.json({ premium: false, userId });
    }
    const payload = verifyPremiumToken(token);
    return NextResponse.json({ premium: payload !== null, userId });
  } catch {
    return NextResponse.json({ premium: false, userId: null });
  }
}
