import crypto from "crypto";
import { query } from "./db";

const MAX_AUTH_REQUESTS_PER_IP = 50;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : null;
  return ip || request.headers.get("x-real-ip") || "unknown";
}

function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex");
}

/**
 * Returns true if the IP is under the auth rate limit, false if over. Call at the start of auth route handlers.
 */
export async function checkAuthRateLimit(request: Request, endpoint: string): Promise<boolean> {
  const ip = getClientIp(request);
  const ipHash = hashIp(ip);
  const rows = await query<{ count: string }[]>(
    `SELECT COUNT(*) as count FROM auth_ip_attempts
     WHERE ip_hash = $1 AND endpoint = $2 AND created_at > NOW() - INTERVAL '1 hour'`,
    [ipHash, endpoint]
  );
  const count = Number(rows?.[0]?.count ?? 0);
  return count < MAX_AUTH_REQUESTS_PER_IP;
}

/**
 * Record an auth attempt for rate limiting. Call after successful or failed auth attempt.
 */
export async function recordAuthAttempt(request: Request, endpoint: string): Promise<void> {
  const ip = getClientIp(request);
  const ipHash = hashIp(ip);
  await query(
    `INSERT INTO auth_ip_attempts (ip_hash, endpoint) VALUES ($1, $2)`,
    [ipHash, endpoint]
  );
}
