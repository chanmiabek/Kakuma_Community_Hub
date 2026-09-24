import type { Role } from "@prisma/client";

export const PERMISSIONS = {
  MANAGE_USERS: ["ADMIN"] as Role[],
  MANAGE_ORGANIZATIONS: ["ADMIN"] as Role[],
  MANAGE_BUSINESSES: ["ADMIN"] as Role[],
  MANAGE_OPPORTUNITIES: ["ADMIN", "ORGANIZATION"] as Role[],
  MANAGE_SERVICES: ["ADMIN", "BUSINESS", "ORGANIZATION"] as Role[],
  VIEW_APPLICATIONS: ["ADMIN", "ORGANIZATION"] as Role[],
  VERIFY_ENTITIES: ["ADMIN"] as Role[],
  VIEW_ANALYTICS: ["ADMIN"] as Role[],
} as const;

export function hasPermission(role: Role | undefined, perm: keyof typeof PERMISSIONS): boolean {
  if (!role) return false;
  return (PERMISSIONS[perm] as Role[]).includes(role);
}