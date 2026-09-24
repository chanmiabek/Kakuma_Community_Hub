import type { Role } from "@prisma/client";

export type Resource = "user" | "organization" | "business" | "opportunity" | "application" | "report";

const matrix: Record<Role, Resource[]> = {
  USER: ["opportunity", "application", "report", "user"],
  ORGANIZATION: ["organization", "opportunity", "application", "report", "user"],
  BUSINESS: ["business", "report", "user"],
  ADMIN: ["user", "organization", "business", "opportunity", "application", "report"],
};

export function can(role: Role | undefined, resource: Resource): boolean {
  if (!role) return false;
  return matrix[role]?.includes(resource) ?? false;
}

export function isAdmin(role?: Role): boolean {
  return role === "ADMIN";
}