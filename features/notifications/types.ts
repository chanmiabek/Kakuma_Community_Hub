export type NotificationSummary = {
    id: string;
    title: string;
    body: string | null;
    readAt: Date | null;
    createdAt: Date;
  };