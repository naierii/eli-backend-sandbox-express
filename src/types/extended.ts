import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

export interface AuthedRequest extends Request {
  user?: string | JwtPayload
}