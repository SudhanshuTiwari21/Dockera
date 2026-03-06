import crypto from "crypto";
import jwt from "jsonwebtoken";
import { query } from "./db";

const VERIFICATION_EXPIRY_HOURS = 24;

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be set and at least 32 characters");
  }
  return secret;
}

function tokenHash(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export type VerificationPayload = {
  email: string;
  purpose: "verify-email";
  iat: number;
  exp: number;
};

export function createVerificationToken(email: string): string {
  return jwt.sign(
    { email: email.toLowerCase(), purpose: "verify-email" } as VerificationPayload,
    getSecret(),
    { expiresIn: `${VERIFICATION_EXPIRY_HOURS}h` }
  );
}

/** Store token hash so it can be consumed exactly once. Call after creating the token and before sending the email. */
export async function storeVerificationToken(token: string, email: string): Promise<void> {
  const hash = tokenHash(token);
  const expiresAt = new Date(Date.now() + VERIFICATION_EXPIRY_HOURS * 60 * 60 * 1000);
  await query(
    `INSERT INTO verification_link_tokens (token_hash, email, purpose, expires_at)
     VALUES ($1, $2, 'verify-email', $3)`,
    [hash, email.toLowerCase(), expiresAt]
  );
}

export type ConsumeResult =
  | { ok: true; payload: VerificationPayload }
  | { ok: false; reason: "invalid" | "expired" | "already-used" };

/**
 * Verify JWT and consume the token (one-time use). Returns payload if valid and not yet used; marks it used.
 */
export async function consumeVerificationToken(token: string): Promise<ConsumeResult> {
  let payload: VerificationPayload;
  try {
    const decoded = jwt.verify(token, getSecret()) as VerificationPayload;
    if (decoded.purpose !== "verify-email" || !decoded.email) {
      return { ok: false, reason: "invalid" };
    }
    payload = decoded;
  } catch {
    return { ok: false, reason: "invalid" };
  }

  const hash = tokenHash(token);
  const rows = await query<{ id: number; used_at: string | null; expires_at: string }[]>(
    `SELECT id, used_at, expires_at FROM verification_link_tokens
     WHERE token_hash = $1 AND email = $2 AND purpose = 'verify-email'`,
    [hash, payload.email]
  );
  if (rows.length === 0) return { ok: false, reason: "invalid" };
  const row = rows[0];
  if (row.used_at != null) return { ok: false, reason: "already-used" };
  if (new Date(row.expires_at) <= new Date()) return { ok: false, reason: "expired" };

  await query(
    `UPDATE verification_link_tokens SET used_at = NOW() WHERE id = $1`,
    [row.id]
  );
  return { ok: true, payload };
}

/** @deprecated Use consumeVerificationToken for one-time links. */
export function verifyVerificationToken(token: string): VerificationPayload | null {
  try {
    const decoded = jwt.verify(token, getSecret()) as VerificationPayload;
    if (decoded.purpose === "verify-email" && decoded.email) {
      return decoded;
    }
    return null;
  } catch {
    return null;
  }
}
