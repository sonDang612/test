class AppError extends Error {
  public statusCode: number;
  public status: string;
  public details: any;

  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith("4") ? "1" : "1";
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  static BadRequest(message = "Bad Request", details?: any): AppError {
    return new AppError(message, 400, details);
  }

  static NotFound(message = "Not Found", details?: any): AppError {
    return new AppError(message, 404, details);
  }
}

export { AppError };
