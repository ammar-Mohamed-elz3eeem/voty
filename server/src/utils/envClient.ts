import { readFileSync, existsSync } from "fs";

export default class EnvLoader {
  static loadEnv() {
    const envType: string = process.env.npm_lifecycle_event === 'dev' && 'test' || 'prod';
    const path: string = envType !== 'prod' && '.env.local' || '.env';

    if (existsSync(path)) {
      const fileContent: string = readFileSync(path, {encoding: 'utf-8'});
      const lines: Array<string> = fileContent.trim().split('\n');
      for (const line of lines) {
        const delimiterIdx = line.indexOf("=");
        process.env[line.substring(0, delimiterIdx)] = line.substring(delimiterIdx + 1).trim();
      }
    }
  }
}