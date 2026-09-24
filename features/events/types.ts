export type EventSummary = {
    id: string;
    title: string;
    slug: string;
    type: string;
    startsAt: Date;
    location: string | null;
    isOnline: boolean;
  };