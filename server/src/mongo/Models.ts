import { PollSchema, UserSchema, VotesSchema } from "@/mongo/Schema";
import mongoose, { mongo } from "mongoose";

export const User = mongoose.model("User", UserSchema);

export const Poll = mongoose.model("Poll", PollSchema);

export const Vote = mongoose.model('Vote', VotesSchema);
