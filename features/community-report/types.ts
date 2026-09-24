export type CommunityReportSummary = {
    id: string;
    title: string;
    category: string;
    status: string;
    location: string | null;
    createdAt: Date;
  };