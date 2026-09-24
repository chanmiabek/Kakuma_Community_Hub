import { describe, it, expect } from "vitest";
import { slugify, truncate, initials } from "@/lib/utils";

describe("utils", () => {
  it("slugifies strings", () => {
    expect(slugify("Junior Web Developer!")).toBe("junior-web-developer");
  });
  it("truncates strings", () => {
    expect(truncate("hello world", 5)).toBe("hello…");
  });
  it("extracts initials", () => {
    expect(initials("Amina Yusuf")).toBe("AY");
  });
});