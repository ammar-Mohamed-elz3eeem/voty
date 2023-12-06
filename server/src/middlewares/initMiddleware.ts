import { connectDB } from "@/database";
import DBRequest from "@/types/DBRequest";
import { dbClient } from "@/utils/dbClient";
import { NextFunction, Request, Response } from "express";

export async function init(req: DBRequest, res: Response, next: NextFunction) {
  try {
    await connectDB();
    req.db = dbClient.mongoose;
    return next();
  } catch (err) {
    return res.status(500).json({error: 'Internal Server Error'});
  }
};

export async function isAuthenticated(req: DBRequest, res: Response, next: NextFunction) {
  if (req.session.user) {
    return next();
  }
  return res.status(400).json({
    error: 'requires_authentication',
    message: 'This path requires you to be signed in user'
  });
}
