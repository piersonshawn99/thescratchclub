export type PlanId = "player" | "performance" | "pursuit";
export type Term = "flex" | "3" | "6" | "12";
export const TERMS: { id: Term; label: string }[] = [
  { id: "3", label: "3 months" }, { id: "6", label: "6 months" },
  { id: "12", label: "12 months" }, { id: "flex", label: "Flexible monthly" },
];
export const PLANS: { id: PlanId; name: string; tagline: string; description: string; commitment: number; flexible: number; popular?: boolean }[] = [
  { id: "player", name: "Player", tagline: "Play More. Stay Sharp.", description: "For golfers who want regular practice and occasional rounds.", commitment: 129, flexible: 139 },
  { id: "performance", name: "Performance", tagline: "Practice With Purpose.", description: "For golfers committed to measurable improvement.", commitment: 239, flexible: 249, popular: true },
  { id: "pursuit", name: "Pursuit", tagline: "For Those Who Live the Game.", description: "For passionate golfers who want to make golf a regular part of life.", commitment: 369, flexible: 379 },
];
export function membershipDestination(plan: PlanId, term: Term): string {
  // Do not assume Trackman has a per-plan deep link. Until verified, use inquiry.
  const params = new URLSearchParams({ interest: "membership", plan, term });
  return `/contact?${params.toString()}`;
}
