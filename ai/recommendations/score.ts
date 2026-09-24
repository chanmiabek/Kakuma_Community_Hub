type OpportunityLike = {
    id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    location: string | null;
    isRemote: boolean;
  };
  
  export type ScoreInput = {
    opportunity: OpportunityLike;
    userSkills: string[];
    userLocation: string | null;
    userExperience: number;
  };
  
  /**
   * Simple heuristic scoring in [0, 1]. Can be swapped for a model-based scorer.
   */
  export function scoreOpportunity({ opportunity, userSkills, userLocation, userExperience }: ScoreInput): number {
    let score = 0;
  
    const text = `${opportunity.title} ${opportunity.description} ${opportunity.tags.join(" ")}`.toLowerCase();
    const skillHits = userSkills.filter((s) => text.includes(s.toLowerCase())).length;
    score += Math.min(skillHits / Math.max(1, userSkills.length), 1) * 0.5;
  
    if (userLocation && opportunity.location && opportunity.location.toLowerCase().includes(userLocation.toLowerCase())) {
      score += 0.2;
    } else if (opportunity.isRemote) {
      score += 0.15;
    }
  
    if (userExperience > 2) score += 0.1;
    if (opportunity.category && text.length > 0) score += 0.1;
  
    return Math.max(0, Math.min(1, score));
  }