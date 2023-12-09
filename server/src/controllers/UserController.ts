import { User, Vote } from "@/mongo/Models";
import DBRequest from "@/types/DBRequest";
import { ILoginUser, INewUser } from "@/types/UserType";
import { Response } from "express";
import bcrypt from 'bcrypt';
import { isValidObjectId } from "mongoose";

export default class UserController {
  static async createUser(req: DBRequest, res: Response) {
    try {
      const userData: INewUser = { ...req.body };
      const salt = await bcrypt.genSalt();
      if (userData.password.length < 6) {
        throw new Error('password must be more than 6 characters');
      }
      userData.password = await bcrypt.hash(userData.password + (process.env.SALT_TEXT || 'RandomText'), salt);
      const insertedUser = await User.create(userData);
      return res.status(200).json({message: 'user created', data: {
        id: insertedUser._id,
        email: insertedUser.email
      }});
    } catch (err) {
      return res.status(400).json({message: 'invalid user info', err});
    }
  }

  static async authenticate(req: DBRequest, res: Response) {
    try {
      const userData: ILoginUser = { ...req.body };
      const user = await User.findOne({$or: [{email: userData.username}, {username: userData.username}]});
      if (!user) {
        throw new Error("user credentials is wrong");
      }
      console.log(userData);
      if (!bcrypt.compareSync(userData.password + process.env.SALT_TEXT, user.password)) {
        throw new Error('invalid password');
      }

      req.session.regenerate(function (err: Error) {
        if (err)
          throw new Error('problem happened with saving your data');
        req.session.user = {
          id: user.id,
          email: user.email,
          username: user.username,
          image: user.imageUrl,
          name: user.name
        };
        console.log(req.session.user);
        req.session.save(function (err: Error) {
          if (err) throw new Error('problem happened with saving your data');
          res.redirect('/')
        });
      });
    } catch (error) {
      return res.status(400).json({status: 'invalid operation', message: error});
    }
  }

  static async logout(req: DBRequest, res: Response) {
    req.session.user = null
    req.session.save(function (err: Error) {
    if (err)
      return res.status(500).json({
        error: 'internal_server_error',
        message: 'Something went wrong!'
      });
      req.session.regenerate(function (err: Error) {
        if (err)
          return res.status(500).json({
            error: 'internal_server_error',
            message: 'Something went wrong!'
          });
        res.redirect('/');
      })
  })
  }

  static async vote(req: DBRequest, res: Response) {
    const pollId = req.params.id || null;
    const user = req.session.user || null;
    const optionSelected = req.body.selectedOption || null;

    if (!pollId || !isValidObjectId(pollId)) {
      return res.status(400).json({'error': 'invalid vote id'});
    }
    if (!user) {
      return res.status(401).json({'error': 'Unauthorized'});
    }
    if (!optionSelected || !isValidObjectId(optionSelected)) {
      return res.status(400).json({error: 'invalid option selected'});
    }
    try {
      const vote = await Vote.create({
        pollId,
        userId: user.id,
        optionSelected: optionSelected
      });
      return res.status(201).json({
        pollId,
        userId: vote.userId,
        optionSelected: vote.optionSelected
      });
    } catch (error) {
      res.status(500).json({error: 'something went wrong'});
    }
    return 
  }

  static async subscribe(req: DBRequest, res: Response) {

  }
}
