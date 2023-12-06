import DBConnectionError from "@/errors/DBConnectionError";
import mongoose, { Mongoose } from "mongoose";

class MongooseClient {
  #DB_HOST: string = process.env.DATABASE_HOST || '127.0.0.1';
  #DB_NAME: string = process.env.DATABASE_NAME || 'test';
  #DB_PORT: string = process.env.DATABASE_PORT || '27017';
  mongoose: Mongoose | null

  constructor() {
    this.mongoose = null;
  }

  async initializeDatabase() {
    try {
      this.mongoose = await mongoose.connect(
        `mongodb://${this.#DB_HOST}:${this.#DB_PORT}/${this.#DB_NAME}`);
    } catch (error) {
      throw new DBConnectionError("connection with database can't be established");
    }
  }
}

export const dbClient = new MongooseClient();
