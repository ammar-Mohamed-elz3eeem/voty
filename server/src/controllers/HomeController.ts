import DBRequest from '@/types/DBRequest';
import { Application, Request, Response } from 'express';

export default class HomePageController {
  static home(req: DBRequest, res: Response) {
    return res.status(200).json({"status": "OK", 'loggedUser': req.session.user});
  }
};
