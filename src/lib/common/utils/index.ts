import { Config } from "src/lib/config";


export function generateCode(): string {
    if (Config.IS_PRODUCTION) {
      const min = 1000;
      const max = 9999;
      return Math.floor(Math.random() * (max - min + 1) + min).toString();
    } else {
      // Development environment, use a fixed code
      return '1234';
    }
  }