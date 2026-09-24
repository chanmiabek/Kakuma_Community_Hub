export class AppError extends Error {
    constructor(message: string, public status = 400, public code?: string) {
      super(message);
      this.name = "AppError";
    }
  }
  
  export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") { super(message, 401, "UNAUTHORIZED"); }
  }
  
  export class ForbiddenError extends AppError {
    constructor(message = "Forbidden") { super(message, 403, "FORBIDDEN"); }
  }
  
  export class NotFoundError extends AppError {
    constructor(message = "Not found") { super(message, 404, "NOT_FOUND"); }
  }
  
  export class ValidationError extends AppError {
    constructor(message = "Invalid data") { super(message, 422, "VALIDATION_ERROR"); }
  }
  
  export function toErrorResponse(err: unknown) {
    if (err instanceof AppError) {
      return { status: err.status, body: { error: err.message, code: err.code } };
    }
    console.error(err);
    return { status: 500, body: { error: "Internal server error" } };
  }