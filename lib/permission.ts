export type UserRole = 'USER' | 'MODERATOR' | 'ADMIN'

export type Permission = 
  | 'view:opportunities'
  | 'create:opportunities'
  | 'update:opportunities'
  | 'delete:opportunities'
  | 'manage:applications'
  | 'view:applications'
  | 'create:applications'
  | 'manage:users'
  | 'view:users'
  | 'manage:posts'
  | 'create:posts'
  | 'view:posts'
  | 'manage:comments'
  | 'create:comments'
  | 'view:comments'
  | 'manage:content'
  | 'view:analytics'

const rolePermissions: Record<UserRole, Permission[]> = {
  USER: [
    'view:opportunities',
    'view:applications',
    'create:applications',
    'create:posts',
    'view:posts',
    'create:comments',
    'view:comments',
  ],
  MODERATOR: [
    'view:opportunities',
    'create:opportunities',
    'update:opportunities',
    'manage:applications',
    'view:applications',
    'create:applications',
    'manage:posts',
    'create:posts',
    'view:posts',
    'manage:comments',
    'create:comments',
    'view:comments',
    'manage:content',
  ],
  ADMIN: [
    'view:opportunities',
    'create:opportunities',
    'update:opportunities',
    'delete:opportunities',
    'manage:applications',
    'view:applications',
    'create:applications',
    'manage:users',
    'view:users',
    'manage:posts',
    'create:posts',
    'view:posts',
    'manage:comments',
    'create:comments',
    'view:comments',
    'manage:content',
    'view:analytics',
  ],
}

export function hasPermission(userRole: UserRole | undefined, permission: Permission): boolean {
  if (!userRole) return false
  return rolePermissions[userRole]?.includes(permission) || false
}

export function canAccessRoute(userRole: UserRole | undefined, route: string): boolean {
  if (!userRole) return false

  const routePermissions: Record<string, Permission> = {
    '/dashboard': 'view:opportunities',
    '/opportunities': 'view:opportunities',
    '/opportunities/create': 'create:opportunities',
    '/applications': 'view:applications',
    '/users': 'view:users',
    '/posts': 'view:posts',
    '/posts/create': 'create:posts',
    '/admin': 'view:analytics',
  }

  const requiredPermission = routePermissions[route]
  if (!requiredPermission) return true // Public routes

  return hasPermission(userRole, requiredPermission)
}

export function isAdmin(userRole: UserRole | undefined): boolean {
  return userRole === 'ADMIN'
}

export function isModeratorOrAdmin(userRole: UserRole | undefined): boolean {
  return userRole === 'MODERATOR' || userRole === 'ADMIN'
}