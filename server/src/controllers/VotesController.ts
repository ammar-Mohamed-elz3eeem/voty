import { Poll } from "@/mongo/Models";
import DBRequest from "@/types/DBRequest";
import { Response } from "express";
import { isValidObjectId } from "mongoose";

export default class VotesController {
  static async showVotes(req: DBRequest, res: Response) {
    const polls = await Poll.find({});
    polls.map(poll => ({ subject: poll.subject, options: poll.options.map(option => { name: option.name }) }));
    return res.status(200).json(polls);
  }

  static async deleteVote(req: DBRequest, res: Response) {
    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ 'error': 'Unauthorized' });
    }
    const id = req.params.id;
    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({ 'error': 'invalid id' });
    }
    const deletedPoll = await Poll.deleteOne({ _id: id });
    return res.status(200).json({ status: 'OK', deletedId: id });
  }
  
  static async editVote(req: DBRequest, res: Response) {
    const subject = req.body.subject || null;
    const options = req.body.options || null;

    if (typeof subject != 'string') {
      return res.status(400).json({ 'error': 'invalid subject' });
    }

    if (!(options instanceof Array)) {
      return res.status(400).json({ 'error': 'invalid options' });
    }

    if (options.some((option: {name: string}) => !option.name)) {
      return res.status(400).json({ 'error': 'all vote option names must be set' });
    }

    const id = req.params.id;
    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({ 'error': 'invalid id' });
    }
    const poll = await Poll.findOne({_id: id});
    if (!poll) {
      return res.status(404).json({ 'error': 'not found' });
    }
    const result = await poll.updateOne({ $set: {subject, options} }, {_id: id});
    return res.status(200).json({...result});
  }

  static async showVote(req: DBRequest, res: Response) {
    const id = req.params.id;
    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({ 'error': 'invalid id' });
    }
    const poll = await Poll.findOne({_id: id});
    if (!poll) {
      return res.status(404).json({ 'error': 'not found' });
    }
    return res.status(200).json(poll?.toObject());
  }

  static async addNewVote(req: DBRequest, res: Response) {
    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ 'error': 'Unauthorized' });
    }
    const voteData = {
      subject: req.body.subject,
      options: req.body.options
    }
    if (!voteData.subject) {
      return res.status(400).json({ 'error': 'Missing vote subject' });
    }
    if (!voteData.options) {
      return res.status(400).json({ 'error': 'Missing vote options' });
    }
    if (voteData.options.length < 3) {
      return res.status(400).json({ 'error': 'vote options must be 3 or more' });
    }
    if (voteData.options.some((option: {name: string}) => !option.name)) {
      return res.status(400).json({ 'error': 'all vote option names must be set' });
    }
    const createdPoll = await Poll.create({
      subject: voteData.subject,
      options: voteData.options
    });

    return res.status(201).json({
      id: createdPoll._id,
      subject: createdPoll.subject,
      options: createdPoll.options
    });
  }
}
