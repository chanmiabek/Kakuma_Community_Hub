import type { Role, SkillLevel } from "@prisma/client";

export type PublicUser = {
  id: string;
  name: string | null;
  image: string | null;
  role: Role;
  location: string | null;
};

export type UserWithSkills = PublicUser & {
  skills: { 
    id: string; 
    name: string; 
    level: SkillLevel; 
    years: number 
  }[];
};