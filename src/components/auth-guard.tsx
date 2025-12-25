"use client";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  // No authentication required - just render children
  return <>{children}</>;
}

