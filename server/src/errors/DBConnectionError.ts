export default class DBConnectionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DBConnectionError";
  }
}
