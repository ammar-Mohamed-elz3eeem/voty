import { Request } from "express";
import { Mongoose } from "mongoose";

export default interface DBRequest extends Request {
  db: Mongoose | null
  session: any
};
