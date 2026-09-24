type Scored<T> = { opportunity: T; score: number; reason?: string };

export function rankRecommendations<T>(items: Scored<T>[], limit = 10): Scored<T>[] {
  return [...items].sort((a, b) => b.score - a.score).slice(0, limit);
}