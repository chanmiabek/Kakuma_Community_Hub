import type { Role } from "@prisma/client";

export type UserListItem = {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  image: string | null;
};