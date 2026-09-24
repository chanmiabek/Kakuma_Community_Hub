export const recommendationPrompt = `Given a user profile and a list of opportunities, rank the top matches.

Return a JSON array of objects: { "id": string, "score": number (0-1), "reason": string }.
Consider skills, location, experience, and category fit. Prefer opportunities within Kakuma unless user prefers remote.`;