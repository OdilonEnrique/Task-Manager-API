import { Request, Response, NextFunction } from "express";

export function pageNotFound(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  const error = new Error("Page not Found!") as Error & { status: number };
  error.status = 404;
  return next(error);
}
