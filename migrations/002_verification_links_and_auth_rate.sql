-- One-time verification links: store token hash and mark used on first verify
CREATE TABLE IF NOT EXISTS verification_link_tokens (
  id SERIAL PRIMARY KEY,
  token_hash VARCHAR(64) NOT NULL,
  email VARCHAR(255) NOT NULL,
  purpose VARCHAR(50) NOT NULL DEFAULT 'verify-email',
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_verification_link_tokens_hash ON verification_link_tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_verification_link_tokens_email_expires ON verification_link_tokens(email, expires_at);

-- Per-IP rate limiting for auth routes
CREATE TABLE IF NOT EXISTS auth_ip_attempts (
  id SERIAL PRIMARY KEY,
  ip_hash VARCHAR(64) NOT NULL,
  endpoint VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_auth_ip_attempts_ip_created ON auth_ip_attempts(ip_hash, created_at);
