import mongoose, { mongo } from "mongoose";

export const UserSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    min: 3,
    max: 20,
    validate: {
      validator: function (v: string) {
        return /^[a-zA-Z0-9_ ]+$/.test(v);
      }
    }
  },
  username: { 
    type: String, 
    required: true, 
    min: 3, 
    max: 20,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^[a-zA-Z0-9_]+$/.test(v);
      }
    }
  },
  role: { 
    type: String, 
    required: true, 
    default: 'voter', 
    enum: ['admin', 'voter'] 
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v);
      }
    }
  },
  imageUrl: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: true
  }
});

export const option = new mongoose.Schema({
  name: { type: String, required: true },
  chosen: { type: Number }
});

export const PollSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  options: { type: [option] },
  creator: { type: mongoose.Schema.Types.ObjectId }
});

export const VotesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll',
    required: true,
  },
  optionSelected: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

export const SubScriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll',
    required: true,
  },
});
