const STORAGE_PREFIX = "docera_usage_";
const ANON_KEY = "anon";

function getStorageKey(toolId: string, userKey: string | null): string {
  return `${STORAGE_PREFIX}${toolId}_${userKey ?? ANON_KEY}`;
}

function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

export type DailyUsageState = {
  allowed: boolean;
  count: number;
  limit: number;
};

/**
 * Reads daily usage from localStorage, resets count if the date has changed,
 * and optionally records a new use (increment).
 * Use increment: true only after a successful tool use.
 * Key usage by userId: anonymous users use "anon", logged-in users use their userId.
 * When a user signs in, they get fresh limits (separate key).
 * Reusable across tools—pass a unique toolId, the daily limit, and optional userId.
 */
export function checkAndUpdateDailyUsage(
  toolId: string,
  limit: number,
  increment = false,
  userId: string | null = null
): DailyUsageState {
  if (typeof window === "undefined") {
    return { allowed: true, count: 0, limit };
  }

  const key = getStorageKey(toolId, userId);
  const today = getTodayDateString();

  let data: { count: number; date: string };
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? (JSON.parse(raw) as { count?: number; date?: string }) : null;
    if (!parsed || parsed.date !== today) {
      data = { count: 0, date: today };
    } else {
      data = { count: Math.max(0, Number(parsed.count) || 0), date: today };
    }
  } catch {
    data = { count: 0, date: today };
  }

  if (increment) {
    data.count += 1;
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // quota or disabled; continue with in-memory state
    }
  }

  const allowed = data.count < limit;
  return { allowed, count: data.count, limit };
}
