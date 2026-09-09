export type OpportunityType = string
export type OpportunityStatus = string
export type ApplicationStatus = string

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

export interface OpportunityFilters {
  search?: string
  type?: OpportunityType
  status?: OpportunityStatus
  location?: string
  organization?: string
  tags?: string[]
  page?: number
  limit?: number
  sortBy?: 'createdAt' | 'deadline' | 'title'
  sortOrder?: 'asc' | 'desc'
}

export interface ApplicationWithDetails {
  id: string
  status: ApplicationStatus
  coverLetter: string | null
  createdAt: Date
  opportunity: {
    id: string
    title: string
    organization: string | null
    type: OpportunityType
  }
  user: {
    id: string
    name: string | null
    email: string | null
    image: string | null
  }
}

export interface UserProfile {
  id: string
  name: string | null
  email: string | null
  image: string | null
  bio: string | null
  location: string | null
  skills: string[]
  languages: string[]
  role: string
  createdAt: Date
}

export interface DashboardStats {
  totalOpportunities: number
  activeOpportunities: number
  totalApplications: number
  pendingApplications: number
  totalUsers: number
  totalPosts: number
  recentApplications: ApplicationWithDetails[]
}