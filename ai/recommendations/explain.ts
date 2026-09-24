type OpportunityLike = { title: string; tags: string[]; location: string | null; isRemote: boolean };

export function explainRecommendation(opportunity: OpportunityLike, userSkills: string[]): string {
  const matches = userSkills.filter((s) =>
    `${opportunity.title} ${opportunity.tags.join(" ")}`.toLowerCase().includes(s.toLowerCase()),
  );

  const parts: string[] = [];
  if (matches.length) parts.push(`matches your skills (${matches.join(", ")})`);
  if (opportunity.isRemote) parts.push("offers remote work");
  else if (opportunity.location) parts.push(`based in ${opportunity.location}`);

  return parts.length ? `Recommended because it ${parts.join(" and ")}.` : "Recommended based on your activity.";
}