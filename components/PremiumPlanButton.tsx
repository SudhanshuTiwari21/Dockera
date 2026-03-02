"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PremiumPlanButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function PremiumPlanButton({ href, children, className }: PremiumPlanButtonProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isChecking) return;
    setIsChecking(true);
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data = await res.json().catch(() => ({}));
      if (data?.user) {
        router.push(href);
      } else {
        router.push("/login?redirect=" + encodeURIComponent(href));
      }
    } catch {
      router.push("/login?redirect=" + encodeURIComponent(href));
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isChecking}
      className={className}
    >
      {isChecking ? "Checking…" : children}
    </button>
  );
}
