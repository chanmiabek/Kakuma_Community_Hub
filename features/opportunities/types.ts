export type OpportunityListItem = {
    id: string;
    title: string;
    slug: string;
    type: string;
    category: string;
    location: string | null;
    deadline: Date | null;
    organization: { name: string; slug: string };
  };