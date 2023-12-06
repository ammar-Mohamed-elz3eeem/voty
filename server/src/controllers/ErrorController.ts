import DBRequest from "@/types/DBRequest";
import { Response } from "express";

export default class ErrorController {
  static errRoute(req: DBRequest, res: Response) {
    req.db?.connection.close();
    res.status(404).json({'error': 'page not found', status: 404});
  }
}
