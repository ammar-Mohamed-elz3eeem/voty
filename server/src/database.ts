import { dbClient } from "@/utils/dbClient";

export async function connectDB() {
  await dbClient.initializeDatabase();
}
