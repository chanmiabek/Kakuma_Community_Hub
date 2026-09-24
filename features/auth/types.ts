import type { Role } from "@prisma/client";

export type AuthUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: Role;
};

export type SessionUser = AuthUser;